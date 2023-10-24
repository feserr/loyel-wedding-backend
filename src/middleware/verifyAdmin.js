const { findUser } = require('../utils/user');
const db = require('../../db/db/models');

const { RoleType, Role } = db;

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await findUser(req.user.id);
    if (!user) return res.status(400).send({ message: 'User not exist' });

    const userRole = await Role.findOne({ where: { userId: user.id } });
    if (!userRole) return res.status(400).send({ message: 'User do not have a role' });

    const userRoleType = await RoleType.findByPk(userRole.roleTypeId);
    if (!userRoleType || !userRoleType.isAdmin) return res.status(400).send({ message: 'User is not an admin' });
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate admin',
    });
  }

  return next();
};

module.exports = verifyAdmin;
