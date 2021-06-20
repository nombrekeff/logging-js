'use strict';

const Severity = require('./severity');
const Notifier = require('./notifier');
const Log = require('./log');
const { getOsUsername, getFileBasename, isFunction } = require('./util');

class Logger {
  constructor(options = {}) {
    this.options = {
      user: getOsUsername(),
      channel: getFileBasename(),
      color: false,
      ignore: null,
      preNotify: null,
      level: 'default',
      formatter: 'default',
      enabled: true,
      ...options,
    };

    if (options.notifiers && options.notifiers.length > 0) {
      this.setNotifiers(options.notifiers);
    }
    else {
      this.setNotifiers([Notifier.registry.get('default')]);
    }

    this.level(this.options.level);
    this.user(this.options.user);
    this.channel(this.options.channel);
    this.enabled(this.options.enabled);
    this.color(this.options.color);
    this.formatter(this.options.formatter);
    this.lineNumbers(this.options.lineNumbers);
  }

  clone(options = {}) {
    return new Logger({ ...this.options, ...options });
  }

  fork(options = {}) {
    return this.clone(options);
  }

  // Notifier stuff
  notifier(...notifiers) {
    this._notifiers = [
      ...this._notifiers,
      ...notifiers
    ];
    return this;
  }

  setNotifiers(notifiers) {
    this._notifiers = notifiers;
    return this;
  }

  hasNotifier(name) {
    return this._notifiers.some(notif =>
      notif.name === name);
  }

  getNotifier(name) {
    if (this.hasNotifier(name)) {
      return this._notifiers.filter(notif =>
        notif.name === name).pop();
    }

    return null;
  }

  log(message, data, options = {}) {
    const opts = {
      level: options.level || this.options.level,
      channel: options.channel || this.options.channel,
      user: options.user || this.options.user,
      time: options.time || Date.now(),
      data,
      message,
    };

    if (!this.options.enabled) return;

    let log = message;
    if (!(message instanceof Log)) {
      log = Log.fromObject(opts);
    }

    this._notifiers
      .forEach(notifier => {
        if (!notifier.canOutput(log)) return;
        if (!notifier.options.enabled) return;

        if (isFunction(this.options.preNotify)) {
          this.options.preNotify(log, notifier);
        }

        // Ignore done after 'preNotify', in case someone wants to modify log or notifier in 'preNotify'
        if (
          isFunction(this.options.ignore) &&
          this.options.ignore(log, notifier)
        ) return;

        notifier.notify(log);
      });

    return this;
  }

  // Options
  channel(channel) {
    this.options.channel = channel;
    return this;
  }

  enabled(enabled) {
    this.options.enabled = enabled;
    return this;
  }

  user(user) {
    this.options.user = user;
    return this;
  }

  level(level) {
    this.options.level = Severity.registry.get(level);

    this._notifiers.forEach(notif => notif.level(this.options.level));

    return this;
  }

  formatter(formatter) {
    this.options.formatter = formatter;
    this._notifiers.forEach(notif =>
      notif.formatter(this.options.formatter));

    return this;
  }

  lineNumbers(show) {
    this._notifiers.forEach(notif =>
      notif.lineNumbers(show));

    return this;
  }

  strict(strict = true) {
    if (this.options.level) {
      this.options.level.strict = strict;
    }

    return this;
  }

  color(color = true) {
    this.options.color = color;
    this._notifiers.forEach(notif =>
      notif.color(this.options.color));

    return this;
  }

  lineNumbers(show) {
    this.options.lineNumbers = show;
    this._notifiers.forEach(notif =>
      notif.lineNumbers(this.options.lineNumbers));

    return this;
  }

  canLog(severity) {
    return this.options.level.canLog(severity);
  }
}

module.exports = Logger;