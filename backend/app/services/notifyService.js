const mainChannelKey = 'main';

function notify(action, data, receiver) {
    const channel = receiver || mainChannelKey;
    return global.io.to(channel).emit('action', Object.assign({ type: action }, data));
}

module.exports = {
    notify
};
