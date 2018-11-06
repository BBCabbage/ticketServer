const jwt = require('jsonwebtoken');
var User = require('../models/User');

var test = async ctx => {
    const resp = require('../auxiliary').resp(ctx);
    //console.log(ctx.request.header);
    //console.log(ctx.request.body);
    //ctx.response.body = 'test';
    //console.log(ctx.status);
    //console.log(ctx.cookies.get('token123'));
    //let tk = await jwt.sign({username: '123', password: '456'}, 'tw', {expiresIn: '3d'});
    //ctx.response.body = tk;
    /*
    try {
        let token = await jwt.verify(ctx.cookies.get('twtoken'), 'tw');
        ({userName, password} = token);
        ctx.response.body = 'username: ' + userName + '\npassword: ' + password;
    } catch (err) {
        console.log(err);
        ctx.response.body = 'failed';
    }*/
    //users = await User.find({});
    //resp(200, users);
    //let token = await jwt.verify(ctx.cookies.get('twtoken'), 'tw');
    //ctx.cookies.set('twtoken', '', { maxAge: 0 });
    if (ctx.cookies.get('test') === 'test') {
        console.log('cookie');
    }
    else {
        console.log('no cookie');
    }
    resp(200, 'test');
    ctx.cookies.set('test', 'test');
}

module.exports = {
    apis: [{
        method: 'GET',
        path: '/',
        func: test
    }]
};
