const { authMiddleware } = require('../app/middlewares');
const authController = require('../app/controllers/auth-controller');

module.exports = (router) => {
    router.post('/auth/login', authController.login);
    router.post('/auth/signup', authController.signup);
    router.get('/auth/test', authMiddleware, authController.test);
};
