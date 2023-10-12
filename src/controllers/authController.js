const { JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const { findUser, removeCookie } = require('../utils/user');
const { User, Track, Like } = require('../../db');
const { TempPassword } = require('../../db/TempPassword');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const authController = {
  register: async (req, res) => {
    if (req.body.password.length < 6) {
      return res.status(400).send({ message: 'Contraseña demasiado corta' });
    }

    try {
      const user = await User.scope('signin').findOne({
        where: {
          email: req.body.email,
        },
      });

      if (user) {
        return res.status(400).send({ message: 'Correo ya existe' });
      }

      await User.create({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8),
      });

      res.send({ message: 'Success' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to register' });
    }

    return res.status(200);
  },

  signin: async (req, res) => {
    try {
      const user = await User.scope('signin').findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        return res.status(400).send({ message: 'Correo o contraseña invalidos' });
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(400).send({
          message: 'Correo o contraseña invalidos',
        });
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: 345600, // 4 days
      });

      res.cookie('token', token);

      res.send({
        id: user.id,
        email: user.email,
        name: user.name,
        mobile: user.mobile,
        token,
      });
    } catch (error) {
      global.logger.error(error.message);
      return res.status(500).send({ message: 'Failed to signin' });
    }

    return res.status(200);
  },

  forgot: async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.params.email } });
      if (!user) return res.status(400).send({ message: 'User not exist' });

      const userTempPassword = await TempPassword.create({
        password: Math.random().toString(36).slice(-8),
      });

      await user.setTempPassword(userTempPassword);

      const emailText = `Abre el siguiente enlace para cambiar la contraseña:\n\n${process.env.CLIENT_NEW_PASSWORD_URL}/?email=${user.email}&code=${userTempPassword.password}`;
      await transporter.sendMail({
        from: '"Lorena y Elias" <admin@lorenayelias.com>', // sender address
        to: user.email,
        subject: 'Código recuperacion contraseña de Lorena y Elias lista de reproducción',
        text: emailText,
      });

      res.send({ message: 'Success' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to forgot the user' });
    }

    return res.status(200);
  },

  newPassword: async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) return res.status(400).send({ message: 'User not exist' });

      const userTempPassword = await TempPassword.findOne({
        where: { userId: user.id, password: req.body.tempPassword },
      });
      if (!userTempPassword) return res.status(400).send({ message: 'Correo o contraseña temporal invalida' });

      await user.set('password', bcrypt.hashSync(req.body.newPassword, 8));
      await user.save();
      await userTempPassword.destroy();

      res.send({ message: 'Success' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to forgot the user' });
    }

    return res.status(200);
  },
  
  edit: async (req, res) => {
    try {
      const user = await findUser(req.user.id);
      if (!user) return res.status(400).send({ message: 'User not exist' });

      const userWithNewName = await User.findOne({ where: { name: req.body.newName } });
      if (userWithNewName) return res.status(400).send({ message: 'Nombre ya en uso' });

      await user.set('name', req.body.newName);
      await user.save();

      res.send({ message: 'Success' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to forgot the user' });
    }

    return res.status(200);
  },

  signout: async (req, res) => {
    try {
      if (!removeCookie(req, res)) {
        return res.status(400).send('Token missing');
      }

      res.send({ message: 'Success' });
    } catch (err) {
      global.logger.error(err);
      return res.status(500).send('Failed to signout');
    }

    return res.status(200);
  },

  delete: async (req, res) => {
    try {
      const user = await findUser(req.user.id);
      if (!user) return res.status(404).send({ message: 'User not exist' });

      const userTracks = await Track.findAll({ where: { userId: user.id } });
      await Promise.all(
        await userTracks.map(async (track) => {
          await Promise.all(
            (
              await Like.findAll({ where: { trackId: track.id } })
            ).map(async (element) => {
              element.destroy();
            }),
          );

          await track.destroy();
        }),
      );

      user.destroy();

      removeCookie(req, res);

      res.send({ message: 'User deleted' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to delete the user' });
    }

    return res.status(200);
  },
};

module.exports = authController;
