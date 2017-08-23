require('./app/services/logger');
require('dotenv-extended').load();

const Koa = require('./bootstrap/application');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const fs = require('fs');

const {
    errorHandlerMiddleware,
    mongooseErrorHandlerMiddleware,
    responseMiddleware,
    notFoundMiddleware,
} = require('./app/middlewares');

fs.readdirSync('./app/models').forEach(file => require(`./app/models/${file}`));

const app = new Koa();

app.use(errorHandlerMiddleware);
app.use(mongooseErrorHandlerMiddleware);
app.use(bodyParser());
app.use(responseMiddleware);
app.use(koaLogger());

require('./routes')(app);

app.use(notFoundMiddleware); // 404

module.exports = app;
