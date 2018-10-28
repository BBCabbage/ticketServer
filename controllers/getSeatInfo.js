var Seat = require('../models/Seat');

var getSeatInfo = async ctx => {
    const resp = (status, body) => {
        ctx.status = status;
        ctx.response.body = body;
    };
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
};

module.exports = [{
    method: 'POST',
    path: '/api/getSeatInfo',
    func: getSeatInfo
}];
