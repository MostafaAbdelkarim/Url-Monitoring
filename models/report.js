const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    checkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checks',
        required: true
    },
    status: {
        type: Number,
        required: false
    },
    availability: {
        type: Number,
        required: false,
        default: 0
    },
    outages: {
        type: Number,
        required: false,
        default: 0
    },
    downtime: {
        type: Number,
        required: false,
        default: 0
    },
    uptime: {
        type: Number,
        required: false,
        default: 0
    },
    responseTime: {
        type: Number,
        required: false,
        default: 0
    },
    history: {
        type: String,
        required: false,
        default: 0
    }
});

const Report = mongoose.model('Reports', reportSchema);

module.exports = {Report};