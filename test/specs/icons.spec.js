'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire').noCallThru();
const memoryWriter = require('../stubs/memory-writer');
const expectedOutputs = require('../expected/outputs');

const expectedIcons = Object.keys(expectedOutputs).reduce((accum, key) => {
    accum[key] = expectedOutputs[key].icon;
    return accum;
}, {});

const message = 'message';

const modulog = proxyquire('../../lib/modulog', {
    './out': memoryWriter.stub
});

describe('icons', function () {

    beforeEach('setup', function () {
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

        Object.keys(expectedIcons).forEach(function (cmd) {
            if (cmd !== 'default') {
                extendedOperationSpec(cmd);
            }
        });
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