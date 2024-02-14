const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema'); 

exports.userLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    if (!user) {
        return res.status(401).json({ error: 'User does not exist.' });
    }
    if (user.isAdmin) {
        return res.status(401).json({ error: 'Admin cannot log in here.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    res.json({ token });
};

//not include admin!
exports.getUsersForVoting = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the users.' });
    }
};