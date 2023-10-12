const { User, Track, Like } = require('../../db');
const { findUser } = require('../utils/user');

const userController = {
  info: async (req, res) => {
    try {
      const user = await findUser(req.user.id);
      if (!user) return res.status(400).send({ message: 'User not exist' });

      let tracks = await Track.findAll({ where: { userId: user.id } });
      tracks = await Promise.all(
        tracks.map(async (track) => {
          const tracksLikes = await Like.findAll({ where: { trackId: track.id } });
          const userLikes = await Promise.all(
            await tracksLikes.map(
              async (element) => (await User.findByPk(element.userId)).name,
            ),
          );

          return {
            id: track.spotifyTrackId,
            uri: track.uri,
            name: track.name,
            album: track.album,
            artist: track.artist,
            spotifyTrackId: track.spotifyTrackId,
            userName: user.name,
            likes: userLikes,
          };
        }),
      );

      res.send({ tracks });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to get logged user info' });
    }

    return res.status(200);
  },

  getInfo: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(400).send({ message: 'User not exist' });

      res.send({ name: user.name });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to get the user info' });
    }

    return res.status(200);
  },
};

module.exports = userController;
