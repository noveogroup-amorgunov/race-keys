const app = require('../app');
const UserRedisService = require('../app/services/user-redis');

app.start();

// http://pm2.keymetrics.io/docs/usage/signals-clean-restart/
process.on('SIGINT', async () => {
    await app.stop();
    await UserRedisService.clear();
    process.exit(0);
});
