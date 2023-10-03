const router = require('express').Router();
const trackController = require('../controllers/trackController');

router.get('/', trackController.getTracks);
router.get('/:spotifyTrackId', trackController.getTrackInfo);
router.post('/:spotifyTrackId', trackController.addTrack);
router.delete('/:spotifyTrackId&:spotifyUserId', trackController.removeTrack);

module.exports = router;
