/**
* @jest-environment node
*/

let loggin = require('../src/index');

describe('loggin should be defined', () => {
  it(`loggin should`, () => {
    expect(loggin).toBeDefined();
  });
});

describe('loggin.formatter', () => {
  it(`should be a function`, () => {
    expect(typeof loggin.formatter).toEqual('function');
  });

  it(`should return a formatter`, () => {
    expect(loggin.formatter()).toBeInstanceOf(loggin.Formatter);
  });

  it(`should return a formatter for string instance`, () => {
    expect(loggin.formatter('default')).toBeInstanceOf(loggin.Formatter);
  });
});

describe('loggin.notifier', () => {
  it(`should be a function`, () => {
    expect(typeof loggin.notifier).toEqual('function');
  });

  it(`should return a notifier`, () => {
    expect(loggin.notifier()).toBeInstanceOf(loggin.Notifier);
  });

  it(`should return a notifier for string instance`, () => {
    expect(loggin.notifier('console')).toBeInstanceOf(loggin.Notifier);
  });
});

describe('loggin.severity', () => {
  it(`should be a function`, () => {
    expect(typeof loggin.severity).toEqual('function');
  });

  it(`should return a severity instance`, () => {
    expect(loggin.severity('DEBUG')).toBeInstanceOf(loggin.Severity);
  });
});

describe('loggin.logger', () => {
  it(`should be a function`, () => {
    expect(typeof loggin.logger).toEqual('function');
  });

  it(`should return a logger instance with no arguments`, () => {
    expect(loggin.logger()).toBeInstanceOf(loggin.Logger);
  });
  it(`should return a logger instance with premade argument`, () => {
    expect(loggin.logger('default')).toBeInstanceOf(loggin.Logger);
  });
  it(`should return a logger instance with options`, () => {
    expect(loggin.logger({
      level: loggin.severity('DEBUG')
    })).toBeInstanceOf(loggin.Logger);
  });
});

describe('loggin should be instance of Logger', () => {
  it(`instance`, () => {
    expect(loggin).toBeInstanceOf(loggin.Logger);
  });
});

describe('loggin.use', () => {
  it(`fails if no function passed in`, () => {
    expect(() => loggin.use()).toThrow();
  });
});