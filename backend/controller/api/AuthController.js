const User = require('../../model/UsersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { loginValidation } = require('../../middlewares/verification');

module.exports = {
    login: async (req, res, next) => {
        try {
            const error = loginValidation(req.body);
            if (error) {
                return res.status(401).send(error.details[0].message);
            }
            const savedUser = await User.findOne({ email: req.body.email });
            if (savedUser) {
                // if (savedUser.type === req.body.type) {

                const validPass = await bcrypt.compare(req.body.password, savedUser.password);
                if (!savedUser) { return res.status(401).send('Email is Incorrect '); }
                if (!validPass) { return res.status(422).send('Password is Incorrect'); }
                let user = savedUser
                const authToken = await jwt.sign({ user }, process.env.TOKEN_SECRET);
                await res.send({ user: savedUser, token: authToken });
            }
            else {
                res.status(401).send({ message: 'Incorrect User Type' })
            }
        } catch (err) {
            res.status(401).send({ message: err });
        }
    },
    register: async (req, res) => {
        try {
            if (req.body !== {}) {
                const { email, type, password, name, phoneNo } = req.body;
                const oldUser = await User.findOne({ email: email });
                if (!oldUser) {
                    const salt = await bcrypt.genSalt(10);
                    const hashpassword = await bcrypt.hash(password, salt);
                    let user = new User({ name: name, email: email, type: type, password: hashpassword, phoneNo: phoneNo });
                    user = await user.save();
                    tokenData = { user: user, type: type }
                    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY);
                    return res.json({ data: { token: token, user: user } });
                }
                else { return res.send(401).send({ data: { msg: 'This Email is Already Registered' } }) }
            } else { return res.status(401).send('no Parameter send in request body'); }
        } catch (error) {
            return res.status(401).send({ data: { message: error.message } });
        }
    }
};