import Emitter from './emitter';
import BlackStack from './stack-black';
import WhiteStack from './stack-white';

export default class Player extends Emitter {

  name:string;
  hand:WhiteStack;
  victoryCards:BlackStack;

  constructor (name:string) {
    super();
    this.name = name;
    this.hand = new WhiteStack('hand');
    this.victoryCards = new BlackStack('awarded black cards');
  }
}
