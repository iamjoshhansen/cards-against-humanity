import Card from './card';
import BlackStack from './stack';

export default class BlackCard extends Card {
  constructor (opts:{
    id:number,
    content:string,
    numAnswers:number,
    expansion:string,
  }, stack?:BlackStack) {
    super({
      id: opts.id,
      type: 'black',
      content: opts.content,
      numAnswers: opts.numAnswers,
      expansion: opts.expansion,
    }, stack);
  }

  transferToStack (stack:BlackStack) : this {
    return super.transferToStack(stack);
  }
}
