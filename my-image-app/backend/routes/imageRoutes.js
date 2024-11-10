const express = require('express');
const { uploadImage, getUserImages } = require('../controllers/imageController');
const router = express.Router();

router.post('/upload', uploadImage);
router.get('/user/:userId', getUserImages);

module.exports = router;
    