import { readFileSync } from 'fs';
import Player from './player';
import BlackCard from './card-black';
import WhiteCard from './card-white';
import WhiteStack from './stack-white';
import BlackStack from './stack-black';
import logger from './util/logger';
const sleep = require('sleep');

const log = logger('game');

type submission = {
  player:Player,
  cards:WhiteStack,
};

type CardInfo = {
  id:number,
  cardType:'A'|'Q',
  text:string,
  numAnswers:number,
  expansion:string,
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

  loadCardsFromFile(filename:string) {
    log(`Loading cards from '${filename}'`);
    const cards:Array<CardInfo> = [];

    const cardsJson = readFileSync(filename).toString();
    const cardsData:Array<CardInfo> = JSON.parse(cardsJson);

    log(`Loading ${cardsData.length} cards`);
    cardsData.forEach((info) => {
      const opts = {
        id: info.id,
        type: info.cardType == 'A' ? 'white' : 'black',
        content: info.text,
        numAnswers: info.numAnswers,
        expansion: info.expansion,
      };
      if (opts.type == 'white') {
        const card = new WhiteCard(opts);
        this.whiteCards.addCard(card);
      } else {
        const card = new BlackCard(opts);
        this.blackCards.addCard(card);
      }

      sleep.msleep(1);
    });
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
