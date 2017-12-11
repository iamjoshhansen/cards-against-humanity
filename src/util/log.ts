import { padLeft, padRight } from './pad';
const dateFormat = require('dateformat');
const logUpdate = require('log-update');

// https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script

type ValidColor = 'black'|'red'|'green'|'yellow'|'blue'|'magenta'|'cyan'|'white';

const fgColors = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

const bgColors = {
  black: '\x1b[40m',
  red: '\x1b[41m',
  green: '\x1b[42m',
  yellow: '\x1b[43m',
  blue: '\x1b[44m',
  magenta: '\x1b[45m',
  cyan: '\x1b[46m',
  white: '\x1b[47m',
};

const ctrlChars = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
};

export default class Logger {

  namespace:string;
  fg:string;
  bg:string;

  constructer (namespace:string, fg?:ValidColor, bg?:ValidColor) {
    if (fg && bg && fg === bg) {
      throw new Error('Forground and background colors cannot be the same');
    }

    if (namespace.length === 0) {
      throw new Error('namespace cannot be an empty string');
    }

    this.namespace = namespace;
    this.fg = (fg === undefined) ? null : fgColors[fg];
    this.bg = (bg === undefined) ? null : bgColors[bg];
  }

  private makePrefix () : string {
    const now = new Date();
    let prefix:string = '';

    // date
    prefix += ctrlChars.dim;
    prefix += dateFormat(now, 'yyyy-mm-dd hh:MM:ss TT l');
    prefix += ctrlChars.reset;

    // namespace
    if (this.fg) {
      prefix += this.fg;
    }
    prefix += padLeft(this.namespace, 32);
    if (this.fg) {
      prefix += ctrlChars.reset;
    }

    return prefix;
  }

  log (...args:Array<any>) : this {
    logUpdate.done();
    logUpdate.apply(null, args);
    return this;
  }

  update (...args:Array<any>) : this {
    logUpdate.apply(null, args);
    return this;
  }

  clear () : this {
    logUpdate.clear();
    return this;
  }

  done () : this {
    logUpdate.done();
    return this;
  }
}
