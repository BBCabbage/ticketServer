var Session = require('../models/Session');

var getSessionInfo = async ctx => {
    const resp = (status, body) => {
        ctx.status = status;
        ctx.response.body = body;
    };
    try {
        var sessions = await Session.find({});
        resp(200, { sessions: sessions });
    } catch (e) {
        resp(401, 'Failed.');
    }
};

module.exports = [{
    method: 'GET',
    path: '/api/getSessionInfo',
    func: getSessionInfo
}];
