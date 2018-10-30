const jwt = require('jsonwebtoken');

var logout = async ctx => {
    const resp = require('../auxiliary').resp(ctx);
    if (ctx.cookies.get('twtoken')) {
        ctx.cookies.set('twtoken', '', { maxAge: 0 });
        resp(200, 'Logout succeful.');
    } else {
        resp(404, 'Nobody loggedin.');
    }
}

module.exports = {
    apis: [{
        method: 'GET',
        path: '/api/logout',
        func: logout
    }]
};
