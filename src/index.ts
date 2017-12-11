import Logger from './util/log';
import Game from './game';
import Card from './card';
import WhiteCard from './card-white';
import BlackCard from './card-black';
import { padLeft, padCenter } from './util/pad';

const log = new Logger('app');

/* Update Log Test
--------------------------------*
  let ms = 0;
  const intvl = setInterval(() => {
    log.update(`Working... ${ms++}`);
  }, 100);

  setTimeout(() => {
    clearTimeout(intvl);
    log.update('Done!');
  }, 1000);
  /**/

const game = new Game();

game.whiteCards.on('add', (card:WhiteCard) => {
  log.update(`Adding card [${card.type=='white'?'W':'B'}] [${padCenter(card.expansion, 12)}] ${padLeft(card.id.toString(), 4)} : ${card.content}`);
});

game.loadCardsFromFile('./data/cards.json');

logUpdate.clear();
logUpdate.done();

log('white cards: ', game.whiteCards.length);
log('black cards: ', game.blackCards.length);
log(' expansions: ', game.whiteCards.expansions().join(', '));

log.update('shuffing...');
game.whiteCards.shuffle();
game.blackCards.shuffle();
log.update('shuffing...done');
logUpdate.done();

log.update('yup');
logUpdate.done();


const io:SocketIO.Server = require('socket.io')();

let connectionId = 0;
let connectionTotal = 0;
io.on('connection', (socket:SocketIO.Socket) => {
  const connectionLog = logger(`app.connection.${connectionId++}`);
  connectionLog('We have a connection!');
  // postMetric('new connection');

  connectionTotal++;
  // postMetric('connection total', connectionTotal);

  socket.emit('msg', 'Hello!');
  connectionLog('Saying hello');

  socket.on('the-ping', () => {
    connectionLog('receeived the-ping, emitting pong');
    socket.emit('msg', 'socket emit');
    socket.broadcast.emit('msg','socket broadcast emit');

    io.emit('msg','io emit');
  });

  socket.on('connected', () => {
    connectionLog('receeived connection confirmation');
  });

  socket.on('disconnect', () => {
    connectionLog('..disconnected');
    connectionTotal--;
    // postMetric('connection total', connectionTotal);
  });
});

io.listen(3000);
log('Listening on http://localhost:3000/');
