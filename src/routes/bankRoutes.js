const router = require('express').Router();
const bankController = require('../controllers/bankController');

router.get('/:key', bankController.getAccounts);

module.exports = router;
