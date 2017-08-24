import axios from 'axios';
import { Errors, API_URL } from '@/constants';

export default function request(config) {
    const url = API_URL + config.url;
    config.method = config.method || 'get';
    return axios({ ...config, url }).then(
        response => response.data.data,
        (responseWithError) => {
            const error = new Error();
            try {
                if (responseWithError.response) {
                    error.code = Errors[responseWithError.response.data.error] || Errors.UNKNOWN_ERROR;
                } else {
                    error.code = Errors.UNKNOWN_ERROR;
                }
            } catch (err) {
                error.code = Errors.UNKNOWN_ERROR;
            }
            throw error;
        }
    );
}
