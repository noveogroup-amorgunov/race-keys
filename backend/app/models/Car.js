const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    name: String,
    model: String,
}, {
    timestamps: true,
});

carSchema.statics.getRandom = async function getRandom() {
    const count = await this.count();
    const rand = Math.floor(Math.random() * count);
    return this.findOne().skip(rand);
};

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
