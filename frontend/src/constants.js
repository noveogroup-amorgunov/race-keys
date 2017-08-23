export const API_URL = process.env.API_URL;
export const SOCKET_URL = process.env.SOCKET_URL;
export const LOCAL_STORAGE_KEY = 'race.keys';
export const RACES_PER_PAGE = 5;

export const Errors = {
    INVALID_USERNAME_OR_PASSWORD: 'INVALID_USERNAME_OR_PASSWORD',
    USERNAME_ALREADY_USED: 'USERNAME_ALREADY_USED',
    TOKEN_REQUIRED: 'TOKEN_REQUIRED',
    TOKEN_INVALID: 'TOKEN_INVALID',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    FORBIDDEN: 'FORBIDDEN',
    BAD_REQUEST: 'BAD_REQUEST',
    UNAUTHORIZED: 'UNAUTHORIZED'
};

export const socketPrefix = 'server/';

export const gameStatuses = {
    IN_PROCESS: 1,
    WAIT_PLAYERS: 2,
    FINISHED: 3,
};
