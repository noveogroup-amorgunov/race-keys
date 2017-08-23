import { request } from '../../helpers';

const service = {
    /**
     * @param {UserCredentials} credentials
     * @return {Promise.<Object>}
     */
    requestLogin(credentials) {
        return request({
            method: 'post',
            url: '/auth/login',
            data: credentials
        });
    },
    /**
     * @param {UserCredentials} credentials
     * @return {Promise.<Object>}
     */
    requestRegister(credentials) {
        return request({
            method: 'post',
            url: '/auth/signup',
            data: credentials
        });
    }
};

export default service;
