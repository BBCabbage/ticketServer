var Order = require('../models/Order');
var User = require('../models/User');
var Ticket = require('../models/Ticket');
var Seat = require('../models/Seat');
const jwt = require('jsonwebtoken');

var createUserOrder = async ctx => {
    const resp = require('../auxiliary').resp(ctx);
    if (ctx.cookies.get('twtoken')) {
        let userName, password;
        try {
            decoded = await jwt.verify(ctx.cookies.get('twtoken'), 'tw');
            ({userName, password} = decoded);
        } catch (e) {
            resp(401, 'Failed to decoded the token.');
            return;
        }
        let user;
        try {
            user = await User.findOne({ userName: userName, password: password });
            if (!user) {
                resp(404, 'User not found.');
                return;
            }
        } catch (e) {
            resp(404, 'User not found.');
            return;
        }
        if (!ctx.request.body.tickets) {
            resp(400, 'Missing parameters.');
            return;
        }
        order = new Order({
            user: user._id,
            tickets: []
        });
        for (tk of ctx.request.body.tickets) {
            let ticket = new Ticket({
                session: tk.session,
                seat: tk.seat
            });
            res = await ticket.save();
            order.tickets.push(res._id);
            seat = await Seat.findById(tk.seat);
            seat.isSold = true;
            await seat.save();
        }
        await order.save();
        resp(200, 'OK.');
        
    } else {
        resp(404, 'Nobody loggedin.');
    }
};

module.exports = {
    apis: [{
        method: 'POST',
        path: '/api/createUserOrder',
        func: createUserOrder
    }]
};
