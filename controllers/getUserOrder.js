var Order = require('../models/Order');
var Session = require('../models/Session');
var Seat = require('../models/Seat');
var User = require('../models/User');

var getUserOrder = async ctx => {
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
        try {
            var orders = await Order.find({ user: user._id });
            if (!orders) {
                resp(404, 'Nothing found.');
                return;
            }
            let result = orders.map(order => {
                let tickets = order.tickets.map(ticket => {
                    session = await Session.findById(ticket.session);
                    seat = await Seat.findById(ticket.seat);
                    return {
                        _id: ticket,
                        session: session,
                        seat: seat
                    };
                });
                order.tickets = tickets;
                return order;
            });
            resp(200, { orders: result });
        } catch (e) {
            resp(401, 'Failed.');
        }
    } else {
        resp(404, 'Nobody loggedin.');
    }
};

module.exports = {
    apis: [{
        method: 'GET',
        path: '/api/getUserOrder',
        func: getUserOrder
    }]
};
