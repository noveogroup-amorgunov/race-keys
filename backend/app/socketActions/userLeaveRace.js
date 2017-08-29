const _ = require('lodash');
const { Race } = require('mongoose').models;
const { mainTypes, gameErrors } = require('../../config/gameTypes');
const raceRepository = require('../repositories/raceRepository');
const playerRepository = require('../repositories/playerRepository');
const { notify } = require('../services/notifyService');

module.exports = async (io, player, socket) => {
    const race = await raceRepository.getRaceById(player.raceId);

    if (race === null) {
        notify(mainTypes.LEAVE_RACE_ERROR, { error: gameErrors.RACE_NOT_FOUND }, player.socketId);
        return;
    }

    socket.join('main');

    if (race.status !== Race.statuses.IN_PROCESS) {
        socket.leave(player.raceId);
        notify(mainTypes.USER_LEAVES_RACE, { player: player.toJson() }, player.raceId);

        await race.removePlayer(player);
        await race.save();
        await playerRepository.removePlayerBySocketId(player.socketId);

        notify(mainTypes.RACE_CHANGED, { race: race.toJson() });

        /* if (race.isEmptyRace()) {
            notify(mainTypes.RACE_DELETED, { raceId: race.id });
            await race.remove();
        } else {
            notify(mainTypes.RACE_CHANGED, { race: race.toJson() });
        } */
    }
};
