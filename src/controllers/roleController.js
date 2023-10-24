const db = require('../../db/db/models');

const { User, RoleType, Role } = db;

const roleController = {
  createRole: async (req, res) => {
    try {
      await RoleType.create({
        type: req.body.type,
        color: req.body.color,
        isAdmin: req.body.isAdmin,
        maxSongs: req.body.maxSongs,
      });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to get user role' });
    }

    return res.status(200);
  },

  getUserRole: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.userId);
      if (!user) return res.status(400).send({ message: 'User not exist' });

      const role = await Role.findOne({ where: { userId: user.id } });
      if (!role) return res.status(200).send({ type: '', color: 'white' });

      const roleType = await RoleType.findByPk(role.roleTypeId);
      if (!roleType) return res.status(200).send({ type: '', color: 'white' });

      res.send({
        type: roleType.type,
        color: roleType.color,
        isAdmin: roleType.isAdmin,
        maxSongs: roleType.maxSongs,
      });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to get user role' });
    }

    return res.status(200);
  },

  setUserRole: async (req, res) => {
    try {
      const roleType = await RoleType.findOne({ where: { type: req.body.type } });
      if (!roleType) return res.status(400).send({ message: 'Wront role type' });

      const user = await User.findByPk(req.params.userId);
      if (!user) return res.status(400).send({ message: 'User not exist' });

      const newRole = await Role.create();
      await roleType.addRole(newRole);
      await user.setRole(newRole);

      res.send({ message: 'Success' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to get the user info' });
    }

    return res.status(200);
  },

  deleteUserRole: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.userId);
      if (!user) return res.status(400).send({ message: 'User not exist' });

      const userRole = await Role.findOne({ where: { userId: user.id } });
      if (!userRole) res.send(304).send({ message: 'User do not have role' });

      await userRole.destroy();

      res.send({ message: 'Success' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to get the user info' });
    }

    return res.status(200);
  },
};

module.exports = roleController;
