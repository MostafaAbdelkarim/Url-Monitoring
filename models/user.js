const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pleae enter your name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Pleae enter your email'],
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Pleae enter your password'],
        minlength: 8,
        maxlength: 255
    },
    emailToken: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'), {expiresIn: '10h'});
    return token;
  };

const User = mongoose.model('Users', userSchema);

module.exports = {User};
