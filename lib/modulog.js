'use strict';

const path = require('path');
const {print, println} = require('./out');
const commands = require('./commands');


// resolve the requiring module's name
const parentModuleName = path.basename(module.parent.filename, '.js');

// this module should be non-cacheable in order to find the parent module's path correctly every time
delete require.cache[module.id];


const init = () => {

    // a dmz object to ensure a well known binding context
    const ø = Object.create(null);

    // default operation, as a function call, e.g. logger('wat')
    const api = write.bind(ø, 'log', messagePrefix('log'));

    // extended operations, as property access for commands, e.g. logger.log('wat')
    Object.keys(commands).forEach(cmd => {
        api[cmd] = write.bind(ø, cmd, messagePrefix(cmd));
    });

    return api;
};

const write = (cmd, msgPrefix, ...msg) => {
    print(msgPrefix);
    println(cmd, ...msg);
};

const messagePrefix = (cmd, details = commands[cmd], icon = details.icon || ' ') => {
    return `${icon} [${parentModuleName}] `;
};


module.exports = init();
