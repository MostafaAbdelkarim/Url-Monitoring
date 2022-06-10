const Joi = require('joi');

const checkValidation = {
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        url: Joi.string().uri({scheme: ['http', 'https', 'tcp']}).required(),
        protocol: Joi.string().valid('http', 'https', 'tcp').required(),
        path: Joi.string(),
        port: Joi.number(),
        webhook: Joi.string(),
        timeout: Joi.number(),
        interval: Joi.number(),
        threshold: Joi.number(),
        authentication: Joi.object({username: Joi.string().required(), password: Joi.string().required()}),
        httpHeaders: Joi.object(),
        assert: Joi.object({statusCode: Joi.number().required()}),
        tags: Joi.object(),
        ignoreSSL: Joi.boolean()
      })
      .required(),
  };

  
module.exports = {checkValidation};