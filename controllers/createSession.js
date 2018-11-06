var Seat = require('../models/Seat');
var Session = require('../models/Session');

var createSession = async ctx => {
    const resp = require('../auxiliary').resp(ctx);

    var session = new Session ({
        name: ctx.request.body.name,
        singer: ctx.request.body.singer,
        sessionTime: Date.now(),
        place: ctx.request.body.place,
    });
    res = await session.save();
    for (i = 1; i <= 10; i++) {
        seat = new Seat({
            session: res._id,
            seat: '第' + String(i) + '号座',
            price: 10000
        });
        await seat.save();
    }
};
/*
module.exports = {
    apis: [{
        method: 'POST',
        path: '/admin/api/createSession',
        func: createSession
    }]
};
*/