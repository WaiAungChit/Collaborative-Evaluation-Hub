const express = require('express');
const userAuth = require('../middlewares/auth');
const userController = require('../controllers/userController');
const voteController = require('../controllers/voteController');

const router = express.Router();

router.post('/login',userController.userLogin);
router.post('/vote', userAuth, voteController.submitVote);
router.get('/users',userAuth, userController.getUsersForVoting)
module.exports = router;