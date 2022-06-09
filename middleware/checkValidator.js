const Joi = require('joi');

const checkValidation = {
    body: Joi.object()
      .keys({
        userId: Joi.string().required()
      })
      .required(),
  };

  
module.exports = {checkValidation};