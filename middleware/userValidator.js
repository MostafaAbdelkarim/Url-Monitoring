const Joi = require('joi');

const userValidation = {
    body: Joi.object()
      .keys({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required(),
      })
      .required(),
  };

  
module.exports = {userValidation};