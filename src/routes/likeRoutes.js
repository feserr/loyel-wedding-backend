const router = require('express').Router();
const trackController = require('../controllers/likeController');

router.get('/:spotifyTrackId', trackController.getTrackLikes);
router.post('/', trackController.likeTrack);

module.exports = router;
