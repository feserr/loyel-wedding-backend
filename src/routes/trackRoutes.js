const router = require('express').Router();
const trackController = require('../controllers/trackController');

const verifyToken = require('../middleware/verifyToken');

router.get('/', trackController.getTracks);
router.get('/:spotifyTrackId', trackController.getTrackInfo);
router.post('/:spotifyTrackId', verifyToken, trackController.addTrack);
router.delete('/:spotifyTrackId', verifyToken, trackController.removeTrack);

module.exports = router;
