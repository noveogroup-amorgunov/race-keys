const crypto = require('crypto');

module.exports = async size =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(size, (err, buffer) => (err ? reject(err) : resolve(buffer.toString('base64')
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, ''))));
    });
