import { request } from '../../helpers';

const service = {
    /**
     * @param  {Number} limit
     * @param  {Number} offset
     * @return {Promise.<Object>}
     */
    fetchRaces(limit = 5, offset = 0) {
        // console.log('service::fetchRaces');
        return request({
            // url: `/races/open?limit=${limit}&offset=${offset}`
            url: '/races/open'
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
            url: '/races',
            data: raceData,
            headers: {
                authorization: token
            }
        });
    },
};

export default service;
