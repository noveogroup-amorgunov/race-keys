const { isAuthenticated } = require('../app/middlewares');
const roomController = require('../app/controllers/room-controller');

module.exports = (router) => {
    router.post('/rooms', roomController.createRoom);
    router.get('/rooms/:id', roomController.getRoom);
    router.get('/rooms', roomController.getRooms);
};
