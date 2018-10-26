
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const controllers = require(`${__dirname}/controllers/controllers`);
//const errh = require(`${__dirname}/errh`);
const mgodb = require(`${__dirname}/mgodb`);

async function initApp() {
    var app = new Koa();
    app.use(bodyparser());
    //app.use(errh);
    app.use(await controllers());
    return app;
}

//  填入datebase的uri
var uri = ``;

mgodb(uri, () => {
    initApp().then(app => {
        const port = process.env.PORT || 8080;
        app.listen(port, () => {
            console.log('Listening on port ' + port);
        });
    });
});

console.log('Starting server...');
