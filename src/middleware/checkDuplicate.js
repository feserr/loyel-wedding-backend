const { Op } = require('sequelize');
const db = require('../../db/db/models');

const { User } = db;

const checkDuplicate = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { name: req.body.name }],
      },
    });

    if (user) {
      return res.status(400).send({
        message: 'Nombre o correo ya existen',
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate user',
    });
  }

  return next();
};

module.exports = { checkDuplicate };
