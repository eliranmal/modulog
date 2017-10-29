# modulog

> a nice little logger that knows your modules auto-magically

[![NPM][1]][2]


## usage

**kickAssModule.js**

```js
const logger = require('modulog')

logger('default');
logger.log('log');
logger.info('info');
logger.success('success');
logger.warn('warn');
logger.error('error');
logger.dir('dir');
logger.trace('trace');
logger.debug('debug');
```

**stdout**

```commandline
» [kickAssModule] default
» [kickAssModule] log
ℹ [kickAssModule] info
✔ [kickAssModule] success
⚠ [kickAssModule] warn
✘ [kickAssModule] error
  [kickAssModule] 'dir'
  [kickAssModule] Trace: trace
    at print (/Users/eliranm/dev/schema-repo/node_modules/modulog/lib/modulog.js:28:23)
    at Object.<anonymous> (/Users/eliranm/dev/schema-repo/test.js:17:8)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
🐞 [kickAssModule] debug
```




[1]: https://img.shields.io/npm/v/modulog.svg?style=flat-square
[2]: https://www.npmjs.com/package/modulog