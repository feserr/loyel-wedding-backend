const db = require('../../db/db/models');

const { Bank, Key } = db;

const bankController = {
  getAccounts: async (req, res) => {
    try {
      const { key } = req.params;

      const keyFound = await Key.findOne({ where: { key } });

      if (!keyFound) {
        return res.status(404).send({ message: 'Wrong key' });
      }

      const accounts = await Bank.findAll();

      res.send({ accounts });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to retrieve bank data' });
    }

    return res.status(200);
  },
};

module.exports = bankController;
