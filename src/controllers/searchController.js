const { Track, User, Like } = require('../../db');
const retrieveAccessToken = require('../utils/spotify');

const searchController = {
  search: async (req, res) => {
    try {
      const { query } = req.params;
      let tracks = await global.spotifyApi.searchTracks(query);
      if (!tracks) return res.status(500).send({ message: 'spotifyApi failed' });

      tracks = await Promise.all(
        tracks.body.tracks.items.map(async (track) => {
          let addedBy = '';
          let likes = [];

          const trackExist = await Track.findOne({ where: { spotifyTrackId: track.id } });
          if (trackExist) {
            const user = await User.findByPk(trackExist.userId);
            addedBy = user.name;

            const tracksLikes = await Like.findAll({ where: { trackId: trackExist.id } });
            likes = await Promise.all(
              await tracksLikes.map(async (element) => (await User.findByPk(element.userId)).name),
            );
          }

          return {
            id: track.id,
            uri: track.uri,
            name: track.name,
            album: track.album.name,
            artist: track.artists[0].name,
            addedBy,
            likes,
          };
        }),
      );

      res.status(200).send({ tracks });
    } catch (error) {
      retrieveAccessToken();
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to retrieve tracks' });
    }

    return res;
  },
};

module.exports = searchController;
