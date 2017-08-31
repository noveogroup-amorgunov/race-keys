const app = require('../app');

app.start();

// http://pm2.keymetrics.io/docs/usage/signals-clean-restart/
process.on('SIGINT', async () => {
    await app.stop();
    process.exit(0);
});
