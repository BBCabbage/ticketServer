var Seat = require('../models/Seat');
var User = require('../models/User');
const jwt = require('jsonwebtoken');

var getUserInfo = async ctx => {
    const resp = require('../auxiliary').resp(ctx);
    if (ctx.cookies.get('twtoken')) {
        tk = ctx.cookies.get('twtoken');
        let userName, password;
        try {
            decoded = await jwt.verify(tk, 'tw');
            ({userName, password} = decoded);
        } catch (e) {
            resp(401, 'Failed to decoded the token.');
            return;
        }
        try {
            let user = await User.findOne({ userName: userName, password: password });
            if (!user) {
                resp(404, 'User not found.');
                return;
            }
            console.log(user);
            resp(200, {
                userName: user.userName,
                phone: user.phone,
            });
        } catch (e) {
            resp(404, 'User not found.');
            return;
        }
        
    } else {
        resp(404, 'Nobody loggedin.');
    }
};

module.exports = {
    apis: [{
        method: 'GET',
        path: '/api/getUserInfo',
        func: getUserInfo
    }]
};
