const Group = require('../models/groups');
const cloudinary = require('cloudinary');
const APIFeatures = require('../utils/apiFeatures')
const Subtopic = require('../models/subtopics');
exports.createSubtopic = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { title, videoLink, transcript, images } = req.body;
        if (!images || (Array.isArray(images) && images.length === 0)) {
            console.log(images);
            return res.status(400).json({ message: "No images were provided." });
        } else {
            console.log('goods: ', Array.isArray(images) ? images.length : 1);
            // console.log(images);
        }

        // Normalize images to always be an array
        const imagesArray = Array.isArray(images) ? images : [images];

        let imageLink = [{}];

        if (imagesArray.length > 1) {
            // Assuming req.body.images is an array of Base64 image strings
            const imageUploadPromises = imagesArray.map(base64Image =>
                cloudinary.v2.uploader.upload(base64Image, { folder: 'IT_ELECTIVE_3' })
            );

            // Resolve all promises and get the upload results
            const imageUploadResults = await Promise.all(imageUploadPromises);

            // Process the Cloudinary results and prepare for saving to MongoDB
            const imageData = imageUploadResults.map(result => ({
                public_id: result.public_id,
                url: result.secure_url,
            }));

            imageLink = imageData;
        } else {
            const result = await cloudinary.v2.uploader.upload(imagesArray[0], { folder: 'IT_ELECTIVE_3' });
            imageLink = [{
                public_id: result.public_id,
                url: result.secure_url
            }];
        }


        // Save the image data to your database (MongoDB)
        // Assuming you're using a Mongoose model
        const newSubtopic = await Subtopic.create({
            title,
            videoLink,
            transcript,
            images: imageLink,  // Save public_id and URLs
        });

        await newSubtopic.save();

        const group = await Group.findById(id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        group.subtopics.push(newSubtopic);

        await group.save();

        res.status(201).json({ message: 'Subtopic created and added to group successfully', success: true, newSubtopic });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating subtopic', success: false, error: error.message });
    }
}

exports.getSubtopics = async (req, res, next) => {
    try {
        const subtopics = await Subtopic.find();
        res.status(200).json({
            success: true,
            subtopics
        })
    } catch {
        return res.status(400).json({
            success: false,
            message: 'Subtopics not found'
        })
    }
}

exports.getSingleSubtopic = async (req, res, next) => {
    try {
        const subtopic = await Subtopic.findById(req.params.id);
        if (subtopic) {
            res.status(200).json({
                success: true,
                subtopic
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Subtopic not found'
        })
    }
}

exports.updateSubtopic = async (req, res, next) => {
    try {
        let imageLink = [{}];
        let subtopic = await Subtopic.findById(req.params.id);
        // console.log(req.body);
        if (!subtopic) {
            return res.status(404).json({
                success: false,
                message: 'Subtopic not found'
            })
        }

        if (req.body.images) {
            try {
                // Assuming req.body.images is an array of Base64 image strings
                const imageDestroyPromises = subtopic.images.map(image =>
                    cloudinary.v2.uploader.destroy(`${image.public_id}`)
                );

                // Resolve all promises and get the upload results
                const imageDestroyResults = await Promise.all(imageDestroyPromises);
                if (imageDestroyResults) {
                    console.log('images deleted');
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error destroying subtopics', success: false, error: error.message });
            }
            try {
                // Normalize images to always be an array
                const imagesArray = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
                if (imagesArray.length > 1) {
                    // Assuming req.body.images is an array of Base64 image strings
                    const imageUploadPromises = imagesArray.map(base64Image =>
                        cloudinary.v2.uploader.upload(base64Image, { folder: 'IT_ELECTIVE_3' })
                    );

                    // Resolve all promises and get the upload results
                    const imageUploadResults = await Promise.all(imageUploadPromises);

                    // Process the Cloudinary results and prepare for saving to MongoDB
                    const imageData = imageUploadResults.map(result => ({
                        public_id: result.public_id,
                        url: result.secure_url,
                    }));

                    imageLink = imageData;
                } else {
                    const result = await cloudinary.v2.uploader.upload(imagesArray[0], { folder: 'IT_ELECTIVE_3' });
                    imageLink = [{
                        public_id: result.public_id,
                        url: result.secure_url
                    }];

                }
                req.body.images = imageLink;
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error creating subtopic', success: false, error: error.message });
            }

        }
        try {
            const subtopic = await Subtopic.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });
            if (subtopic) {
                res.status(201).json({
                    success: true,
                    subtopic
                })
            }
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Subtopic not created'
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Subtopic not updated'
        })
    }
}

exports.deleteSubtopic = async (req, res, next) => {
    try {
        // Find the subtopic by ID
        let subtopic = await Subtopic.findById(req.params.id);
        if (!subtopic) {
            return res.status(404).json({
                success: false,
                message: 'Subtopic not found'
            });
        }

        // Delete images from Cloudinary
        try {
            const imageDestroyPromises = subtopic.images.map(image =>
                cloudinary.v2.uploader.destroy(image.public_id)
            );

            const imageDestroyResults = await Promise.all(imageDestroyPromises);
            if (imageDestroyResults) {
                console.log('Images deleted');
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error destroying images',
                error: error.message
            });
        }

        // Delete the subtopic
        subtopic = await Subtopic.findByIdAndDelete(req.params.id);
        if (subtopic) {
            return res.status(200).json({
                success: true,
                message: 'Subtopic deleted'
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Subtopic not found'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: 'Subtopic not deleted',
            error: error.message
        });
    }
};
