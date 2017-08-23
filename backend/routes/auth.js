const { isAuthenticated } = require('../app/middlewares');
const validator = require('../app/middlewares/validator-middleware');
const authValidatorRules = require('../app/validators/auth-validator');
const authController = require('../app/controllers/auth-controller');

module.exports = (router) => {
    router.post('/auth/login', validator(authValidatorRules.login), authController.login);
    router.post('/auth/signup', validator(authValidatorRules.signup), authController.signup);
    router.get('/auth/test', isAuthenticated, authController.test);
};
