var mongoose = require('mongoose');

var TicketSchema = new mongoose.Schema({
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    seat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Ticket', TicketSchema);
