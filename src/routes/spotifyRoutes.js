const router = require('express').Router();
const retrieveAccessToken = require('../utils/spotify');

router.get('/refreshToken', (_, res) => {
  if (!retrieveAccessToken()) return res.status(400).send({ message: 'Failed' });
  return res.status(200).send({ message: 'Success' });
});

module.exports = router;
