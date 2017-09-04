const mongoose = require('mongoose');

const textSchema = mongoose.Schema({
    text: String,
    source: String,
}, {
    timestamps: true,
});

textSchema.statics.getRandom = async function getRandom() {
    const count = await this.count();
    const rand = Math.floor(Math.random() * count);
    return this.findOne().skip(rand);
};

const Text = mongoose.model('Text', textSchema);

module.exports = Text;
