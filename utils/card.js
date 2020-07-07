const cardValueMapper = {
  'A': { position: 0, value: 13 },
  '2': { position: 1, value: 1 },
  '3': { position: 2, value: 2 },
  '4': { position: 3, value: 3 },
  '5': { position: 4, value: 4 },
  '6': { position: 5, value: 5 },
  '7': { position: 6, value: 6 },
  '8': { position: 7, value: 7 },
  '9': { position: 8, value: 8 },
  'T': { position: 9, value: 9 },
  'J': { position: 10, value: 10 },
  'Q': { position: 11, value: 11 },
  'K': { position: 12, value: 12 },
}

export class Card {
  constructor(valueSuitString, imagePath) {
    this.name = valueSuitString;
    this.value = cardValueMapper[valueSuitString[0]];
    this.suit = valueSuitString[1];
    this.imagePath = imagePath;
  }
}

export default class Deck {
  constructor() {
    this.cards = this.setupCards()
  }

  setupCards() {
    // setup values array
    let values = []
    for (let i = 2; i < 10; i++) {
      values.push(i)
    }
    values = values.concat(['T', 'J', 'Q', 'K', 'A']);

    // setup suits array
    let suits = ['D', 'C', 'H', 'S'];
    let cards = []

    for (const value of values) {
      for (const suit of suits) {
        let valueSuitString = `${value}${suit}`;
        let imagePath = require(`../assets/images/cards/${valueSuitString}.png`)

        cards.push(
          new Card(valueSuitString, imagePath)
        )
      }
    }

    return cards;
  }
}


export class Game {
  constructor() {
    this.deck = new Deck();
    this.playerOneCardA = 'empty'
    this.playerOneCardB = 'empty'
    this.playerTwoCardA = 'empty'
    this.playerTwoCardB = 'empty'
    this.flopOneCard = 'empty'
    this.flopTwoCard = 'empty'
    this.flopThreeCard = 'empty'
    this.turnCard = 'empty'
  }

  playerOneCards() {
    return [this.playerOneCardA, this.playerOneCardB]
  }

  playerTwoCards() {
    return [this.playerTwoCardA, this.playerTwoCardB]
  }

  setPlayerOneCard(cardA, cardB) {
    this.playerOneCardA = cardA
    this.playerOneCardB = cardB
  }

  setPlayerTwoCard(cardA, cardB) {
    this.playerTwoCardA = cardA
    this.playerTwoCardB = cardB
  }
  setCommunityCards(flopOneCard, flopTwoCard, flopThreeCard, turnCard) {
    this.flopOneCard = flopOneCard
    this.flopTwoCard = flopTwoCard
    this.flopThreeCard = flopThreeCard
    this.turnCard = turnCard
  }

  communityCards() {
    return [this.flopOneCard, this.flopTwoCard, this.flopThreeCard, this.turnCard]
  }

  cardsInPlay() {
    return [...this.playerOneCards(), ...this.playerTwoCards(), ...this.communityCards()]
  }
}
