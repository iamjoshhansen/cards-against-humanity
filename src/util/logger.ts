import { padRight } from './pad';
const dateFormat = require('dateformat');

export type logType = (...args:Array<any>) => void;

// https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script
const reset = '\x1b[0m';
let colorCursor = 1;
const colors = [
  "\x1b[31m",
  "\x1b[32m",
  "\x1b[33m",
  "\x1b[34m",
  "\x1b[35m",
  "\x1b[36m",
  "\x1b[37m",
];

function debug(namespace:string) {

  let ns = namespace;
  while (ns.length < 30) {
    ns = ' ' + ns;
  }

  let color = colors[colorCursor++ % colors.length];

  return (...args:Array<any>) => {
    const now:Date = new Date();
    const date = dateFormat(now, 'yyyy-mm-dd hh:MM:ss TT l');
    let consoleArgs:Array<any> = ['\x1b[2m', date, reset, color, ns, reset];
    consoleArgs = consoleArgs.concat(args);
    console.log.apply(null, consoleArgs);
  };
}

export default (namespace:string) : logType => {
  return debug(namespace);
};
