

module.exports = {
    resp: ctx => {
        return (status, body) => {
            ctx.status = status;
            ctx.response.body = body;
        }
    }
}