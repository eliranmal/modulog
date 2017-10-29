'use strict';

const path = require('path');

// a dmz object to ensure a deterministic binding context
const ø = Object.create(null);

// mapping api commands to message prefixes
const commands = {
    log: '»',
    info: 'ℹ',
    success: '✔',
    warn: '⚠',
    error: '✘',
    debug: '🐞',
    trace: ' ',
    dir: ' ',
};

// resolve requiring module name
const parentModuleFileName = path.basename(module.parent.filename, '.js');


const print = (cmd, ...msg) => {
    const commandFn = console[cmd] ? cmd : 'log';
    const commandName = commands[cmd] || ' ';
    process.stdout.write(`${commandName} [${parentModuleFileName}] `);
    console[commandFn](...msg);
};

const constructApi = () => {

    // default operation, as a function call, e.g. logger('wat')
    const api = print.bind(ø, 'log');

    // extended operations, as property access, e.g. logger.log('wat')
    Object.keys(commands).forEach(cmd => {
        api[cmd] = print.bind(ø, cmd);
    });

    return api;
};


// this module should be non-cacheable in order to find the parent module's path correctly every time
delete require.cache[module.id];


module.exports = constructApi();
