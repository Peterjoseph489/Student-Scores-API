const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

const studentModel = mongoose.model('Student', studentSchema);
module.exports = studentModel;