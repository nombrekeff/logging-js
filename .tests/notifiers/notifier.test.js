/**
* @jest-environment node
*/
let loggin = require('../../src/index');

describe('loggin.Notifier', () => {
  it(`should be defined`, () => {
    expect(loggin.Notifier).toBeDefined();
  });

  it(`should instanciate new notifier with no args`, () => {
    expect(() => {
      new loggin.Notifier();
    }).not.toThrow();
  });

  it(`should instanciate new notifier with severity`, () => {
    expect(() => {
      let sev = loggin.severity('DEBUG');
      new loggin.Notifier({
        level: sev
      });
    }).not.toThrow();
  });

  it(`Sets options correctly`, () => {
    let sev = loggin.severity('DEBUG');
    let formatter = loggin.formatter('detailed');
    let notif = new loggin.Notifier({
      level: sev,
      formatter: 'detailed',
    });

    expect(notif.options.level).toEqual(sev);
    expect(notif.options.formatter).toMatchObject(formatter);
  });

  it(`.enabled should set correctly`, () => {
    let notifier = loggin.notifier('default');
    notifier.enabled(false);
    expect(notifier.options.enabled).toEqual(false);
    notifier.enabled(true);
    expect(notifier.options.enabled).toEqual(true);
  });

  it(`.level should set correctly`, () => {
    let notifier = loggin.notifier('default');
    notifier.level('DEBUG');
    expect(notifier.options.level).toEqual(loggin.severity('DEBUG'));
  });

  it(`.getLineWithNumber should work`, () => {
    let notifier = loggin.notifier('default');
    let line = notifier.getLineWithNumber('test');
    expect(line).toEqual('(0) test');
  });

  it(`instance with string formatter`, () => {
    expect(() => {
      new loggin.Notifier({
        formatter: 'detailed'
      });
    }).not.toThrow();
  });

  it(`canOutput(level: debug) == true`, () => {
    const notifier = loggin.notifier('default');
    notifier.level(loggin.severity('DEBUG'));

    expect(notifier.canOutput({ level: loggin.severity('DEBUG') })).toEqual(true);
  });

  it(`canOutput(level: error) == false`, () => {
    const notifier = loggin.notifier('default');
    notifier.level(loggin.severity('ERROR'));

    expect(notifier.canOutput({ level: loggin.severity('DEBUG') })).toEqual(false);
  });



  it(`preNotify`, () => {
    const notifier = loggin.notifier('default');
    notifier.level(loggin.severity('ERROR'));
    notifier.options.preNotify = () => true;

    spyOn(notifier.options, 'preNotify');

    const log = new loggin.Log("test", null, loggin.Severity.registry.get('debug'));
    notifier.notify(log)

    expect(notifier.options.preNotify).toHaveBeenCalled();
  });

  it(`ignore`, () => {
    const notifier = loggin.notifier('default');
    notifier.level(loggin.severity('ERROR'));
    notifier.options.ignore = () => true;

    expect(notifier.canOutput({ level: loggin.severity('DEBUG') })).toEqual(false);
  });
});