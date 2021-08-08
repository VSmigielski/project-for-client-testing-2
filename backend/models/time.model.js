const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timeSchema = new Schema({
    time: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
}, {
    timestamps: true,
})

const Time = mongoose.model('Time', timeSchema);

module.exports = Time;