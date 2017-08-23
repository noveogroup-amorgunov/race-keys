const { isAuthenticated } = require('../app/middlewares');
const userController = require('../app/controllers/user-controller');

module.exports = (router) => {
    router.get('/me', isAuthenticated, userController.me);
};
