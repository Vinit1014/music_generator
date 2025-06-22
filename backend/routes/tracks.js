const express = require('express');
const router = express.Router();
const controller = require('../controllers/trackController');

router.get('/moods', controller.getMoods);
router.get('/genres', controller.getGenres);
router.get('/tracks', controller.getFilteredTracks);

module.exports = router;
