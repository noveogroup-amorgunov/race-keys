const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: Number,
        required: true
    },
    expiresIn: Date
}, {
    timestamps: true
});

const Token = mongoose.model('Token', tokenSchema);

Token.types = Object.freeze({
    ACCESS: 1,
});

module.exports = Token;
