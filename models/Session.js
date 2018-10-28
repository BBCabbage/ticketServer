var mongoose = require('mongoose');

var SessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    singer: {
        type: String,
        required: true
    },
    sessionTime: {
        type: Date,
        required: true
    },
    place: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Session', SessionSchema);

