require('dotenv-extended').load();

const isTest = process.env.NODE_ENV === 'test';
let mongoUri = `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`;

if (isTest) {
    mongoUri = `${mongoUri}_test`;
}

module.exports = {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    frontend: {
        endpoint: process.env.FRONTEND_ENDPOINT,
        routes: {
            resetPassword: 'reset/',
        }
    },
    socket: {
        host: process.env.SOCKET_HOST,
        port: process.env.SOCKET_PORT,
    },
    auth: {
        deletePatientTokenLifetime: 30,
        tokenLifetime: 30, // in days
        resetPassword: {
            maxAttempts: 3, // 3 attempts per 1 day
            tokenLifetime: 1 // in days
        }
    },
    mongoose: {
        uri: mongoUri,
        options: {
            keepAlive: 1,
            poolSize: 5,
            useMongoClient: true
        },
        logging: process.env.MONGO_LOGGING !== 'false'
    },
    redis: {
        client: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
            lazyConnect: true,
        },
        keys: {
            user: 'user'
        }
    },
    pagination: {
        default: +process.env.PAGINATION_DEFAULT || 15,
    },
    timezones: {
        defaultZone: 'Europe/London',
        autocompleteMaxLength: isTest ? 5 : 20,
    },
};
