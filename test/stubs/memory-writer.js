'use strict';

const sinon = require('sinon');


let buffer = [];

const fakePrint = (...msg) => buffer = buffer.concat(...msg);

const fakePrintln = (cmd, ...msg) => buffer = buffer.concat(...msg);

const stub = {
    print: sinon.stub(),
    println: sinon.stub(),
};

const setBehaviours = () => {
    stub.print.callsFake(fakePrint);
    stub.println.callsFake(fakePrintln);
};

const reset = () => {
    stub.print.reset();
    stub.println.reset();
    buffer = [];
};

const value = () => buffer.join('');


module.exports = {
    stub,
    setBehaviours,
    reset,
    value,
};
