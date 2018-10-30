const mongoose = require('mongoose');

const appresponse = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    answer: String,
    network: String,
    acceleration: String,
    timestamp: String,
    gps: String,
    lightsensor: String,
    uuid: String,
});

module.exports = mongoose.model('AppResponse',appresponse);