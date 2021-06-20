'use strict';

const Logger = require('./logger');
const Notifier = require('./notifier');
const Formatter = require('./formatter');
const Severity = require('./severity');
const Log = require('./log');

const FormatterRegistry = require('./registry/formatter-registry');
const SeverityRegistry = require('./registry/severity-registry');
const NotifierRegistry = require('./registry/notifier-registry');
const LoggerRegistry = require('./registry/logger-registry');

const formatterRegistry = new FormatterRegistry();
const severityRegistry = new SeverityRegistry();
const notifierRegistry = new NotifierRegistry();
const loggerRegistry = new LoggerRegistry(notifierRegistry);


function logger(opts = 'default', args = {}) {
  return Logger.registry.get(opts, args);
}

function notifier(opts = 'default', args = {}) {
  return Notifier.registry.get(opts, args);
}

function formatter(template = 'default') {
  return Formatter.registry.get(template);
}

function severity(level, { strict = false } = {}) {
  const severity = Severity.registry.get(level);
  severity.strict = strict;

  return severity;
}

function use(plugin) {
  if (typeof plugin !== 'function') {
    throw new Error('"plugin" must be a function');
  }

  // "this" will resolve to LogginJS
  plugin(this);
}

// Inject Registries
Formatter.registry = formatterRegistry;
Severity.registry = severityRegistry;
Notifier.registry = notifierRegistry;
Logger.registry = loggerRegistry;

const LogginJS = {
  Severity,
  Log,
  Notifier,
  Formatter,
  Logger,

  logger,
  notifier,
  formatter,
  severity,
  use,

  loggerRegistry,
  severityRegistry,
  notifierRegistry,
  formatterRegistry,
};

module.exports = LogginJS;