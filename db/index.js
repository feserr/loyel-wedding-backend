require('../src/utils/logger');

const { Bank } = require('./Bank');
const { Key } = require('./Key');
const { Track } = require('./Track');
const { User } = require('./User');
const { Like } = require('./Like');

User.hasMany(Track, { foreignKey: 'userId' });
Track.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

User.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

Track.hasMany(Like, { foreignKey: 'trackId' });
Like.belongsTo(Track, { foreignKey: 'trackId', onDelete: 'CASCADE' });

module.exports = {
  Bank,
  Key,
  Track,
  User,
  Like,
};
