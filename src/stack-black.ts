import Stack from './stack';
import BlackCard from './card-black';

export default class BlackStack extends Stack {
  constructor (label:string, cards:Array<BlackCard>=[]) {
    super(label, cards);
  }

  addCard (card:BlackCard) : this {
    return super.addCard(card);
  }
}
