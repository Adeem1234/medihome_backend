const Joi = require('joi');

module.exports = {
    loginValidation: (req, res, next) => {
        const schema = Joi.object({ email: Joi.email().required(), password: Joi.string().required(), type: Joi.string().required() }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    registraiomValidation: (req, res, next) => {
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
    userNameValidation: (req, res, next) => {
        const schema = Joi.object({ userName: Joi.string().required() }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    // profileUpdateValodation: (req, res, next) => {
    //     const schema = Joi.object({ userName: Joi.string().required(), age: Joi.string().required(), profile_answers: Joi.array().items(Joi.string().allow(null).allow('')), }).options({ abortEarly: false });
    //     const validation = schema.validate(req.body);
    //     if (validation.error === undefined) {
    //         next();
    //     } else {
    //         let message = [];
    //         validation.error.details.map(async (detail) => { await message.push(detail.message); });
    //         return res.status(400).send({ data: { message: message } });
    //     }
    // },


};