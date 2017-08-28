const mongoose = require('mongoose');

const textSchema = mongoose.Schema({
    text: String,
    source: String,
}, {
    timestamps: true,
});

const Text = mongoose.model('Text', textSchema);

module.exports = Text;
