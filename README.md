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

by default, all logger commands will send logs to stdout, except for _debug_ 
and _trace_, which are switched off.

to change this behavior, use the `LOG_LEVEL` environment variable:

- pass a single command name, e.g. `'debug'`, `'warn'`, to only switch on logging 
for that level.
- use pipes to switch on several levels, e.g. `'trace|dir'`.
- to switch on logging for all commands, use `'.*'`.
- to switch off logging entirely, use `' '`.

in addition, if you run node with `debug`, `--inspect`, `--debug` or `--debug-brk`, 
_debug_ and _trace_ are switched on automatically.


### examples

#### in your .env

```dotenv
# this will only switch on debug messages
LOG_LEVEL='debug'
# this will switch on trace, success and dir
LOG_LEVEL='trace|success|dir'
```

#### from the shell

```bash
# this will switch on warn and error
env LOG_LEVEL='warn|error' node my-app.js
# this will switch on logging for all commands
env LOG_LEVEL='.*' node my-app.js
# this will switch off logging entirely
env LOG_LEVEL=' ' node my-app.js
```

if you do any of these, debug/trace are switched on automatically:

```bash
node debug my-app.js
node --inspect my-app.js
node --debug my-app.js
node --debug-brk my-app.js
```




[1]: https://img.shields.io/npm/v/modulog.svg?style=flat-square
[2]: https://www.npmjs.com/package/modulog
[101]: /lib/commands.js