const _ = require("lodash");

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const options = {
        abortEarly: true,
        allowUnknown: false,
        stripUnknown: false,
      };

      if (schema && !_.isEmpty(schema)) {
        const validations = ["headers", "params", "query", "files", "body"].map(
          (key) => {
            const _schema = schema[key];
            const value = req[key];

            return _schema
              ? _schema.validateAsync(value, options)
              : Promise.resolve();
          }
        );
        await Promise.all(validations);
        return next();
      } else {
        return res.status(400).json({
          error: "Empty validation schema provided!",
        });
      }
    } catch (error) {
      const message = error.details[0].message.replace(/['"]/g, "");
      return res.status(400).json({
        error: message,
      });
    }
  };
};

module.exports = {
  validate,
};