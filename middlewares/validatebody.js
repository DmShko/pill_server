const HttpError = require('../helpers/HttpError');

const validateBody = schema => {
  
    const func = async(req, res, next) => {
        
        const { error } = schema.validate(req.body.data);
 
        if (error) {
           
            next(HttpError(
                400,
                `missing required ${error.message
                .split(" ")
                .filter(
                    (value) =>
                    value !== "is" && value !== "required" && value !== "field"
                )} field`
            ));
        }

        next();
    };

    return func;

}

module.exports = validateBody;
