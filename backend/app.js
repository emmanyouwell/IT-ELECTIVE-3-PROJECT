const express = require('express');
const app = express();
const cookie = require('cookie-parser');
const cors = require('cors');
const group = require('./routes/group');
const auth = require('./routes/auth');
const subtopic = require('./routes/subtopic');
const quiz = require('./routes/quiz');
app.use(cors(
    {
        origin: ["http://localhost:5173", "https://it-elective-3-project.vercel.app/","https://tuphanda.onrender.com", "https://tup-handa.vercel.app", "https://www.youtube.com"],
        credentials: true
    }
))
app.use(express.json());
app.use(express.urlencoded({limit: '50mb', extended: true}))  
app.use(cookie());
app.use('/api/v1',group);
app.use('/api/v1', auth);
app.use('/api/v1', subtopic);
app.use('/api/v1', quiz);
module.exports = app;