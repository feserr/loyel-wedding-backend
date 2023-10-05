const { User, Track, Like } = require('../../db');

const userController = {
  register: async (req, res) => {
    try {
      const { spotifyUserId } = req.params;
      const { spotifyDisplayName } = req.body;
      await User.findOne({ where: { spotifyUserId } }).then((obj) => {
        if (obj) return obj.update({ spotifyUserId, spotifyDisplayName });
        return User.create({ spotifyUserId, spotifyDisplayName });
      });
      res.send({ message: 'Success' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed register the user' });
    }

    return res.status(200);
  },

  delete: async (req, res) => {
    try {
      const { spotifyUserId } = req.params;
      const user = await User.findOne({ where: { spotifyUserId } });
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

      res.send({ message: 'User deleted' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to delete the user' });
    }

    return res.status(200);
  },

  info: async (req, res) => {
    try {
      const { spotifyUserId } = req.params;
      const user = await User.findOne({ where: { spotifyUserId } });
      if (!user) return res.status(404).send({ message: 'User not exist' });

      let tracks = await Track.findAll({ where: { userId: user.id } });
      tracks = await Promise.all(
        tracks.map(async (track) => {
          const tracksLikes = await Like.findAll({ where: { trackId: track.id } });
          const userLikes = await Promise.all(
            await tracksLikes.map(
              async (element) => (await User.findByPk(element.userId)).spotifyUserId,
            ),
          );

          return {
            id: track.spotifyTrackId,
            uri: track.uri,
            name: track.name,
            album: track.album,
            artist: track.artist,
            spotifyTrackId: track.spotifyTrackId,
            spotifyUserId: user.spotifyUserId,
            spotifyDisplayName: user.spotifyDisplayName,
            likes: userLikes,
          };
        }),
      );

      res.send({ tracks });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to delete the user' });
    }

    return res.status(200);
  },
};

module.exports = userController;
