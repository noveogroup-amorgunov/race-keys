const { isAuthenticated } = require('../app/middlewares');
const raceController = require('../app/controllers/raceController');

module.exports = (router) => {
    router.post('/race', raceController.createRace);
    router.get('/race/:id', raceController.getRace);
    router.get('/race/open', raceController.getOpenRaces);
};
