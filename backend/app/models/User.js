const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate');
const moment = require('moment');

const userSchema = mongoose.Schema({
    name: String,
    login: {
        type: String,
        unique: true,
    },
    game: {
        car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car',
        },
        races: {
            type: Number,
            default: 0,
        },
        averageSpeed: {
            type: Number,
            default: 0,
        },
        maxSpeed: {
            type: Number,
            default: 0,
        }
    },
    password: String,
});

userSchema.plugin(mongoosePaginate);

userSchema.pre('save', async function preSave(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
});

userSchema.methods.comparePassword = function comparePassword(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.diffBetweenResetPasswordDateAndNow = function diffBetweenResetPasswordDateAndNow(unit = 'days') {
    if (this.resetPassword.date) {
        return moment().diff(this.resetPassword.date, unit);
    }
    return null;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
