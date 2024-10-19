const Group = require('../models/groups');

const Quiz = require('../models/quiz');
exports.createQuiz = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, req.file.path);
        const fileContent = require(filePath);

        // Validate and save quizzes to the database
        if (Array.isArray(fileContent)) {
            const quizzes = fileContent.map(quiz => ({
                q: quiz.q,
                a: quiz.a,
                b: quiz.b,
                c: quiz.c,
                ans: quiz.ans
            }));

            await Quiz.insertMany(quizzes);
            res.status(201).json({ message: 'Quizzes uploaded successfully' });
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
  
}

exports.deleteQuiz = async (req, res, next) => {
    
};
