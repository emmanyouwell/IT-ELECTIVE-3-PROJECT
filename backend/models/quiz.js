const mongoose = require('mongoose');

// Define a sub-schema for the quiz questions and answers
const quizSchema = new mongoose.Schema({
    q: { type: String},
    a: {type: String},
    b: { type: String},
    c: { type: String},
    ans: { type: String, required: true}
});

module.exports = mongoose.model('Quiz', quizSchema);