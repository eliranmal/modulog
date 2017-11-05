'use strict';


function bindLogLevel(level) {
    return function () {
        process.env.LOG_LEVEL = level || '';
    }
}


module.exports = {
    bindLogLevel
};
