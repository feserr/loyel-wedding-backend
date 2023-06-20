const { sequelize } = require('./db');
const { Bank, Key } = require('.');
const { banks, keys } = require('./seedData');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // recreate db

    await Promise.all(banks.map(async (bank) => {
      await Bank.create({
        holder: bank.holder,
        account: bank.account,
        country: bank.country,
      });
    }));

    await Promise.all(keys.map(async (key) => {
      await Key.create({
        key: key.key,
      });
    }));
  } catch (error) {
    global.logger.error(error);
  }
};

module.exports = seed;
