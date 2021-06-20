'use strict';
const Severity = require('./severity');
const Formatter = require('./formatter');

class Log {
  constructor(message, data, level, channel = '', time = new Date(), user) {
    if (!(level instanceof Severity)) {
      throw new Error(`'level' must be an instance of Severity`);
    }

    this.message = message;
    this.data = data;
    this.level = level;
    this.channel = channel;
    this.time = time;
    this.user = user;
    this.levelStr = level.toString();
  }

  /**
   * Returns formatted log
   * @param {string} formatter
   */
  format(formatter, { color = false } = {}) {
    const {
      message,
      data,
      level,
      channel,
      levelStr,
      time,
      user,
    } = this;

    return Formatter.format({
      message,
      data,
      level,
      channel,
      levelStr,
      time,
      user,
    }, formatter, color);
  }

  static fromObject(obj) {
    return new Log(obj.message, obj.data, obj.level, obj.channel, obj.time, obj.user);
  }
}

module.exports = Log;