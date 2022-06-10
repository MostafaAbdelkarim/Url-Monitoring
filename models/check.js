const mongoose = require('mongoose');

const checkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    name:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    protocol: {
        type: String,
        enum: ['http', 'https', 'tcp'],
        required: true
    },
    path:{
        type: String,
        required: false
    },
    port:{
        type: Number,
        required: false
    },
    webhook:{
        type: String,
        required: false
    },
    timeout:{
        type: Number,
        required: false,
        default: 5
    },
    interval:{
        type: Number,
        required: false,
        default: 600
    },
    threshold:{
        type: Number,
        required: false,
        default: 1
    },
    authentication:{
        username: String,
        password: String,
        required: false
    },
    httpHeaders:{
        type: Object,
        required: false
    },
    assert:{
        statusCode: Number,
        required: false
    },
    tags:{
        type: Object,
        required: false
    },
    ignoreSSL:{
        type: Boolean,
        required: false,
        default: false
    }
});

const Check = mongoose.model('Checks', checkSchema);


module.exports = Check;