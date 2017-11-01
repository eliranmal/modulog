'use strict';

const path = require('path');
const assert = require('assert');
const memoryWriter = require('../stubs/memory-writer');


const generateTestSuite = (module, proxyquire) => {

    const moduleName = path.basename(module.filename, '.js');
    const modulePath = path.dirname(module.filename);
    const pathDepth = modulePath.split('/').reverse().indexOf('test');

    describe(`module name resolving (${moduleName})`, function () {

        let modulog;

        before('suite setup', function () {
            modulog = proxyquire('../'.repeat(pathDepth) + '../lib/modulog', {
                './out': memoryWriter.stub
            });
        });

        beforeEach('setup', function () {
            memoryWriter.setBehaviours();
        });

        afterEach('cleanup', function () {
            memoryWriter.reset();
        });

        describe('when required from a module', function () {

            it(`should include the requiring module name in the message prefix`, function () {
                modulog();
                assert(memoryWriter.value().includes(`[${moduleName}]`), `requiring module name "${moduleName}" was not found in message "${memoryWriter.value()}"`);
            });
        });
    });
};


module.exports = generateTestSuite;