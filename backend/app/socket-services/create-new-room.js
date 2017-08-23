const { mainTypes } = require('../constraints/game-actions');

module.exports = (room) => {
    global.io.to('main').emit('action', {
        type: mainTypes.NEW_ROOM_CREATED,
        room
    });
};
