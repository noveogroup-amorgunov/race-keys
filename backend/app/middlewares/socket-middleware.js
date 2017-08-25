const Redis = require('ioredis');
const { Token } = require('mongoose').models;
const { redis: redisConfig } = require('../../config');
const logger = require('../services/logger');
const UserRedisService = require('../services/user-redis');
const SocketException = require('../exceptions/socket-exception');


module.exports = async (socket, next) => {
    // io.on('connection', function(socket){
    //   console.log('a user connected');
    // });
    console.log('SOCKET MIDDLEWARE');

    /*if (!socket.handshake.query.token) {
        return next(new SocketException(socket, 'unauthorized'));
    }
    const tokenWithUser = await Token.findOne({
        token: socket.handshake.query.token,
        type: Token.types.ACCESS,
        expiresIn: {
            $gt: Date.now()
        }
    }).populate('user', '-password');

    if (!tokenWithUser || !tokenWithUser.user) {
        return next(new SocketException(socket, 'unauthorized'));
    }

    const user = tokenWithUser.user;
    const client = new Redis(redisConfig.client);

    const userRedis = new UserRedisService(user._id, socket.id);
    await user.touch(true);
    await userRedis.add();
    socket.user = user;

    client.on('message', (channel, message) => {
        console.log('MESSAGE!!!!!!!:', message);
        try {
            const data = JSON.parse(message);
            if (socket.user._id.toString() === channel) {
                socket.error({ channel, data });
            }
        } catch (err) {
            logger.error(err);
        }
    });
    await client.subscribe(socket.user._id.toString());
    socket.redisClient = client;

    socket.on('disconnect', async () => {
        const user = await Player.getPlayerBySocketId(client.id);
        if (user !== null) {
            socketProcessors.userLeavesRoom(io, user, client);
        }

        await client.quit();
        await userRedis.remove();
    });*/

    return next();
};
