const express = require('express');
const {auth} = require('../middleware/auth')
const router = express.Router();
const {addFile} = require('../controller/fileController');
router.post('/newFile', auth, addFile);
module.exports = router;