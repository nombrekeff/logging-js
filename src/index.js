const LogginJS = require('./lib/index');

const baseNotifiers = require('./plugins/base-notifiers');
const baseLoggers = require('./plugins/base-loggers');
const baseSeverities = require('./plugins/base-severities');
const baseFormatters = require('./plugins/base-formatters');

LogginJS.use(baseFormatters);
LogginJS.use(baseSeverities);
LogginJS.use(baseNotifiers);
LogginJS.use(baseLoggers);

module.exports = Object.assign(LogginJS.logger('default'), LogginJS);