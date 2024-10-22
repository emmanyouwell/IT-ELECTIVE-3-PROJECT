const mongoose = require('mongoose');
const Group = require('./groups');
// Define a sub-schema for the quiz questions and answers
const quizSchema = new mongoose.Schema({
    questions: [{
        q: { type: String, required: true },
        a: { type: String },
        b: { type: String },
        c: { type: String },
        d: { type: String },
        ans: { type: String, required: true }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// Middleware to clean up references in the Group collection
quizSchema.pre('findOneAndDelete', async function (next) {
    const quizId = this.getQuery()['_id'];
    await Group.updateMany(
        { quiz: quizId },
        { $unset: { quiz: "" } }
    );
    next();
});

module.exports = mongoose.model('Quiz', quizSchema);