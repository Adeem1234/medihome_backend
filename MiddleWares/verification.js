const Joi = require('joi');

module.exports = {
    loginValidation: (req, res, next) => {
        console.log("schema")
        const schema = Joi.object({ unique_id: Joi.string().required(), name: Joi.string().required(), avatar: Joi.string().allow(null, ''), deviceId: Joi.string().required() }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    appleLoginValidation: (req, res, next) => {
        console.log("schema")
        const schema = Joi.object({
            unique_id: Joi.string().required(),
            deviceId: Joi.string().required()
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
    profileUpdateValodation: (req, res, next) => {
        const schema = Joi.object({ userName: Joi.string().required(), age: Joi.string().required(), profile_answers: Joi.array().items(Joi.string().allow(null).allow('')), }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    FeedbackValidation: (req, res, next) => {
        const schema = Joi.object({ callId: Joi.required(), feedback: Joi.required() }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            console.log(message);
            return res.status(400).send({ data: { message: message } });
        }
    },
    emojiValidation: (req, res, next) => {
        const schema = Joi.object({ emoji: Joi.string().required() }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    colorValidation: (req, res, next) => {
        const schema = Joi.object({ color: Joi.string().required() }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    avatarValidation: (req, res, next) => {
        const schema = Joi.object({ avatar: Joi.string().required() }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    callValidation: (req, res, next) => {
        const schema = Joi.object({ id: Joi.required() }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    reviewsValidation: (req, res, next) => {
        const schema = Joi.object({ review: Joi.string().required(), userId: Joi.required() }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    addFriendValidation: (req, res, next) => {
        const schema = Joi.object({ id: Joi.required() }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    removeFriendValidation: (req, res, next) => {
        const schema = Joi.object({ id: Joi.required() }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    acceptFriendValidation: (req, res, next) => {
        const schema = Joi.object({ id: Joi.string() }).options({ abortEarly: false });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    rejectFriendValidation: (req, res, next) => {
        const schema = Joi.object({ id: Joi.string(), type: Joi.string(), });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    callValidation: (req, res, next) => {
        const schema = Joi.object({ id: Joi.string() });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    },
    reportValidation: (req, res, next) => {
        const schema = Joi.object({ id: Joi.string().required(), description: Joi.string().required() });
        const validation = schema.validate(req.body);
        if (validation.error === undefined) {
            next();
        } else {
            let message = [];
            validation.error.details.map(async (detail) => { await message.push(detail.message); });
            return res.status(400).send({ data: { message: message } });
        }
    }
};