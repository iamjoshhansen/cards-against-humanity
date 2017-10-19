import Emitter from './emitter';
import Stack from './stack';

export type CardInfo = {
  id:number,
  type:CardType,
  content:string,
  numAnswers:number,
  expansion:string,
};
export type CardType = 'black'|'white';

export default class Card extends Emitter {

  id:number;
  type:CardType;
  content:string;
  numAnswers:number;
  expansion:string;

  stack:Stack;

  constructor (opts:CardInfo, stack?:Stack) {
    super();
    this.id = opts.id;
    this.type = opts.type;
    this.content = opts.content;
    this.numAnswers = opts.numAnswers;
    this.expansion = opts.expansion;

    this.stack = stack;
  }

  transferToStack (stack:Stack) : this {
    this.stack.removeCard(this.id);
    stack.addCard(this);
    this.emit('move', stack, this.stack);
    return this;
  }

}
