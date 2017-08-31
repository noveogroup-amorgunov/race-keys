const logger = require('winston');

const mainChannelKey = 'main';

function notify(action, data, receiver) {
    const channel = receiver || mainChannelKey;
    logger.debug(`SERVER ACTION: ${JSON.stringify({ channel, type: action })}`);
    return global.io.to(channel).emit('action', Object.assign({ type: action }, data));
}

module.exports = {
    notify
};
