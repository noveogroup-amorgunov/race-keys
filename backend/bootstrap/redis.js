const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class Redis {
    construnctor() {
        this.client = null;
    }

    getClient() {
        return this.client;
    }

    connect(config) {
        if (!this.client) {
            this.client = redis.createClient(config);
        }
        return this.client;
    }
    disconnect() {
        if (this.client) {
            this.client.quit();
            this.client = null;
        }
    }
}

const redisService = new Redis();
module.exports = redisService;
