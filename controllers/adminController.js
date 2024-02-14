const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema'); 

//Admin SignUp
exports.adminSignup = async (req, res) => {
    try {
      const existingAdmin = await User.findOne({ isAdmin: true });
      if (existingAdmin) {
        return res.status(400).send({ error: 'An admin already exists' });
      }
      const admin = new User({
        username: req.body.username,
        password: req.body.password,
        image: req.body.image,
        isAdmin: true
      });
      await admin.save();
      res.status(201).send({ message: 'Admin created' });
    } catch (error) {
      res.status(500).send({ error: 'Error creating admin' });
    }
};

//Admin Login
exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    if (!user.isAdmin) {
        return res.status(401).json({ error: 'Admin user is not created.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};

//Admin Reset Password
exports.adminResetPassword = async (req, res) => {
    try {
        const { username, newPassword } = req.body;
        if (!username || !newPassword) {
            return res.status(400).json({ error: 'Username and newPassword are required.' });
        }
        const user = await User.findOne({ username, isAdmin: true });
        if (!user) {
            return res.status(404).json({ error: 'Admin not found.' });
        }
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password reset successfully by admin.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while resetting the password.' });
    }
};

//Get All Users
//try catch.
exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find({ isAdmin: false }).populate('votes');
        if (!users) {
            return res.status(404).json({ error: 'No users found.' });
        }
        res.json(users);
    }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the user.' });
};
}

// Get User by Id (not for Admin)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('votes');
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        if (user.isAdmin) {
            return res.status(403).json({ error: 'Cannot get user details for an admin.' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while getting the user.' });
    }
};

//Add User by Admin
exports.addUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists.' });
        }

        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
};

//Delete User by Admin
exports.deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
};

//Reset User Password
exports.resetUserPassword = async (req, res) => {
    try {
        const { username, newPassword } = req.body;
        if (!username || !newPassword) {
            return res.status(400).json({ error: 'Username and newPassword are required.' });
        }
        if (req.user.username !== username) {
            return res.status(403).json({ error: 'You can only reset your own password.' });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password reset successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while resetting the password.' });
    }
};

//Update User Info by Admin
exports.updateUserInfo = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['image'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates.' });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    updates.forEach((update) => user[update] = req.body[update]);
    await user.save();
    res.json(user);
};
