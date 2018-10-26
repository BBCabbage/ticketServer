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

async function userReg({ userName, password, phone, address }) {
    var user = new User({
        userName: userName,
        password: password,
        phone: phone || '',
        address: address || ''
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
    ({ userName, password } = ctx.request.body);
    const resp = (status, body) => {
        ctx.status = status;
        ctx.response.body = body;
    };
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

module.exports = [{
    method: 'POST',
    path: '/api/register',
    func: register
}];
