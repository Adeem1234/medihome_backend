const User = require('../../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { loginValidation } = require('../../middlewares/verification');

module.exports = {
    login: async (req, res, next) => {
        try {
            console.log(req.body);
            // const { error } = loginValidation(req.body);
            // console.log("error" + error);
            // if (error) {
            //     return res.status(401).send(error.details[0].message);
            // }
            const user = await User.findOne({ email: req.body.email });
            console.log("user" + user);
            if (user) {
                if (user.type === req.body.type) {

                    const validPass = await bcrypt.compare(req.body.password, user.password);
                    console.log("validPass" + validPass);
                    if (!user) { return res.status(401).send('Email is Incorrect '); }
                    if (!validPass) { return res.status(422).send('Password is Incorrect'); }
                    const token = await jwt.sign({ user: user, type: type }, process.env.TOKEN_SECRET);
                    console.log("token" + token);

                    await res.send({ user, token });
                }
                else {
                    res.status(401).send({ message: 'Incorrect User Type' })
                }
            }

        } catch (err) {
            throw err;
            res.status(401).send({ message: err });
        }
    },
    register: async (req, res) => {
        try {
            console.log(req.body)
            if (req.body !== {}) {
                const { email, type, password, name } = req.body;
                const oldUser = await User.findOne({ email: email });
                if (!oldUser) {
                    const salt = await bcrypt.genSalt(10);
                    const hashpassword = await bcrypt.hash(password, salt);
                    let user = new User({ name: name, email: email, type: type, password: hashpassword });
                    user = await user.save();
                    tokenData = { user: user, type: type }
                    const token = jwt.sign(JSON.stringify(tokenData), process.env.JWT_SECRET_KEY);
                    return res.json({ data: { token: token, user: user } });
                }
                else { return res.send(401).send({ data: { msg: 'This Email is Already Registered' } }) }
            } else { return res.status(401).send('no Parameter send in request body'); }
        } catch (error) { return res.status(401).send({ data: { message: error.message } }); }
    }
};