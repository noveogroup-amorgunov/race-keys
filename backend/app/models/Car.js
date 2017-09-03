const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    image: String,
    model: String,
}, {
    timestamps: true,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
