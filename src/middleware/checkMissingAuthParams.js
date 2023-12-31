const checkMissingAuthParams = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: 'Missing email or password.',
    });
  }

  return next();
};

module.exports = { checkMissingAuthParams };
