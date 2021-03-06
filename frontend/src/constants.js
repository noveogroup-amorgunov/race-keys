export const API_URL = process.env.API_URL;
export const SOCKET_URL = process.env.SOCKET_URL;
export const HOST_URL = process.env.HOST_URL;

export const SOCKET_STORE_KEY = 'socket';
export const LOCAL_STORAGE_KEY = 'race.keys';
export const RACES_PER_PAGE = 5;
export const CAR_COUNT = 15;

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
    UNAUTHORIZED: 'UNAUTHORIZED',

    RACE_NOT_FOUND: 'RACE_NOT_FOUND',
    PLAYER_NOT_FOUND: 'PLAYER_NOT_FOUND',
    RACES_NOT_EXISTS: 'RACES_NOT_EXISTS',
};

export const socketPrefix = 'server/';

export const gameStatuses = {
    IN_PROCESS: 1,
    WAIT_PLAYERS: 2,
    FINISHED: 3,
};
