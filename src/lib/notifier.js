'use strict';

const Severity = require('./severity');
const Formatter = require('./formatter');
const { isFunction } = require('./util');

class Notifier {
  constructor(options = {}, name) {
    options = {
      color: false,
      enabled: true,
      level: 'DEBUG',
      ...options
    };
    this.options = options;
    this.name = this.options.name || name || 'notifier';
    this.lineIndex = 0;

    if (typeof (this.options.formatter) === 'string') {
      this.formatter(this.options.formatter);
    } else {
      this.formatter('detailed');
    }
  }

  canOutput(log) {
    if (!log) return false;

    const { level, ignore } = this.options;
    const canLogLevel = level.canLog(log.level);
    const isIgnored = (ignore && typeof ignore === 'function' && ignore(log));

    return canLogLevel && !isIgnored;
  }

  enabled(enabled) {
    this.options.enabled = enabled;
    return this;
  }

  level(level) {
    this.options.level = Severity.registry.get(level);
    return this;
  }

  formatter(formatter) {
    this.options.formatter = Formatter.registry.get(formatter);
    return this;
  }

  color(val) {
    this.options.color = val;
    return this;
  }

  lineNumbers(show) {
    this.options.lineNumbers = show;
    return this;
  }

  getLineWithNumber(log) {
    const lineNum = this.lineIndex++;
    return `(${lineNum}) ${log}`;
  }

  notify(log) {
    const { formatter, color, preNotify } = this.options;
    const output = formatter.formatLog(log, { color });

    if (isFunction(preNotify)) preNotify(log);

    this.output(output, log);

    return this;
  }

  /* istanbul ignore next */
  output() {
    return;
  }

  /* istanbul ignore next */
  pipe() {
    console.warn('WARN - Pipe has not been configured in this notifier');
  }
}

module.exports = Notifier;