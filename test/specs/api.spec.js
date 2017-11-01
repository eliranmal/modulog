'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire').noCallThru();
const memoryWriter = require('../stubs/memory-writer');
const expectedOutputs = require('../expected/outputs');


const message = 'message';

let fakeOut = memoryWriter.stub;

let modulog = proxyquire('../../lib/modulog', {
    './out': memoryWriter.stub
});

describe('api', function () {

    let expectedCallArgs;

    beforeEach('setup', function () {
        memoryWriter.setBehaviours();
    });

    afterEach('cleanup', function () {
        memoryWriter.reset();
    });


    describe('basic functionality', function () {

        describe('when the default operation is called', function () {

            it(`should call 'print' once and 'println' once`, function () {
                modulog(message);
                assert(fakeOut.print.calledOnce, `print was called ${fakeOut.print.callCount} times instead of once`);
                assert(fakeOut.println.calledOnce, `println was called ${fakeOut.println.callCount} times instead of once`);
            });

            it(`should call 'println' with 'log' command`, function () {
                modulog(message);
                expectedCallArgs = ['log', message];
                assert(fakeOut.println.calledWithExactly(...expectedCallArgs), `println was called with '${fakeOut.println.args[0]}' instead of '${expectedCallArgs}'`);
            });
        });

        describe('when an extended operation is called', function () {

            Object.keys(expectedOutputs).forEach(function (cmd) {
                if (cmd !== 'default') {
                    extendedOperationSpec(cmd)
                }
            });
        });
    });

});

function extendedOperationSpec(cmd) {

    describe(`(${cmd})`, function () {

        let expectedCallArgs;

        it(`should call 'print' once and 'println' once`, function () {
            modulog[cmd](message);
            assert(fakeOut.print.calledOnce, `print was called ${fakeOut.print.callCount} times instead of once`);
            assert(fakeOut.println.calledOnce, `println was called ${fakeOut.println.callCount} times instead of once`);
        });

        it(`should call 'println' with the invoked command`, function () {
            modulog[cmd](message);
            expectedCallArgs = [cmd, message];
            assert(fakeOut.println.calledWithExactly(...expectedCallArgs), `println was called with '${fakeOut.println.args[0]}' instead of '${expectedCallArgs}'`);
        });
    });

}