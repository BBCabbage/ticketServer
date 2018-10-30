var Seat = require('../models/Seat');
var User = require('../models/User');

var getSeatInfo = async ctx => {
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
        try {
            if (!(await User.findOne({ userName: userName, password: password }))) {
                resp(404, 'User not found.');
                return;
            }
        } catch (e) {
            resp(404, 'User not found.');
            return;
        }
        if (!ctx.request.body.sessionid) {
            resp(400, 'Missing parameters.');
            return;
        }
        try {
            var seats = await Seat.find({ session: ctx.request.body.sessionid });
            resp(200, { seats: seats });
        } catch (e) {
            resp(401, 'Failed.');
        }
    } else {
        resp(404, 'Nobody loggedin.');
    }
};

module.exports = {
    apis: [{
        method: 'POST',
        path: '/api/getSeatInfo',
        func: getSeatInfo
    }]
};
