/**
 * @param {loggin} loggin 
 */
function plugin(loggin) {
    const { Severity, Logger } = loggin;
    console.log('initing plugin');

    Severity.registry.register(9, 'CUSTOM');

    Logger.prototype.custom = function (message, data = null, opts = {}) {
        this.log(message, data, {
            level: Severity.registry.get('CUSTOM'),
            ...opts
        });

        return this;
    };
}

module.exports = plugin;