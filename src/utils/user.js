const { User } = require('../../db');

const findUser = async (id) => {
  try {
    return await User.findOne({
      where: { id },
    });
  } catch (error) {
    global.logger.error(error.message);
    return new Error(error.message);
  }
};

const removeCookie = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.token) {
    return false;
  }

  res.clearCookie('token');
  return true;
};

module.exports = { findUser, removeCookie };
