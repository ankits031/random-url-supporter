const mongoose = require('mongoose');

const urlSupporterSchema = new mongoose.Schema({
    urlPath: {
        type: String,
        required: true,
    },
    counter: {
        type: Number,
    },
});

module.exports = mongoose.model('urlSupporter', urlSupporterSchema);
