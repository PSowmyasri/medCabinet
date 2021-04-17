const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();
const { addUser, loginUser } = require('../controller/userController');
const { getUser } = require('../controller/homeController')
router.post('/signup', addUser);
router.post('/login', loginUser);
router.get('/home', auth, getUser);

module.exports = router;