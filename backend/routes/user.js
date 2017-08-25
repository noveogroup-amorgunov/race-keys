const { isAuthenticated } = require('../app/middlewares');
const userController = require('../app/controllers/userController');

module.exports = (router) => {
    router.get('/me', isAuthenticated, userController.me);
};
