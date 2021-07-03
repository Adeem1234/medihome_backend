const User = require('../model/UsersModel');

module.exports = {
    blockedUserCheck: async (req, res, next) => {
        const id = req.body.id
        const otheruser = await User.findOne({ _id: id, bannedUsers: req.user._id })
        const userBannedList = req.user.bannedUsers.includes(id)
        let message;
        if (otheruser || userBannedList) {
            message = 'Either You have blocked this user or This User has Blocked You';
            return res.status(400).send({ data: { message } });
        } else {
            next();
        }
    }
}