const { isAuthenticated } = require('../app/middlewares');
const validator = require('../app/middlewares/validatorMiddleware');
const authValidatorRules = require('../app/validators/authValidator');
const authController = require('../app/controllers/authController');

module.exports = (router) => {
    router.post('/auth/login', validator(authValidatorRules.login), authController.login);
    router.post('/auth/signup', validator(authValidatorRules.signup), authController.signup);
    router.get('/auth/test', isAuthenticated, authController.test);
};
