var Session = require('../models/Session');
var User = require('../models/User');
const jwt = require('jsonwebtoken');

var getSessionInfo = async ctx => {
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
        try {
            var sessions = await Session.find({});
            var res = [];
            for (session of sessions) {
                res.push({
                    _id: session._id,
                    name: session.name,
                    singer: session.singer,
                    sessionTime: session.sessionTime,
                    place: session.place
                });
            }
            resp(200, { sessions: res });
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
        path: '/api/getSessionInfo',
        func: getSessionInfo
    }]
};
