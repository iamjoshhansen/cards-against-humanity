import { readFileSync } from 'fs';
import Game from './game';
import Card from './card';
import { CardInfo } from './card';
import WhiteCard from './card-white';
import BlackCard from './card-black';

const cards:Array<CardInfo> = [];

const cardsJson = readFileSync('./data/cards.json').toString();
const cardsData = JSON.parse(cardsJson);

console.log('cardsData: ', typeof cardsData);
console.log('cardsData: ', cardsData);

const game = new Game();

cards.forEach((info) => {
  if (info.type == 'white') {
    const card = new WhiteCard(info);
    game.whiteCards.addCard(card);
  } else {
    const card = new BlackCard(info);
    game.blackCards.addCard(card);
  }
});
