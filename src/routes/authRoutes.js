const router = require('express').Router();

const authController = require('../controllers/authController');
const { checkDuplicate } = require('../middleware/checkDuplicate');
const { checkMissingAuthParams } = require('../middleware/checkMissingAuthParams');
const verifyToken = require('../middleware/verifyToken');

router.post('/signin', checkMissingAuthParams, authController.signin);
router.post('/register', [checkMissingAuthParams, checkDuplicate], authController.register);
router.get('/forgot/:email', authController.forgot);
router.post('/newPassword', authController.newPassword);
router.put('/', verifyToken, authController.edit);
router.post('/signout', verifyToken, authController.signout);
router.delete('/', verifyToken, authController.delete);

module.exports = router;
