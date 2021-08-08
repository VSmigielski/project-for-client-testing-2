const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const difficultySchema = new Schema({
    difficulty: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
}, {
    timestamps: true,
})

const Difficulty = mongoose.model('Difficulty', difficultySchema);

module.exports = Difficulty;