'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire').noCallThru();
const memoryWriter = require('../stubs/memory-writer');
const expectedOutputs = require('../expected/outputs');
const {bindLogLevel} = require('../util/env');
const {prop} = require('../util/object');


const expectedIcons = prop(expectedOutputs, 'icon');

const message = 'message';

let modulog;

describe('icons', function () {

    beforeEach('setup', function () {
        modulog = proxyquire('../../lib/modulog', {
            './out': memoryWriter.stub
        });
        memoryWriter.setBehaviours();
    });

    afterEach('cleanup', function () {
        memoryWriter.reset();
    });

    describe('when the default operation is called', function () {

        it(`should yield the message prefixed with the appropriate icon`, function () {
            modulog(message);
            assert(memoryWriter.value().startsWith(expectedIcons.default),
                `message should start with '${expectedIcons.default}', but instead '${memoryWriter.value().substr(0, 1)}' was found`)
        });
    });

    describe(`when an extended operation is called`, function () {

        // include all levels (debug/trace commands are switched off by default)
        before('setup', bindLogLevel('.*'));

        after('cleanup', bindLogLevel());

        Object.keys(expectedIcons)
            .filter(cmd => cmd !== 'default')
            .forEach(cmd => extendedOperationSpec(cmd));
    });

});


function extendedOperationSpec(cmd) {

    describe(`(${cmd})`, function () {

        it(`should yield the message prefixed with the appropriate icon`, function () {
            modulog[cmd](message);
            assert(memoryWriter.value().startsWith(expectedIcons[cmd]),
                `message should start with '${expectedIcons[cmd]}', but instead '${memoryWriter.value().substr(0, 1)}' was found`)
        });
    });

}