const Group = require('../models/groups');
const cloudinary = require('cloudinary')
const APIFeatures = require('../utils/apiFeatures')
const Subtopic = require('../models/subtopics');
exports.createGroup = async (req, res, next) => {
    try {
        const group = await Group.create(req.body);
        if (group) {
            res.status(201).json({
                success: true,
                group
            })
        }

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Group not created'
        })
    }
}

exports.getGroups = async (req, res, next) => {
    try {
        const groups = await Group.find();
        res.status(200).json({
            success: true,
            groups
        })
    } catch {
        return res.status(400).json({
            success: false,
            message: 'Groups not found'
        })
    }
}

exports.getSingleGroup = async (req, res, next) => {
    try {
        const group = await Group.findById(req.params.id).populate([{ path: 'subtopics' },
        { path: 'quiz' }]);
        if (group) {
            res.status(200).json({
                success: true,
                group
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Group not found'
        })
    }
}

exports.updateGroup = async (req, res, next) => {
    try {
        const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        if (group) {
            res.status(200).json({
                success: true,
                group
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Group not updated'
        })
    }
}

exports.deleteGroup = async (req, res, next) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.id);
        if (group) {
            res.status(200).json({
                success: true,
                message: 'Group deleted'
            })
        }
    } catch {
        return res.status(400).json({
            success: false,
            message: 'Group not deleted'
        })
    }
}