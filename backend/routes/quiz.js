// routes/subtopicRoutes.js
const express = require('express');
const upload = require('../utils/multer');


const router = express.Router();

const {createQuiz, getQuizzes, getSingleQuiz, updateQuiz, deleteQuiz} = require('../controllers/quizController');

router.post('/group/:id/quiz/new', upload.single('file'), createQuiz);
router.get('/quizzes', getQuizzes);
router.get('/quiz/:id', getSingleQuiz);
router.put('/quiz/:id', updateQuiz);
router.delete('/quiz/:id', deleteQuiz);
module.exports = router;
