// Demo-1
// https://runkit.com/nombrekeff/loggin-js-demo-1

const loggin = require('../../src/index');

// Create a logger with a set of options
// `level`   - Set output level to DEBUG (all logs will output)
// `color`   - Set color for all notifiers
// `channel` - Label to identify this logger instance, defaults to filename if omitted
// ...
// See https://github.com/loggin-js/loggin-js/wiki/type.LoggerOptions#interface
const logger = loggin.logger({
  level: loggin.severity('info'),
  color: false,
  channel: 'demo-1',
  formatter: 'long'
});

// You can change options after creation
// See https://github.com/loggin-js/loggin-js/wiki/Logger#interface
logger.level('debug');
logger.color(true);
logger.user('root');

logger.debug('debug');

// Available predefined log methods
// See https://github.com/loggin-js/loggin-js/wiki/Logger#interface
logger.info('info', {
  user: 'Jeffrey',
  id: 101
});
logger.error('Teaching a snake to kick! :D');
logger.emergency('Lemons');
logger.critical('critical', { error: 'S*** something is bad!' });

// Change user
logger.user('keff');

logger.notice('notice im now an other user');
logger.error('There was an <%rERROR>');

// Change some options for an individual log
logger.info('info', null, { channel: 'demo-2' });

// Disable logger
logger.enabled(false);

// Will no be outputed
logger.error('There was an <%rERROR>');
