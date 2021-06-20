const { logger, Formatter } = require('../../src');

// You can add a new formatter by registering it as follows:
Formatter.registry.register(
  'CUSTOM',
  '{time} - {user} | {channel} - {level} - {message} {data}', {
  props: {
    time: {
      transformers: ['date', 'lbl_cyan']
    },
    user: {
      transformers: ['cl_gray']
    },
    level: {
      transformers: ['string']
    },
    data: {
      transformers: ['json', 'cl_gray']
    },
    channel: {},
    message: {},
  }
});

const myLogger = logger({
  formatter: 'custom'
});

// Available predefined log levels
myLogger.info('info', {
  user: 'pedro',
  id: 10
});
myLogger.error('error');
myLogger.info('info', { data: 'Hi' });
myLogger.alert('alert');
myLogger.emergency('emergency');
