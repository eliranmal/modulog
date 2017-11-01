'use strict';

const proxyquire = require('proxyquire').noCallThru();
const resolveNameSuite = require('../../../../suites/resolve-name');

resolveNameSuite(module, proxyquire);
