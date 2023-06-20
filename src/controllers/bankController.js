const { Bank, Key } = require('../../db');

const bankController = {
  getAccounts: async (req, res) => {
    try {
      const { key } = req.params;

      const keyFound = await Key.findOne({ where: { key } });

      if (!keyFound) {
        return res.status(404).send({ message: 'Wrong key' });
      }

      const accounts = await Bank.findAll();

      return res.status(200).send({ accounts });
    } catch (error) {
      global.logger.error(error.message);
      res.status(500).send({ message: 'Failed to retrieve bank data' });
    }
  },
};

module.exports = bankController;
