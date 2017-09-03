import { request, Store } from '@/helpers';
import { SOCKET_STORE_KEY } from '@/constants';

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
    requestRegister(credentials, car) {
        return request({
            method: 'post',
            url: '/auth/signup',
            data: Object.assign(credentials, { car }),
        });
    },

    /**
     * @param  {String} token
     * @return {Promise}
     */
    socketReconnect(token = '') {
        const socket = (new Store()).find(SOCKET_STORE_KEY);
        socket.io.opts.query = { token };
        socket.disconnect();
        socket.connect();
        return Promise.resolve();
    }
};

export default service;
