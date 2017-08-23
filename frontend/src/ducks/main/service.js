import { request } from '../../helpers';
import { API_URL } from '../../constants';

const service = {
    createRoom: () => request({ url: API_URL.rooms, method: 'POST', data: {} }),
    fetchRooms: () => request({ url: API_URL.rooms }),
};

export default service;
