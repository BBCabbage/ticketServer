var Order = require('../models/Order');
var Session = require('../models/Session');
var Seat = require('../models/Seat');
var User = require('../models/User');
var Ticket = require('../models/Ticket');
const jwt = require('jsonwebtoken');

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
            var res = [];
            for (order of orders) {
                let tres = [];
                for (ticket of order.tickets) {
                    tk = await Ticket.findById(ticket);
                    sn = await Session.findById(tk.session);
                    st = await Seat.findById(tk.seat);
                    tres.push({
                        sessionName: sn.name,
                        seat: st.seat
                    });
                }
                res.push({
                    _id: order._id,
                    tickets: tres,
                    paymentStatus: order.paymentStatus
                });
            }
            resp(200, { orders: res });
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
