const router = require('express').Router();
const trackController = require('../controllers/likeController');
const verifyToken = require('../middleware/verifyToken');

router.get('/:spotifyTrackId', trackController.getTrackLikes);
router.post('/', verifyToken, trackController.likeTrack);

module.exports = router;
