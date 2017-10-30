'use strict';

const path = require('path');
const {print, println} = require('./out');


// resolve the requiring module's name
const parentModuleName = path.basename(module.parent.filename, '.js');

// todo - allow extending this map (e.g. from a package json config object)
// todo - const commands = process.env.npm_package_modulog || {...}
// todo - const commands = Object.assign({...}, process.env.npm_package_modulog || {})
// a mapping of api commands to message icons
const commands = {
    log: '»',
    info: 'ℹ',
    ok: '✔',
    success: '✔',
    warn: '⚠',
    error: '✘',
    debug: '🐞',
    trace: ' ',
    dir: ' ',
};


const init = () => {

    // a dmz object to ensure a well known binding context
    const ø = Object.create(null);

    // default operation, as a function call, e.g. logger('wat')
    const api = write.bind(ø, 'log');

    // extended operations, as property access for commands, e.g. logger.log('wat')
    Object.keys(commands).forEach(cmd => {
        api[cmd] = write.bind(ø, cmd);
    });

    return api;
};

const write = (cmd, ...msg) => {
    const msgPrefix = messagePrefix(cmd);
    print(msgPrefix);
    println(cmd, ...msg);
};

const messagePrefix = (cmd) => {
    const cmdIcon = commands[cmd] || ' ';
    return `${cmdIcon} [${parentModuleName}] `;
};


// todo - move this upstairs and see if it still works
// this module should be non-cacheable in order to find the parent module's path correctly every time
delete require.cache[module.id];


module.exports = init();
