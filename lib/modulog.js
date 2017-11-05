'use strict';

const path = require('path');
const {print, println} = require('./out');
const runtime = require('./runtime');
const commands = require('./commands');


// a dmz object to ensure a well known binding context
const ø = Object.create(null);

// resolve the requiring module's name
const parentModuleName = path.basename(module.parent.filename, '.js');

// this module should be non-cacheable in order to find the parent module's path correctly every time
delete require.cache[module.id];

// cache log levels, they're per environment
const logLevels = resolveLogLevels();


const init = () => {

    // default operation, as a function call, e.g. logger('wat')
    const api = bindDispatch('log');

    // extended operations, as property access for commands, e.g. logger.log('wat')
    Object.keys(commands).forEach(cmd => {
        api[cmd] = bindDispatch(cmd);
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

const bindDispatch = (cmd) => {
    if (logLevels.includes(cmd)) {
        // log level is allowed, bind to out stream
        return write.bind(ø, cmd, messagePrefix(cmd));
    }
    // no banana, no-op
    return () => {
    };
};

function resolveLogLevels() {
    const commandNames = Object.keys(commands);
    const envLevel = process.env.LOG_LEVEL;

    let logLevels;
    if (envLevel) {
        logLevels = commandNames.filter(level => new RegExp(envLevel).test(level));
    } else if (runtime.isDebug()) {
        logLevels = commandNames;
    } else {
        logLevels = commandNames.filter(level => !/debug|trace/.test(level));
    }

    return logLevels;
};


module.exports = init();
