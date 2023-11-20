const express = require('express');
const router = express.Router();
const featuredMosquesController = require('../controller/showFeaturedMosqueController');

router.get('/featuredMosque', featuredMosquesController.findMosques);

module.exports = router;
