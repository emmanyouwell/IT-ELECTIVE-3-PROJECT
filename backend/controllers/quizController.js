const Group = require('../models/groups');
const fs = require('fs');
const path = require('path');
const Quiz = require('../models/quiz');
const cloudinary = require('cloudinary');
exports.createQuiz = async (req, res, next) => {
    try {
        const groupId = req.params.id;

        // Upload file to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            resource_type: 'raw', // Ensure the file is treated as a raw file
            folder: 'IT_ELECTIVE_3/quizzes', // Optional: specify a folder in Cloudinary
        });

        // Get the URL of the uploaded file
        const fileUrl = result.secure_url;

        // Fetch the file content from the URL
        const response = await fetch(fileUrl);
        const fileContent = await response.json();

        // Validate and save quizzes to the database
        if (Array.isArray(fileContent)) {
            const quiz = new Quiz({ questions: fileContent });
            const savedQuiz = await quiz.save();

            // Find the group by ID and update it, adding the quiz ObjectId to the quiz field
            const updatedGroup = await Group.findByIdAndUpdate(
                groupId,
                { $set: { quiz: savedQuiz._id } }, // This ensures the quiz field is added or updated
                { new: true, upsert: true } // `new: true` returns the updated document, `upsert: true` creates it if it doesn't exist
            );

            if (!updatedGroup) {
                return res.status(400).json({ message: `Group not found with id: ${groupId}` });
            }

            res.status(201).json({ message: 'Quiz uploaded and group updated successfully', quiz: savedQuiz, success:true});
        } else {
            res.status(400).json({ message: 'Invalid JSON format' });
        }
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getQuizzes = async (req, res, next) => {
    try {
        const quiz = await Quiz.find();
        res.status(200).json({
            success: true,
            quiz
        })
    } catch {
        return res.status(400).json({
            success: false,
            message: 'Quizzes not found'
        })
    }
}

exports.getSingleQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (quiz) {
            res.status(200).json({
                success: true,
                quiz
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Quiz not found'
        })
    }
}

exports.updateQuiz = async (req, res, next) => {
    try {
        const quizId = req.params.id;
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        if (!updatedQuiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Quiz updated successfully',
            quiz: updatedQuiz
        });
    } catch (error) {
        console.error('Error updating quiz:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

exports.deleteQuiz = async (req, res, next) => {
    try {
        const quizId = req.params.id;
        const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

        if (!deletedQuiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Quiz deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
