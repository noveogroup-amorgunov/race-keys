import { request } from '../../helpers';

const service = {
    fetchUser(token) {
        return request({
            method: 'get',
            url: '/me',
            headers: {
                authorization: token
            }
        });
    },
};

export default service;
