import Player from './player';
import BlackCard from './card-black';
import WhiteCard from './card-white';
import WhiteStack from './stack-white';
import BlackStack from './stack-black';

type submission = {
  player:Player,
  cards:WhiteStack,
};

export default class Game {

  players:Array<Player>;
  activePlayer:number;
  whiteCards:WhiteStack;
  blackCards:BlackStack;
  discardStack:WhiteStack;
  submissions:Array<submission>;
  activeBlack:BlackCard;

  constructor (opts:{
    players?:Array<Player>,
    activePlayer?:number,
    whiteCards?:WhiteStack,
    blackCards?:BlackStack,
    discardStack?:WhiteStack,
    submissions?:Array<submission>,
  }={}) {
    this.players = opts.players || [];
    this.activePlayer = opts.activePlayer || 0;
    this.whiteCards = opts.whiteCards || new WhiteStack('white draw pile');
    this.blackCards = opts.blackCards || new BlackStack('black draw pile');
    this.discardStack = opts.discardStack || new WhiteStack('discard pile');
    this.submissions = opts.submissions || [];
  }

  setActiveBlackCard (card:BlackCard) : this {
    this.activeBlack = card;
    card.stack = null;

    return this;
  }

  takeSubmission (player:Player, cards:Array<WhiteCard>) : this {
    const stack = new WhiteStack(`Player ${player.name} submission`, cards);

    this.submissions.push({
      player,
      cards: stack,
    });

    return this;
  }

  awardBlackCard (player:Player) : this {
    this.activeBlack.transferToStack(player.victoryCards);
    return this;
  }

  clearSubmissions () : this {
    this.submissions.forEach((submission) => {
      while(submission.cards.length > 0) {
        submission.cards.cards[0].transferToStack(this.discardStack);
      }
    });

    return this;
  }

  addPlayer (name:string) {
    this.players.push(new Player(name));
  }
}
