// routes/newsRoute.js
const express = require('express');
const router = express.Router();
const newsController = require('../Controllers/news.controllers');

router.get('/', newsController.getAllNews);
router.get('/:email', newsController.getNews);
router.post('/', newsController.createNews);
router.put('/:id', newsController.updateNews);
router.delete('/:id', newsController.deleteNews);

module.exports = router;
