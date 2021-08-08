const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subject: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
}, {
    timestamps: true,
})

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;