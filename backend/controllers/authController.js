const User = require('../models/user');
const sendToken = require('../utils/jwToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const Group = require('../models/groups');
// const ErrorHandler = require('../utils/errorHandler');

exports.registerUser = async (req, res, next) => {
    const { name, email, password, groupId } = req.body;

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(400).json({
            success: false,
            message: 'Email already in use.'
        })
    }
    const groupID = await Group.findById(groupId);
    if (!groupID) {
        return res.status(400).json({ success: false, error: 'Group not found' })
    }


    const user = await User.create({
        name,
        email,
        password,
        groupID: groupId,
    })
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not created'
        })
    }
    const confirmationToken = user.getConfirmEmailToken();
    await user.save({ validateBeforeSave: false });
    console.log(process.env.SMTP_HOST)
    let confirmEmailLink = ''
    if (process.env.SMTP_HOST === 'smtp.gmail.com') {
        confirmEmailLink = `${req.protocol}://it-elective-3-project.vercel.app/confirm/${confirmationToken}`
        
    }
    else {
        confirmEmailLink = `${req.protocol}://localhost:5173/confirm/${confirmationToken}`
        
    }
    const message = `Please click the link to activate your email:<a href=${confirmEmailLink}>\n\n${confirmEmailLink}\n\n</a>If you have not requested this email, then ignore it.`
    try {
        await sendEmail({
            email: user.email,
            subject: 'Account Activation',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.confirmEmailToken = undefined
        user.confirmTokenExpire = undefined
        await user.save({ validateBeforeSave: false })
        console.log(error.message);
        return res.status(500).json({ error: error.message })
      

    }
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            error: 'Please enter email & password'
        })
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return res.status(401).json({
            message: 'No user found with this email'
        })
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!user.isVerified && isPasswordMatched) {
        const confirmationToken = user.getConfirmEmailToken()
        await user.save({ validateBeforeSave: false })
        let confirmEmailUrl = ''
        if (process.env.SMTP_HOST === 'smtp.gmail.com') {
            confirmEmailUrl = `${req.protocol}://tup-handa.vercel.app/confirm/${confirmationToken}`
        }
        else {
            confirmEmailUrl = `${req.protocol}://localhost:5173/confirm/${confirmationToken}`
        }
        const message = `Please click the link to activate your email:<a href=${confirmEmailUrl}>\n\n${confirmEmailUrl}\n\n</a>If you have not requested this email, then ignore it.`
        try {
            await sendEmail({
                email: user.email,
                subject: 'Account Activation',
                message
            })
            res.status(200).json({
                success: true,
                message: `Email Activation link sent to: ${user.email}`,
                isVerified: user.isVerified,
                isAuthenticated: true
            })
        } catch (error) {
            user.confirmEmailToken = undefined
            user.confirmTokenExpire = undefined
            await user.save({ validateBeforeSave: false })
            return res.status(500).json({ error: error.message })

        }
    }
    else if (!isPasswordMatched) {
        return res.status(401).json({
            message: 'Invalid Email or Password',
            isVerified: user.isVerified,
            isAuthenticated: false
        })
    }
    else {
        sendToken(user, 200, res)
    }

}

exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
}

exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ error: 'User not found with this email' })
        // return next(new ErrorHandler('User not found with this email', 404));
    }
    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`
    try {
        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return res.status(500).json({ error: error.message })
        // return next(new ErrorHandler(error.message, 500))
    }
}

exports.resetPassword = async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return res.status(400).json({ message: 'Password reset token is invalid or has been expired' })
        // return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ message: 'Password does not match' })
        // return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
}
exports.getUserProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
}

exports.updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('password');
    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return res.status(400).json({ message: 'Old password is incorrect' })
    }
    user.password = req.body.password;
    await user.save();
    sendToken(user, 200, res)


}

exports.updateProfile = async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Update avatar
    // if (req.body.avatar !== '') {
    //     const user = await User.findById(req.user.id)

    //     const image_id = user.avatar.public_id;
    //     const res = await cloudinary.v2.uploader.destroy(image_id);

    //     const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //         folder: 'avatars',
    //         width: 150,
    //         crop: "scale"
    //     })

    //     newUserData.avatar = {
    //         public_id: result.public_id,
    //         url: result.secure_url
    //     }
    // }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true
    })
}

exports.allUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
}
exports.getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(400).json({ message: `User does not found with id: ${req.params.id}` })
        // return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
}

exports.confirmEmail = async (req, res, next) => {
    const confirmEmailToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        confirmEmailToken,
        confirmTokenExpire: { $gt: Date.now() }
    })
    if (!user) {
        return res.status(400).json({ message: 'Invalid token or token has expired' })
    }
    if (user.isVerified) {
        return res.status(400).json({ message: 'Email is already verified' })
    }

    user.isVerified = true;
    user.confirmEmailToken = undefined;
    user.confirmTokenExpire = undefined;
    await user.save({ validateBeforeSave: false })
    sendToken(user, 200, res)
}
