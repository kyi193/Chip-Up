const kickerScoreMapper = {
  'A': .13,
  '2': .13,
  '3': .11,
  '4': .10,
  '5': .09,
  '6': .08,
  '7': .07,
  '8': .06,
  '9': .05,
  'T': .04,
  'J': .03,
  'Q': .02,
  'K': .01,
}

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

class FourOfAKindChecker {
  constructor(fiveCardHand) {
    this.fiveCardHand = fiveCardHand
  }

  getResults() {
    return {
      matchesHand: this.matchesHand(),
      score: this.getScore()
    }
  }

  getScore() {
    if (!this.matchesHand) {
      return null
    }
    let kickerScore
    let cards = [...this.fiveCardHard]

    let countMap = {}

    for (let card of cards) {
      if (countMap[card]) {
        countMap[card] += 1
        if (countMap[card] === 4) {
          return true
        }
      } else {
        countMap[card] = 1
      }
    }
    for (value of countMap) {
      if (countMap[value] === 1) {
        kickerScore = kickerScoreMapper[value]
      }
    }
    return 900000 + kickerScore
  }

  matchesHand() {
    let cards = [...this.fiveCardHard]

    let countMap = {}

    for (let card of cards) {
      if (countMap[card]) {
        countMap[card] += 1
        if (countMap[card] === 4) {
          return true
        }
      } else {
        countMap[card] = 1
      }
    }

    return false
  }
}

// TOOD: OTHER CHECKS

class HandEvaluator {
  constructor(fiveCardHand) {
    this.fiveCardHand = fiveCardHand

    // Start form checking BEST hand to worst
    this.handCheckers = {
      // TODO: Straight flush (re-use logic for straight + flush)
      FourOfAKindChecker,
      // this.fullHouseChecker
    }
  }

  runCheckers() {
    for (let checkerClass of this.handCheckers) {
      const checker = new this.handCheckers[checkerClass]; // TODO: figure out dynamic class instantiation
      const result = checker.getResults(); // Eecpeted: { score: Integer, matchesHand: Boolean}
      if (result.matchesHand) {
        return result.score
      }
    }
    return false;
  }

  fourOfKindScorer() {

  }

  fourofAKindChecker() {

  }

  fullHouseChecker() {
    // TODO
  }

  sortCards(cardsArray) {
    cardsArray.sort((cardA, cardB) => cardA.value.position - cardB.value.position)
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


  generateFiveCardHand() {
    // 1. duplicate a deck copy

    // pick 1 card at random and remove it from copied eck

    // repeated 4 more times

    // return array of 5 cards
    let newDeck = [...this.deck.cards]
    let deckLength = Object.keys(newDeck).length
    let fiveCardHand = []
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * deckLength - 1)
      fiveCardHand.push(newDeck.splice(randomIndex, 1))
    }
    return fiveCardHand
  }

  sortCards(cardsArray) {
    cardsArray.sort((cardA, cardB) => cardA.value.position - cardB.value.position)
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

  communityCardsNoTurn() {
    return [this.flopOneCard, this.flopTwoCard, this.flopThreeCard]
  }

  cardsInPlay() {
    return [...this.playerOneCards(), ...this.playerTwoCards(), ...this.communityCards()]
  }

  cardsInPlayNoTurn() {
    return [...this.playerOneCards(), ...this.playerTwoCards(), ...this.communityCardsNoTurn()]
  }

}
