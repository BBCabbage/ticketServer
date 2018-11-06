var User = require('../models/User');
const jwt = require('jsonwebtoken');

const checkingStatus = {
    success: 1,
    pswErr: 0,
    notFound: -1
};

async function check(userName, password) {
    try {
        if(user = await User.findOne({ userName: userName })) {
            if (user.password == password)
                return checkingStatus.success;
            else
                return checkingStatus.pswErr;
        }
        return checkingStatus.notFound;
    } catch (err) {
        return checkingStatus.notFound;
    }
}

var login = async ctx => {
    const resp = require('../auxiliary').resp(ctx);
    let userName, password;
    if (ctx.cookies.get('twtoken')) {
        try {
            decoded = await jwt.verify(ctx.cookies.get('twtoken'), 'tw');
            ({userName, password} = decoded);
        } catch (e) {
            resp(401, 'Failed to decoded the token.');
            return;
        }
    } else {
        ({userName, password} = ctx.request.body);
    }
    if (!(userName && password))
        resp(400, 'Missing parameters.');
    else
        switch (await check(userName, password)) {
            case checkingStatus.success:
                resp(200, 'Login succeful.');
                encoded = await jwt.sign({ userName: userName, password: password }, 'tw', { expiresIn: '3d' });
                ctx.cookies.set('twtoken', encoded, { maxAge: 14400000 });
                console.log(encoded);
                break;
            case checkingStatus.pswErr:
                resp(401, 'Error password.');
                break;
            case checkingStatus.notFound:
                resp(404, 'User not found.');
        }
};

module.exports = {
    apis: [{
        method: 'POST',
        path: '/api/login',
        func: login
    }]
};
