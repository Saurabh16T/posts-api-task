const express = require('express');
const router = express.Router();
const postRoutes = require('./posts');
const uploadRoutes = require('./upload');

router.use('/posts',postRoutes)
router.use('/upload',uploadRoutes)

module.exports = router;
