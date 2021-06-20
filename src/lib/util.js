const os = require('os');
const path = require('path');

function isFunction(val) {
    return val && val.apply !== undefined;
}

function isConstructor(obj) {
    if (!obj) return false;
    if (!obj.prototype) return false;
    if (!obj.prototype.constructor) return false;

    return !!obj.prototype.constructor.name;
}


function getOsUsername(injectedOs) {
    const os_ = (injectedOs || os);
    return os_.userInfo ? os_.userInfo().username : null;
}

function getFileBasename() {
    return path.basename(__filename);
}

module.exports.isFunction = isFunction;
module.exports.isConstructor = isConstructor;
module.exports.getFileBasename = getFileBasename;
module.exports.getOsUsername = getOsUsername;