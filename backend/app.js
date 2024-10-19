const express = require('express');
const app = express();
const cookie = require('cookie-parser');
const cors = require('cors');
const group = require('./routes/group');
const auth = require('./routes/auth');
const subtopic = require('./routes/subtopic');
const quiz = require('./routes/quiz');
// CORS configuration
const corsOptions = {
    origin: 'https://it-elective-3-project.vercel.app', // Allow only your Vercel frontend
    methods: 'GET,POST,PUT,DELETE', // Allow specific methods if needed
    credentials: true, // If your frontend requires credentials (e.g., cookies)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookie());
app.use('/api/v1', group);
app.use('/api/v1', auth);
app.use('/api/v1', subtopic);
app.use('/api/v1', quiz);
module.exports = app;