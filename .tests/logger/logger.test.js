/**
* @jest-environment node
*/
let loggin = require('../../src/index');

describe('loggin.Logger', () => {
  let logger = loggin.logger('default');
  it(`should be defined`, () => {
    expect(loggin.Logger).toBeDefined();
  });

  it(`construct logger correctly`, () => {
    expect(() => {
      loggin.logger('default');
    }).not.toThrow();
  });

  it(`should have loggin methods`, () => {
    let logger = loggin.logger('default');
    expect(() => {
      [
        'debug', 'info', 'log', 'warning', 'error', 'alert', 'critical',
        'level', 'color', 'enabled', 'user', 'channel', 'formatter',
        'notifier', 'setNotifiers', 'clone', 'fork'
      ].forEach(level => {
        if (typeof logger[level] !== 'function') {
          throw new Error(level + ' is not a method in logger');
        }
      });
    }).not.toThrow();
  });


  it(`.enabled should set correctly`, () => {
    let logger = loggin.logger('default');
    logger.enabled(false);
    expect(logger.options.enabled).toEqual(false);
    logger.enabled(true);
    expect(logger.options.enabled).toEqual(true);
  });

  it(`.user should set correctly`, () => {
    let logger = loggin.logger('default');
    logger.user('test');
    expect(logger.options.user).toEqual('test');
  });

  it(`.channel should set correctly`, () => {
    let logger = loggin.logger('default');
    logger.channel('test');
    expect(logger.options.channel).toEqual('test');
  });

  it(`.color should set correctly`, () => {
    let logger = loggin.logger('default');
    logger.color();
    expect(logger.options.color).toEqual(true);

    logger.color(false);
    expect(logger.options.color).toEqual(false);
  });

  it(`.lineNumbers should set correctly in notifiers`, () => {
    logger.lineNumbers(true);
    expect(() => {
      logger._notifiers.forEach(notif => {
        if (notif.options.lineNumbers !== true) {
          throw new Error('lineNumbers not set correctly on notifier ' + notif.constructor.name);
        }
      });
    }).not.toThrow();
  });

  it(`.level should set correctly on logger`, () => {
    let logger = loggin.logger('default');
    logger.level('DEBUG');
    expect(logger.options.level).toEqual(loggin.severity('DEBUG'));
  });

  it(`.level should set correctly in notifiers`, () => {
    let logger = loggin.logger('default');
    logger.level('DEBUG');
    expect(() => {
      logger._notifiers.forEach(notif => {
        if (notif.options.level != loggin.severity('DEBUG')) {
          throw new Error('level not set correctly on notifier ' + notif.constructor.name);
        }
      });
    }).not.toThrow();
  });


  it(`.formatter should set correctly in notifiers`, () => {
    let logger = loggin.logger('default');
    let formatter = loggin.formatter('minimal');
    
    logger.formatter(formatter);

    expect(() => {
      logger._notifiers.forEach(notif => {
        if (notif.options.formatter != formatter) {
          throw new Error('formatter not set correctly on notifier ' + notif.constructor.name);
        }
      });
    }).not.toThrow();
  });

  it(`.setNotifiers should set correctly`, () => {
    let logger = loggin.logger('default');
    let notif = loggin.notifier('file');
    logger.setNotifiers([notif]);
    expect(logger._notifiers).toEqual([notif]);
  });

  it(`.notifiers should add notifiers correctly`, () => {
    let logger = loggin.logger('default');
    let prevNotifs = [...logger._notifiers]
    let notif = loggin.notifier('file');
    logger.notifier(notif);
    expect(logger._notifiers).toEqual([...prevNotifs, notif]);
  });


  it(`.clone should return a new logger`, () => {
    let logger = loggin.logger('default');
    expect(logger.clone()).toBeInstanceOf(loggin.Logger)
  });

  it(`.fork should return a new logger`, () => {
    let logger = loggin.logger('default');
    expect(logger.fork()).toBeInstanceOf(loggin.Logger)
  });

  it(`.hasNotifier should work`, () => {
    let logger = loggin.logger('console');
    expect(logger.hasNotifier('console')).toBeTruthy();
    expect(logger.hasNotifier('file')).not.toBeTruthy();
  });

  it(`.getNotifier should work`, () => {
    let csol = loggin.notifier('console');
    let logger = loggin.logger({
      notifiers: [csol]
    });
    expect(logger.getNotifier('console')).toEqual(csol);
    expect(logger.getNotifier('file')).toEqual(null);
  });
});