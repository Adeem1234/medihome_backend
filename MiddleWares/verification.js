const Joi = require('joi');

module.exports = {
    loginValidation: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.required(),
            password: Joi.string().required(),
            type: Joi.string().required()
        }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next;
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    registraionValidation: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.email().required(),
            password: Joi.string().required(),
            type: Joi.string().required()
        }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    

};