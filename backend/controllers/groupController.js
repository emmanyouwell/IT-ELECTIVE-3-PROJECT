const Group = require('../models/groups');
const cloudinary = require('cloudinary')
const APIFeatures = require('../utils/apiFeatures')

exports.createModule = async (req, res, next) => {
    let imageLink = {}
    try {
        const result = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: 'IT_ELECTIVE_3',
        });

        imageLink = {
            public_id: result.public_id,
            url: result.secure_url
        }

    } catch (error) {
        console.log(error)
    }
    
    try{
        req.body.img = imageLink
        const group = await Group.create(req.body);
        if (group){
            res.status(201).json({
                success: true,
                group
            })
        }
    }
    catch(error){
        return res.status(400).json({
			success: false,
			message: 'Group not created'
		})
    }
    
	
}