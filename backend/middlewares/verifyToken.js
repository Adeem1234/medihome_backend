const jwt = require('jsonwebtoken');
const User = require('../model/User');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = async (req, res, next) => {
    try {
        let authHeader = req.headers.authorization;
        if (!authHeader) { return res.status(403).json({ message: 'Forbidden' }); }
        let token = authHeader.split(' ')[1];
        let user = await jwt.verify(token, SECRET_KEY);
        const userCheck = await User.findById(user._id);
        if (userCheck) {
            req.user = userCheck;
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = verifyToken;