const
    Koa = require('koa'),
    logger = require('winston'),
    assert = require('assert'),
    config = require('../config'),
    mongoose = require('./mongoose'),
    redis = require('./redis'),
    socketHandler = require('../app/services/socket-handler');

class Application extends Koa {
    async start() {
        logger.notice('App enviroment (process.env.NODE_ENV): %s', process.env.NODE_ENV);
        await this.connectRedis();
        await this.connectMongoose();

        this.createSocketServer();

        this.server = this.listen(config.port, config.host, () =>
            logger.notice('Listening api server on host %s:%s', config.host, config.port)
        );
    }
    async createSocketServer() {
        const app = new Koa();

        const server = require('http').createServer(app.callback());
        const io = require('socket.io')(server);

        global.io = io;

        server.listen(config.socket.port, () => {
            logger.notice('Listening io server on host %s:%s', config.socket.host, config.socket.port);
        });

        io.use(socketHandler(io));
        // io.on('connection', socketHandler(io));
    }

    async stop() {
        await new Promise((resolve, reject) => {
            this.server = this.server.close(err => (err ? reject(err) : resolve()));
            logger.notice('Stop listening on host %s:%s', config.host, config.port);
        });
    }
    async connectMongoose() {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(config.mongoose.uri, config.mongoose.options);
        }
    }
    async connectRedis() {
        if (!redis.client) {
            await redis.connect(config.redis.client);
        }
    }
    onerror(err, ctx) {
        assert(err instanceof Error, `non-error thrown: ${err}`);
        if (err.status === 404 || err.expose) return;
        if (this.silent) return;
        const data = {
            request: {
                method: ctx.request.method,
                url: ctx.request.url,
                header: ctx.request.header,
                body: ctx.request.body,
                query: ctx.request.query
            },
            response: ctx.response
        };
        const msg = err.stack || err.toString();
        logger.error(`${msg}\n\n${JSON.stringify(data)}`);
    }
}

module.exports = Application;
