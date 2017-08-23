const _ = require('lodash');
const redis = require('../../bootstrap/redis');
const { redis: redisConfig } = require('../../config');

class UserRedisService {
    constructor(userId, socketId) {
        this.userId = userId;
        this.socketId = socketId;
    }

    add() {
        return redis.client.hmset(this.key, this.socketId, true);
    }

    remove() {
        return redis.client.hdel(this.key, this.socketId);
    }

    get key() {
        return `${redisConfig.keys.user}:${this.userId}`;
    }

    static async clear() {
        /*const keys = await redis.client.keys(`${redisConfig.keys.user}:*`);
        const pipeline = redis.client.pipeline();
        keys.forEach((key) => {
            pipeline.del(key);
        });
        return pipeline.exec();*/
    }
}

module.exports = UserRedisService;
