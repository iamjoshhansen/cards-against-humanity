import Emitter from './emitter';
import BlackStack from './stack-black';
import WhiteStack from './stack-white';
import logger from './util/logger';
import { logType } from './util/logger';

export default class Player extends Emitter {

  name:string;
  hand:WhiteStack;
  victoryCards:BlackStack;
  log:logType;

  constructor (name:string) {
    super();
    this.name = name;
    this.hand = new WhiteStack('hand');
    this.victoryCards = new BlackStack('awarded black cards');
    this.log = logger(`player : ${this.name}`);

    this.log('created');
  }
}
