const User = require('../../model/User');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res, next) => {
        try {
            console.log(req.body)
            if (req.body !== {}) {
                const { unique_id, name, avatar, deviceId } = req.body;
                const oldUser = await User.findOne({ unique_id: unique_id, });
                if (!oldUser) {
                    let user = new User({ unique_id: unique_id, name: name, avatar: avatar, deviceId });
                    user = await user.save();
                    tokenData = { _id: user._id, deviceId: deviceId }
                    const token = jwt.sign(JSON.stringify(tokenData), process.env.JWT_SECRET_KEY);
                    return res.json({ data: { token: token, user: user } });
                } else {
                    let user = await User.findByIdAndUpdate(oldUser._id, { avatar: avatar, name: name, deviceId: deviceId }, { new: true }).select('-email -password -role');
                    tokenData = { _id: user._id, deviceId: deviceId }
                    const token = jwt.sign(JSON.stringify(tokenData), process.env.JWT_SECRET_KEY);
                    return res.send({ data: { token: token, user: user } });
                }
            } else {
                return res.status(401).send('no Parameter send in request body');
            }
        } catch (error) {
            return res.status(401).send({ data: { message: error.message } });
        }
    },
    AppleLogin: async (req, res) => {
        try {
            console.log(req.body)
            if (req.body !== {}) {
                const { unique_id, deviceId } = req.body;
                const oldUser = await User.findOne({ unique_id: unique_id, });
                if (!oldUser) {
                    let user = new User({ unique_id: unique_id, deviceId });
                    user = await user.save();
                    tokenData = { _id: user._id, deviceId: deviceId }
                    const token = jwt.sign(JSON.stringify(tokenData), process.env.JWT_SECRET_KEY);
                    return res.json({ data: { token: token, user: user } });
                } else {
                    let user = await User.findByIdAndUpdate(oldUser._id, { deviceId: deviceId }, { new: true }).select('-email -password -role');
                    tokenData = { _id: user._id, deviceId: deviceId }
                    const token = jwt.sign(JSON.stringify(tokenData), process.env.JWT_SECRET_KEY);
                    return res.send({ data: { token: token, user: user } });
                }
            } else {
                return res.status(401).send('no Parameter send in request body');
            }
        } catch (error) {
            return res.status(401).send({ data: { message: error.message } });
        }
    }
};