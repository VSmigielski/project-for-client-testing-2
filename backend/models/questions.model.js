const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String, required: true
    },
    answer: {
        type: String, required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        required: true
    },
}, {
    timestamps: true,
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;