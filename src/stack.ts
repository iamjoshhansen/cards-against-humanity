import Emitter from './emitter';
import Card from './card';

export type ValidEvents = 'add' | 'remove';

export default class Stack extends Emitter {

  label:string;
  cards:Array<Card>;
  length:number;

  constructor (label:string, cards:Array<Card>=[]) {
    super();
    this.label = label;
    this.cards = [];

    cards.forEach((card) => {
      card.transferToStack(this);
    });

    Object.defineProperty(this, 'length', () => {
      return this.cards.length;
    });
  }

  on (event:ValidEvents, callback:(card:Card) => void) {
    return super.on(event, callback);
  }

  off (event:ValidEvents) {
    return super.off(event);
  }

  private cardIndex (id:number) : number {
    let i = -1;
    const len = this.cards.length;
    while (++i<len && this.cards[i].id !== id);
    if (i === len) {
      return -1;
    }
    return i;
  }

  hasCard (card:Card) : boolean {
    return this.cardIndex(card.id) > -1;
  }

  addCard (card:Card) : this {
    const index = this.cardIndex(card.id);
    if (index == -1) {
      this.cards.push(card);
      card.stack = this;
      this.emit('add', card);
    } else {
      throw new Error('Card already exists in stack');
    }
    return this;
  }

  removeCard (id:number) : this {
    const index = this.cardIndex(id);
    if (index > -1) {
      const card = this.cards[index];
      card.stack = null;
      this.cards.splice(index, 1);
      this.emit('remove', card);
    } else {
      throw new Error('Card is not in this stack');
    }
    return this;
  }
}
