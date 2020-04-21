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
    order: {
      type: Array,
      required: false
    },
    info: {
      type: Object,
      required: false
    }
})

module.exports = mongoose.model('users', userSchema);