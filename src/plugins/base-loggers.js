
function plugin({ loggerRegistry }) {
    loggerRegistry
        .register('default', 'Console')
        .register('console', 'Console')
        .register('file', 'File')
        .register('http', 'Http')
        .register('memory', 'Memory');
}

module.exports = plugin;