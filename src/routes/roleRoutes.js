const router = require('express').Router();
const roleController = require('../controllers/roleController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/', [verifyToken, verifyAdmin], roleController.createRole);
router.get('/:userId', roleController.getUserRole);
router.post('/:userId', [verifyAdmin], roleController.setUserRole);
router.delete('/:userId', [verifyAdmin], roleController.deleteUserRole);

module.exports = router;
