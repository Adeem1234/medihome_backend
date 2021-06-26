const User = require('../../model/User');

module.exports = {
    updateEmoji: async (req, res, next) => {
        const { emoji } = req.body;
        try {
            if (req.body !== {}) {
                const user = await User.findByIdAndUpdate(req.user._id, { emoji: emoji }, { new: true }).select('-email -password -role');
                return res.status(200).send({ data: { user: user } });
            }
        } catch (err) {
            return res.status(400).send({ data: { message: err } });
        }
    },
    updateColor: async (req, res, next) => {
        const { color } = req.body;
        try {
            const user = await User.findByIdAndUpdate(req.user._id, { color: color }, { new: true }).select('-email -password -role');
            return res.status(200).send({ data: { user: user } });
        } catch (error) {
            return res.status(400).send({ data: { message: error } });
        }
    },
    updateAvatar: async (req, res, next) => {
        const { avatar } = req.body;
        try {
            const user = await User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true }).select('-email -password -role');
            return res.status(200).send({ data: { user: user } });
        } catch (error) {
            return res.status(400).send({ data: { message: error } });
        }
    },
    updateProfile: async (req, res, next) => {
        const { profile_answers, age } = req.body;
        let userName = req.body.userName.toLowerCase();
        try {
            let user = await User.findByIdAndUpdate(req.user._id, { userName: userName, profile_answers: profile_answers, age: age }, { new: true })
                .populate({ path: 'friends', select: 'userName avatar unique_id _id name', model: 'users' }).select('-email -password -role');
            return res.status(200).send({ data: { user } });
        } catch (err) {
            return res.status(400).send({ data: { message: err } });
        }
    },
};