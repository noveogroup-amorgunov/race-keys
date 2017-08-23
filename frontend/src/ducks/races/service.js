import { request } from '../../helpers';

const service = {
    /**
     * @param  {Number} limit
     * @param  {Number} offset
     * @return {Promise.<Object>}
     */
    fetchRaces(limit = 5, offset = 0) {
        console.log('service::fetchRaces');
        return request({
            url: `/rooms?limit=${limit}&offset=${offset}`
        });
    },

    /**
     * @param {String} token
     * @param {RaceData} raceData
     * @return {Promise.<Object>}
     */
    createRace(token, raceData) {
        return request({
            method: 'post',
            url: '/rooms',
            data: raceData,
            headers: {
                authorization: token
            }
        });
    },
};

export default service;
