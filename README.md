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
logger.ok('ok');
logger.success('success');
logger.warn('warn');
logger.error('error');
logger.dir({0: {1: {2: {3: 'dir'}}}});
logger.dir({0: {1: {2: {3: 'dir'}}}}, {depth: 3});
logger.trace('trace');
logger.debug('debug');
```

**stdout**

```commandline
» [kickAssModule] default
» [kickAssModule] log
ℹ [kickAssModule] info
✔ [kickAssModule] ok
✔ [kickAssModule] success
⚠ [kickAssModule] warn
✘ [kickAssModule] error
  [kickAssModule] { '0': { '1': { '2': [Object] } } }
  [kickAssModule] { '0': { '1': { '2': { '3': 'dir' } } } }
  [kickAssModule] Trace: trace
    at print (/Users/me/dev/my-node-app/node_modules/modulog/lib/modulog.js:28:23)
    at Object.<anonymous> (/Users/me/dev/my-node-app/test.js:17:8)
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


## log levels

use the `LOG_LEVEL` environment variable, with the following possible values:

- **command name**
  `'debug'`, `'warn'`, etc. will only switch on logging for that level.  
  pipes will switch on several levels, e.g. `'trace|dir'`.

- **level number**
  `2`, `7`, etc. will switch on messages with that level and below, i.e. success, warn and error.
  check out the [commands.js][101] to see level numbers for each command.


### examples

**.env**

```dotenv
# this will only switch on debug messages
LOG_LEVEL='debug'
# this will switch on trace, success and dir all together
LOG_LEVEL='trace|success|dir'
# this will switch on success, warn and error all together
LOG_LEVEL=2
```

&hellip;or, from the shell:

```bash
# this will switch on messages with level 2 and above (i.e. success, warn and error)
env LOG_LEVEL=2 node my-app.js
```

if you do any of these, debug/trace are switched on automatically:

```bash
env <DEBUG|TRACE>=true node my-app.js
```




[1]: https://img.shields.io/npm/v/modulog.svg?style=flat-square
[2]: https://www.npmjs.com/package/modulog
[101]: #/lib/commands.js