const mongoose = require('mongoose');
const Group = require('./groups');
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
// Middleware to clean up references in the Group collection
subtopicSchema.pre('findOneAndDelete', async function(next) {
    const subtopicId = this.getQuery()['_id'];
    await Group.updateMany(
        { subtopics: subtopicId },
        { $pull: { subtopics: subtopicId } }
    );
    next();
});
module.exports = mongoose.model('Subtopic', subtopicSchema);
