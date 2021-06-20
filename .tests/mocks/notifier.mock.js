let loggin = require('../../src/index');

class MockNotifier extends loggin.Notifier {
    constructor(options) {
        super(options, 'mock');
        this.logs = [];
        this.debug = true;
    }

    clear() {
        this.logs = [];
    }

    output(output, log) {
        this.logs.push(log);
        return this;
    }
}

module.exports = MockNotifier;