'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire').noCallThru();
const memoryWriter = require('../stubs/memory-writer');
const expectedOutputs = require('../expected/outputs');
const {bindLogLevel} = require('../util/env');


const commands = Object.keys(expectedOutputs).filter(cmd => cmd !== 'default');

const message = 'message';

const fakeOut = memoryWriter.stub;

let modulog;

describe('log level', function () {

    beforeEach('setup', function () {
        modulog = proxyquire('../../lib/modulog', {
            './out': memoryWriter.stub
        });
        memoryWriter.setBehaviours();
    });

    afterEach('cleanup', function () {
        memoryWriter.reset();
    });


    describe(`when LOG_LEVEL is not set`, function () {

        before('setup', bindLogLevel());

        after('cleanup', bindLogLevel());

        it(`should invoke some commands`, function () {
            modulog(message);
            modulog.ok(message);
            modulog.warn(message);
            assert(fakeOut.print.calledThrice);
            assert(fakeOut.println.calledThrice);
        });

        it(`should not invoke debug/trace commands`, function () {
            modulog.debug(message);
            modulog.trace(message);
            assert(!fakeOut.print.called);
            assert(!fakeOut.println.called);
        });
    });

    describe(`when LOG_LEVEL is set to 'debug'`, function () {

        before('setup', bindLogLevel('debug'));

        after('cleanup', bindLogLevel());

        it(`should invoke the specified command`, function () {
            modulog.debug(message);
            assert(fakeOut.print.calledOnce);
            assert(fakeOut.println.calledOnce);
        });

        it(`should not invoke unspecified commands`, function () {
            modulog.trace(message);
            modulog.log(message);
            assert(!fakeOut.print.called);
            assert(!fakeOut.println.called);
        });
    });

    describe(`when LOG_LEVEL is set to 'info|dir'`, function () {

        before('setup', bindLogLevel('info|dir'));

        after('cleanup', bindLogLevel());

        it(`should invoke the specified commands`, function () {
            modulog.info(message);
            modulog.dir(message);
            assert(fakeOut.print.calledTwice);
            assert(fakeOut.println.calledTwice);
        });

        it(`should not invoke unspecified commands`, function () {
            modulog.trace(message);
            modulog.success(message);
            assert(!fakeOut.print.called);
            assert(!fakeOut.println.called);
        });
    });

    describe(`when LOG_LEVEL is set to '.*'`, function () {

        before('setup', bindLogLevel('.*'));

        after('cleanup', bindLogLevel());

        it(`should invoke all available commands`, function () {
            commands.forEach(cmd => {
                modulog[cmd](message);
            });
            assert(fakeOut.print.callCount === commands.length);
            assert(fakeOut.println.callCount === commands.length);
        });
    });

    describe(`when LOG_LEVEL is set to ' '`, function () {

        before('setup', bindLogLevel(' '));

        after('cleanup', bindLogLevel());

        it(`should not invoke any command`, function () {
            commands.forEach(cmd => {
                modulog[cmd](message);
            });
            assert(!fakeOut.print.called);
            assert(!fakeOut.println.called);
        });
    });

});

