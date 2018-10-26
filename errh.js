
module.exports = async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        console.log(`URL:${ctx.url} not found.`);
        ctx.body = '404 not found.';
    }
}
