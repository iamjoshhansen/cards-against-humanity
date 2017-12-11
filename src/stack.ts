import Emitter from './emitter';
import Card from './card';
import logger from './util/logger';
import { logType } from './util/logger';
import { padLeft, padCenter, padRight } from './util/pad';
import shuffle from './util/shuffle';

export type ValidEvents = 'add' | 'remove';

export default class Stack extends Emitter {

  label:string;
  cards:Array<Card>;
  length:number;
  private _expansions:{[label:string]:number};
  log:logType;

  constructor (label:string, cards:Array<Card>=[]) {
    super();
    this.label = label;
    this.cards = [];
    this._expansions = {};
    this.log = logger(`stack : ${label}`);

    cards.forEach((card) => {
      card.transferToStack(this);
    });

    Object.defineProperty(this, 'length', {
      get: () => {
        return this.cards.length;
      }
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

      // expansion
      if ( ! (card.expansion in this._expansions)) {
        this._expansions[card.expansion] = 0;
      }
      this._expansions[card.expansion]++;

      // this.log(`Adding card [${card.type=='white'?'W':'B'}] [${padCenter(card.expansion, 12)}] ${padLeft(card.id.toString(), 4)} : ${card.content}`);
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
      // this.log(`Removing card [${card.type=='white'?'W':'B'}] ${padLeft(card.id.toString(), 2)}`);
      this.emit('remove', card);
    } else {
      throw new Error('Card is not in this stack');
    }
    return this;
  }

  shuffle () : this {
    shuffle(this.cards);
    return this;
  }

  expansions () : Array<string> {
    const exps:Array<string> = [];
    const keys = Object.keys(this._expansions);
    keys.forEach((key) => {
      if (this._expansions[key] > 0) {
        exps.push(key);
      }
    });

    return exps;
  }
}
