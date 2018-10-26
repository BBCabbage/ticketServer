var router = require('koa-router')();

const bindAPI = (c) => {
    if (c.method === 'GET') {
        router.get(c.path, c.func);
        console.log(`Controller added: GET ${c.path}`);
    } else if (c.method === 'POST') {
        router.post(c.path, c.func);
        console.log(`Controller added: POST ${c.path}`);
    }
};

async function bindJsAPIs(bin) {
    let js = await require(bin);
    if (js instanceof Array)
        js.forEach(c => bindAPI(c));
}

async function bindControllers(dir) {
    const fs = require('fs');
    let js_files = fs.readdirSync(dir)
                     .filter(f => f.endsWith('.js') && 
                                  f !== 'controllers.js');
    let to_exec = js_files.map(js_f => 
                                bindJsAPIs(`${dir}/${js_f}`));
    await Promise.all(to_exec);
}


module.exports = async (dir = __dirname) => {
    await bindControllers(dir);
    return router.routes();
};
