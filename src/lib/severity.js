'use strict';

const EmptyRegistry = require('./registry/empty-registry');

class Severity {
  constructor(level, name) {
    this.level = level;
    this.name = name;
    this.fileLogginLevel = this.level;
    this.strict = false;
  }

  canLog(severity) {
    return (
      this.strict
        ? this.level === severity.level
        : this.level >= severity.level
    );
  }

  toString() {
    return String(this.name).substr(0, 3);
  }

  toInt() {
    return this.level;
  }

  valueOf() {
    return this.toInt();
  }
}

Severity.registry = new EmptyRegistry();

module.exports = Severity;