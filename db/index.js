require('../src/utils/logger');

const { Bank } = require('./Bank');
const { Key } = require('./Key');
const { User } = require('./User');
const { TempPassword } = require('./TempPassword');
const { Track } = require('./Track');
const { Like } = require('./Like');

User.hasOne(TempPassword, { foreignKey: 'userId' });
TempPassword.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

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
