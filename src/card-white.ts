import Card from './card';
import WhiteStack from './stack-white';

export default class WhiteCard extends Card {
  constructor (opts:{
    id:number,
    content:string,
    numAnswers:number,
    expansion:string,
  }, stack?:WhiteStack) {
    super({
      id: opts.id,
      type: 'white',
      content: opts.content,
      numAnswers: opts.numAnswers,
      expansion: opts.expansion,
    }, stack);
  }

  transferToStack (stack:WhiteStack) : this {
    return super.transferToStack(stack);
  }
}
