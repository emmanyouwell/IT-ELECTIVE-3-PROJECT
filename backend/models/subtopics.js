const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Subtopic', subtopicSchema);
