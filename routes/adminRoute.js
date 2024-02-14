const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

router.post('/login', adminController.adminLogin);
router.post('/signup', adminController.adminSignup);
router.post('/admin-reset', adminAuth, adminController.adminResetPassword);
router.get('/users', adminAuth, adminController.getAllUsers);
router.get('/user/:id', adminAuth, adminController.getUserById);
router.post('/user-signup', adminAuth, adminController.addUser);
router.delete('/user-delete/:id', adminAuth, adminController.deleteUser);
router.post('/user-reset/', adminAuth, adminController.resetUserPassword);
router.put('/user-update/:id', adminAuth, adminController.updateUserInfo);


module.exports = router;
