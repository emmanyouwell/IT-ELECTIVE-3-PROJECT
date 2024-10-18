const mongoose = require('mongoose')

const groupsSchema = new mongoose.Schema({
    group: { type: Number, required: true },
    topic: { type: String, default: 'No topic' },
    subtopics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtopic' // Reference to the Subtopic model
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Groups', groupsSchema);