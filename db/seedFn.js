const { sequelize } = require('./db');

const {
  Bank, Key, Track, User, Like,
} = require('.');

const {
  banks, keys, tracks, users, likes,
} = require('./seedData');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // recreate db

    await Promise.all(banks.map(async (bank) => {
      await Bank.create(bank);
    }));

    await Promise.all(keys.map(async (key) => {
      await Key.create(key);
    }));

    const createdUsers = [];
    await Promise.all(users.map(async (user) => {
      createdUsers.push(await User.create(user));
    }));

    const createdTracks = [];
    await Promise.all(tracks.map(async (track) => {
      const createdTrack = await Track.create(track);
      await createdUsers[0].addTrack(createdTrack);
      createdTracks.push(createdTrack);
    }));

    await Promise.all(likes.map(async (like) => {
      const createdLike = await Like.create(like);
      await createdUsers[0].addLike(createdLike);
      await createdTracks[0].addLike(createdLike);
    }));
  } catch (error) {
    global.logger.error(error);
  }
};

module.exports = seed;
