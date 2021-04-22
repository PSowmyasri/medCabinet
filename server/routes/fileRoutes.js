const express = require('express');
const {auth} = require('../middleware/auth')
const router = express.Router();
const {addFile, getFiles, addFolder} = require('../controller/fileController');
router.post('/newFile/:id', auth, addFile);
router.get('/getallfiles/:addedby', auth, getFiles);
router.post('/newFolder', auth, addFolder);
module.exports = router;