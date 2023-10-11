const router = require('express').Router();
const searchController = require('../controllers/searchController');

router.get('/:query', searchController.search);

module.exports = router;
