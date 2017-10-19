import Stack from './stack';
import WhiteCard from './card-white';

export default class WhiteStack extends Stack {
  constructor (label:string, cards:Array<WhiteCard>=[]) {
    super(label, cards);
  }

  addCard (card:WhiteCard) : this {
    return super.addCard(card);
  }
}
