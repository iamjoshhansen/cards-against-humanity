import Emitter from './emitter';
import Stack from './stack';
import logger from './util/logger';
import { logType } from './util/logger';

export type CardType = 'black'|'white';

export default class Card extends Emitter {

  id:number;
  type:CardType;
  content:string;
  numAnswers:number;
  expansion:string;
  log:logType;

  stack:Stack;

  constructor (opts:{
    id:number,
    type:CardType,
    content:string,
    numAnswers:number,
    expansion:string,
  }, stack?:Stack) {
    super();
    this.id = opts.id;
    this.type = opts.type;
    this.content = opts.content;
    this.numAnswers = opts.numAnswers;
    this.expansion = opts.expansion;

    this.log = logger(`card : ${this.id}`);

    this.stack = stack;
  }

  transferToStack (stack:Stack) : this {
    const oldStackLabel = this.stack.label;
    const newStackLabel = stack.label;
    this.stack.removeCard(this.id);
    stack.addCard(this);
    this.log(`moved from ${oldStackLabel} to ${newStackLabel}`);
    this.emit('move', stack, this.stack);
    return this;
  }

}
