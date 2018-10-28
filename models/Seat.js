var mongoose = require('mongoose');

var SeatSchema = new mongoose.Schema({
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isSold: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Seat', SeatSchema);
