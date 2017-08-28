const mongoose = require('../bootstrap/mongoose');
const config = require('../config');

mongoose.set('debug', false);

if (mongoose.connection.readyState !== 1) {
    mongoose.connect(config.mongoose.uri, config.mongoose.options);
}
