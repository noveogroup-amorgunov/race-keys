const
    mongoose = require('mongoose'),
    config = require('../config'),
    logger = require('winston');

const mongooseLog = (collectionName, method, query, doc, options) => {
    let output = `[Mongo] ${collectionName}.${method}(${JSON.stringify(query)}, ${JSON.stringify(doc)})`;
    if (options) {
        output += `, options=${JSON.stringify(options)}`;
    }
    logger.debug(output);
};

mongoose.set('debug', config.mongoose.logging ? mongooseLog : false);
mongoose.Promise = global.Promise;

module.exports = mongoose;
