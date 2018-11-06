var User = require('../models/User');

async function isExist(userName) {
    try {
        if (await User.findOne({ userName: userName }))
            return true;
        return false;
    } catch (e) {
        return false;
    }
}

async function userReg({ userName, password, phone }) {
    var user = new User({
        userName: userName,
        password: password,
        phone: phone || '',
    });
    try {
        if (await user.save())
            return true;
        return false;
    } catch (e) {
        return false;
    }
}

var register = async ctx => {
    const resp = require('../auxiliary').resp(ctx);
    ({ userName, password } = ctx.request.body);
    if (!(userName && password))
        resp(400, 'Missing parameters.');
    if (await isExist(userName))
        resp(401, 'This username is already exists.');
    else {
        if(await userReg(ctx.request.body))
            resp(200, 'Success');
        else
            resp(401, 'Failed to create user.');
    }
};

module.exports = {
    apis: [{
        method: 'POST',
        path: '/api/register',
        func: register
    }]
};
