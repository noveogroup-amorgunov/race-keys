const raceValidatorRules = require('../app/validators/raceValidator');
const raceController = require('../app/controllers/raceController');
const validator = require('../app/middlewares/validatorMiddleware');
const { isAuthenticated } = require('../app/middlewares');

module.exports = (router) => {
    router.post('/races', raceController.createRace);
    router.get('/races/open', raceController.getOpenRaces);
    router.get('/races/:id', validator(raceValidatorRules.getRace), raceController.getRace);
};
