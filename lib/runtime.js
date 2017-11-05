'use strict';


const isDebug = () => {
    return typeof v8debug === 'object' || /--debug|--inspect/.test(process.execArgv.join(' '));
};


module.exports = {
    isDebug
};
