const router = require('express').Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, userController.info);

module.exports = router;
