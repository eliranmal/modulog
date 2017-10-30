'use strict';


const print = (...msg) => {
    process.stdout.write(...msg);
};

const println = (cmd, ...msg) => {
    const cmdFn = console[cmd] ? cmd : 'log';
    console[cmdFn](...msg);
};


module.exports = {
    print,
    println,
};
