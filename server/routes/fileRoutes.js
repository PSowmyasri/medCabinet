const express = require('express');
const {auth} = require('../middleware/auth')
const router = express.Router();
const {addFile, getFiles} = require('../controller/fileController');
router.post('/newFile', auth, addFile);
router.get('/getallfiles/:addedby', auth, getFiles)
module.exports = router;