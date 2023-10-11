const { Track, User, Like } = require('../../db');

const { findUser } = require('../utils/user');

const { MAX_SONGS = 5 } = process.env;

const trackController = {
  getTracks: async (_, res) => {
    try {
      let tracks = await Track.findAll();
      tracks = await Promise.all(
        tracks.map(async (track) => {
          const user = await User.findByPk(track.userId);
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
            addedBy: user.name,
            likes: userLikes,
          };
        }),
      );

      res.status(200).send({ tracks });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to retrieve tracks' });
    }

    return res;
  },

  getTrackInfo: async (req, res) => {
    try {
      const { spotifyTrackId } = req.params;
      const trackExist = await Track.findOne({ where: { spotifyTrackId } });

      if (!trackExist) {
        return res.status(200).send({
          trackInfo: {
            addedBy: '',
            likes: [],
          },
        });
      }

      const user = await User.findByPk(trackExist.userId);
      const tracksLikes = await Like.findAll({ where: { trackId: trackExist.id } });
      const userLikes = await Promise.all(
        await tracksLikes.map(
          async (element) => (await User.findByPk(element.userId)).name,
        ),
      );

      res.send({
        trackInfo: {
          addedBy: user.name,
          likes: userLikes,
        },
      });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to remove track' });
    }

    return res.status(200);
  },

  addTrack: async (req, res) => {
    try {
      const { spotifyTrackId } = req.params;
      const trackExist = await Track.findOne({ where: { spotifyTrackId } });
      if (trackExist) return res.status(400).send({ message: 'Track already at track' });

      const user = await findUser(req.user.id);
      if (!user) return res.status(400).send({ message: 'User not exist' });

      const userTracks = await Track.findAll({ where: { userId: user.id } });
      if (userTracks && userTracks.length >= MAX_SONGS) return res.status(400).send({ message: 'User reached cuota' });

      const newTrack = await Track.create({
        uri: req.body.uri,
        name: req.body.name,
        album: req.body.album,
        artist: req.body.artist,
        spotifyTrackId,
      });
      await user.addTrack(newTrack);

      const like = await Like.create();
      user.addLike(like);
      newTrack.addLike(like);

      res.status(200).send({ message: 'Track added' });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to add track' });
    }

    return res;
  },

  removeTrack: async (req, res) => {
    try {
      const user = await findUser(req.user.id);
      if (!user) return res.status(400).send({ message: 'User not exist' });

      const { spotifyTrackId } = req.params;
      const trackExist = await Track.findOne({ where: { spotifyTrackId } });

      if (trackExist && trackExist.userId === user.id) {
        Promise.all(
          (await Like.findAll({ where: { trackId: trackExist.id } })).map(async (element) => {
            element.destroy();
          }),
        );

        await trackExist.destroy();

        res.send({ message: 'Track removed' });
      } else {
        res.send({ message: 'Track not exist or added by other use' });
      }
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to remove track' });
    }

    return res.status(200);
  },
};

module.exports = trackController;
