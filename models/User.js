var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);
