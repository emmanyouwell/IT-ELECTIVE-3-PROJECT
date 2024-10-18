const Group = require('../models/groups');
const cloudinary = require('cloudinary');
const APIFeatures = require('../utils/apiFeatures')
const Subtopic = require('../models/subtopics');
exports.createSubtopic = async (req, res, next) => {
    try {
        const { title, videoLink, transcript } = req.body;
        const imageUploadPromises = req.files.map(file => 
            cloudinary.v2.uploader.upload(file.path, {folder:'IT_ELECTIVE_3'}) // Upload the file to Cloudinary
        );
        const imageUploadResults = await Promise.all(imageUploadPromises);
        const images = imageUploadResults.map(result => ({
            public_id: result.public_id, // Cloudinary returns the public_id
            url: result.secure_url, // URL of the uploaded image
        }));
        

        const newSubtopic = new Subtopic({
            title,
            videoLink,
            images,
            transcript,
        });

        await newSubtopic.save();

        res.status(201).json({ message: 'Subtopic created successfully', success:true,  newSubtopic });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating subtopic', success:false, error: error.message });
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
        const subtopic = await Subtopic.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
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
            message: 'Subtopic not updated'
        })
    }
}

exports.deleteSubtopic = async (req,res,next) => {
    try{
        const subtopic = await Subtopic.findByIdAndDelete(req.params.id);
        if (subtopic){
            res.status(200).json({
                success: true,
                message: 'Subtopic deleted'
            })
        }
    }catch{
        return res.status(400).json({
            success: false,
            message: 'Subtopic not deleted'
        })
    }
}