

// A basic example on how Loggin'JS is used.

// Require the logging library
const logging = require('loggin-js'); // Should be logging-js

// Shortcut for the severity constants
const { Severity } = logging;

// Get a logger with DEBUG severity. 
// Severity DEBUG will output any severity.
const logger = logging.getLogger({
  level: Severity.DEBUG,
  color: true
});

// Does the same as passing into settings
logger.setLevel(Severity.DEBUG);
logger.setColor(true);


// Available predefined log levels
logger
  .info('info', { user: 'pedro', id: 10 })
  .error('error')
  .warning('warning')
  .alert('alert')
  .emergency('emergency')
  .critical('critical')
  .debug('debug')
  .notice(['notice', 'notice']);


// If enabled set to false logs will not be output
logger.setEnabled(false);