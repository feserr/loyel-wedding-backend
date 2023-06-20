const { sequelize } = require('./db');
const seed = require('./seedFn');

seed()
  .then(() => {
    global.logger.info('Seeding success.');
  })
  .catch((err) => {
    global.logger.error(err);
  })
  .finally(() => {
    sequelize.close();
  });
