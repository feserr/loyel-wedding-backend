const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/:spotifyUserId', userController.info);
router.put('/:spotifyUserId', userController.register);
router.delete('/:spotifyUserId', userController.delete);

module.exports = router;
