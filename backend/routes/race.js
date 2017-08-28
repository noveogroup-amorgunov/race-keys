const { isAuthenticated } = require('../app/middlewares');
const raceController = require('../app/controllers/raceController');

module.exports = (router) => {
    router.post('/races', raceController.createRace);
    router.get('/races/:id', raceController.getRace);
    router.get('/races/open', raceController.getOpenRaces);
};
