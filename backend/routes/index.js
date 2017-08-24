const
    Router = require('koa-router'),
    serve = require('koa-static');

const router = new Router();

require('./auth')(router);
require('./user')(router);
require('./race')(router);

module.exports = (app) => {
    app.use(serve(`${__dirname}/resources`));
    app.use(router.routes());
};
