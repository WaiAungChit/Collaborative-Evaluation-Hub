const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const adminAuth = async (req, res, next) => {
    try {
        // Check request for token
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Authentication required.' });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed.' });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ error: 'Admin access required.' });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token.' });
        }
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = adminAuth;