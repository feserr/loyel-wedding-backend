const app = require('.');

const { PORT = 3005 } = process.env;

app.listen(PORT, () => {
  global.logger.info(`loyel-wedding are ready at http://localhost:${PORT}`);
});
