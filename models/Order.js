var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
    }],
    paymentStatus: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Order', OrderSchema);
