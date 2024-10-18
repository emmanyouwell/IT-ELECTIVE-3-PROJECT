const express = require('express');
const app = express();
const cookie = require('cookie-parser');

const group = require('./routes/group');
const auth = require('./routes/auth');
app.use(express.json());
app.use(cookie());
app.use('/api/v1',group);
app.use('/api/v1', auth);
module.exports = app;