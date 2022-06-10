const Joi = require('joi');

const checkValidation = {
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        url: Joi.string().uri({scheme: ['http', 'https', 'tcp']}).required(),
        protocol: Joi.string().valid('HTTP', 'HTTPS', 'TCP').required()
      })
      .required(),
  };

  
module.exports = {checkValidation};