const mongoose = require('mongoose')

const groupsSchema = new mongoose.Schema({
    group: { type: Number, required: true },
    topic: { type: String, required: true },
    subtopic: [{
        title: { type: String, required: true },
        videoLink: { type: String, required: true },
        images: [{
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }],
        transcript: { type: String, required: true },
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Groups', groupsSchema);