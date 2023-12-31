const { findUser } = require('../utils/user');
const db = require('../../db/db/models');

const { User, Track, Like } = db;

const likeController = {
  getTrackLikes: async (req, res) => {
    try {
      const { spotifyTrackId } = req.params;

      const track = await Track.findOne({ where: { spotifyTrackId } });
      if (!track) return res.status(404).send({ message: 'Track not exist' });

      const trackLikes = await Like.findAll({
        where: { trackId: track.id },
      });

      const likesBySpotifyIds = await Promise.all(
        trackLikes.map(async (like) => {
          const user = await User.findByPk(like.userId);
          return user.id;
        }),
      );

      res.send({ likes: likesBySpotifyIds });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to like the track' });
    }

    return res.status(200);
  },

  likeTrack: async (req, res) => {
    try {
      const { spotifyTrackId } = req.body;

      const track = await Track.findOne({ where: { spotifyTrackId } });
      if (!track) return res.status(404).send({ message: 'Track not exist' });

      const user = await findUser(req.user.id);
      if (!user) return res.status(400).send({ message: 'User not exist' });

      const trackLikes = await Like.findOne({
        where: { trackId: track.id, userId: user.id },
      });

      if (trackLikes) {
        await trackLikes.destroy();
        res.send({ message: 'Disliked' });
      } else {
        const like = await Like.create({
          userId: user.id,
          trackId: track.id,
        });
        await user.addLike(like);
        await track.addLike(like);
        res.send({ message: 'Liked' });
      }
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to like the track' });
    }

    return res.status(200);
  },
};

module.exports = likeController;
