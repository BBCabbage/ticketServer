const jwt = require('jsonwebtoken');


var test = async ctx => {
    //console.log(ctx.request.header);
    //console.log(ctx.request.body);
    //ctx.response.body = 'test';
    //console.log(ctx.status);
    //console.log(ctx.cookies.get('token123'));
    //let tk = await jwt.sign({username: '123', password: '456'}, 'tw', {expiresIn: '3d'});
    //ctx.response.body = tk;
    /*
    try {
        let token = await jwt.verify(ctx.cookies.get('token'), 'tw');
        ({userName, password} = token);
        ctx.response.body = 'username: ' + userName + '\npassword: ' + password;
    } catch (err) {
        console.log(err);
        ctx.response.body = 'failed';
    }*/
    ({a, b} = ctx.request.body);
    console.log(a + '\n' + b);
};

module.exports = [{
    method: 'POST',
    path: '/',
    func: test
}];