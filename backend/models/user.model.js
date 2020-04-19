const mongoose = require('mongoose');

// Tạo một model mới
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('users', userSchema);