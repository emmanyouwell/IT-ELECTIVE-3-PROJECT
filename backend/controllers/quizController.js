const Group = require('../models/groups');

const Quiz = require('../models/quiz');
exports.createQuiz = async (req, res, next) => {
    try {
        const groupId = req.params.groupId;
        const filePath = path.join(__dirname, '../uploads', req.file.filename);
        const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Validate and save quizzes to the database
        if (Array.isArray(fileContent)) {
            const quiz = new Quiz({ questions: fileContent });
            const savedQuiz = await quiz.save();

            // Find the group by ID and update it with the quiz ObjectId
            const group = await Group.findById(groupId);
            if (!group) {
                return res.status(400).json({ message: `Group not found with id: ${groupId}` });
            }

            group.quiz = savedQuiz._id;
            await group.save();

            res.status(201).json({ message: 'Quiz uploaded and group updated successfully', quiz: savedQuiz });
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
