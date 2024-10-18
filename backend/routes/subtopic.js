// routes/subtopicRoutes.js
const express = require('express');
const upload = require('../utils/multer');
const { createSubtopic } = require('../controllers/subtopicController');
const { getSubtopics } = require('../controllers/subtopicController');
const { updateSubtopic } = require('../controllers/subtopicController');
const { getSingleSubtopic } = require('../controllers/subtopicController');
const { deleteSubtopic } = require('../controllers/subtopicController');

const router = express.Router();

// Route to create a new subtopic with multiple images
router.post('/subtopic/new', upload.array('images', 5), createSubtopic); // 5 is the maximum number of files allowed
router.get('/subtopics', getSubtopics);
router.put('/subtopic/:id', updateSubtopic);
router.get('/subtopic/:id', getSingleSubtopic);
router.delete('/subtopic/:id', deleteSubtopic);

module.exports = router;