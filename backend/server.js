const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
// Parse json
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const questionsRouter = require('./routes/questions');
const usersRouter = require('./routes/users');
const difficultiesRouter = require('./routes/difficulties');
const timesRouter = require('./routes/times');
const subjectsRouter = require('./routes/subject');

app.use('/questions', questionsRouter);
app.use('/users', usersRouter)
app.use('/difficulty', difficultiesRouter)
app.use('/times', timesRouter)
app.use('/subjects', subjectsRouter)

// Listens on port 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});