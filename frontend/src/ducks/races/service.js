import { request } from '../../helpers';

const service = {
    /**
     * @return {Promise.<Object>}
     */
    fetchRaces() {
        return request({ url: '/races/open' });
    },

    /**
     * @param {String} token
     * @return {Promise.<Object>}
     */
    fetchNotFinishedRaces(token) {
        return request({
            url: '/races/not-finished',
            headers: {
                authorization: token
            }
        });
    },

    /**
     * @param  {String} id
     * @return {Promise.<Object>}
     */
    fetchRace(id) {
        return request({ url: `/races/${id}` });
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
