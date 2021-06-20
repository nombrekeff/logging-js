
function plugin({ severityRegistry, Logger, Severity }) {
    severityRegistry
        .register(0, 'EMERGENCY')
        .register(1, 'ALERT')
        .register(2, 'CRITICAL')
        .register(3, 'ERROR')
        .register(4, 'WARNING')
        .register(5, 'NOTICE')
        .register(6, 'INFO')
        .register(7, 'DEBUG')
        .register(7, 'DEFAULT')
        .register(8, 'SILLY');


    // Define log shorthands
    const logWithLevel = (level) => {
        return function (message, data, opts = {}) {
            this.log(message, data, {
                level: Severity.registry.get(level),
                ...opts
            });

            return this;
        }
    }

    Logger.prototype.debug = logWithLevel('DEBUG');
    Logger.prototype.default = logWithLevel('DEFAULT');
    Logger.prototype.warning = logWithLevel('WARNING');
    Logger.prototype.alert = logWithLevel('ALERT');
    Logger.prototype.emergency = logWithLevel('EMERGENCY');
    Logger.prototype.critical = logWithLevel('CRITICAL');
    Logger.prototype.error = logWithLevel('ERROR');
    Logger.prototype.notice = logWithLevel('NOTICE');
    Logger.prototype.info = logWithLevel('INFO');
    Logger.prototype.silly = logWithLevel('SILLY');
}

module.exports = plugin;