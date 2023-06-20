const Logger = require('js-logger');

Logger.useDefaults({
  defaultLevel: Logger.DEBUG,
  formatter(messages, context) {
    messages.unshift(`[${context.name}] (${context.level.name})`);
  },
});

const logger = Logger.get('loyel-wedding');

global.logger = logger;
