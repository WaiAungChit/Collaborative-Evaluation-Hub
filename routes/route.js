const express = require('express');
const userRoutes = require('./userRoute');
const adminRoutes = require('./adminRoute');

const router = express.Router();

// Default Route
router.get("/", (req, res) => {
    res.send("Backend is running!")
  });

router.use('/user', userRoutes);
router.use('/admin', adminRoutes);

module.exports = router;