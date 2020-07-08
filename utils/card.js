class HandValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "HandValidationError";
  }
}

export class CardValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "CardValidationError";
  }
}
const values = 'AKQJT98765432'
const suits = 'CDHS'
const kickerScoreMapper = {
  0: .13, //A
  12: .12, //K
  11: .11, //Q
  10: .10, //J
  9: .09, //T
  8: .08, //9
  7: .07, //8
  6: .06, //7
  5: .05, //6
  4: .04, //5
  3: .03, //4
  2: .02, //3
  1: .01, //2
}

const rankScoreMapper = {
  0: 1, //A
  12: 12 / 13, //K
  11: 11 / 13, //Q
  10: 10 / 13, //J
  9: 9 / 13, //T
  8: 8 / 13, //9
  7: 7 / 13, //8
  6: 6 / 13, //7
  5: 5 / 13, //6
  4: 4 / 13, //5
  3: 3 / 13, //4
  2: 2 / 13, //3
  1: 1 / 13, //2
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
    console.log('VALUE:', valueSuitString)
    this.validateCardString(valueSuitString)
    this.name = valueSuitString;
    this.value = cardValueMapper[valueSuitString[0]];
    this.suit = valueSuitString[1];
    this.imagePath = imagePath;
  }

  validateCardString(valueSuitString) {
    if (valueSuitString === undefined || valueSuitString.length !== 2) {
      throw new CardValidationError()
    }
    if (!values.includes(valueSuitString[0])) {
      throw new CardValidationError()
    }
    if (!suits.includes(valueSuitString[1])) {
      throw new CardValidationError()
    }
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

class StraightFlushChecker {
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
    const flushChecker = new FlushChecker(this.fiveCardHand);
    const straightChecker = new StraightChecker(this.fiveCardHand)
    const flushResult = flushChecker.getResults()
    const straightResult = straightChecker.getResults()
    return (flushResult.score + straightResult.score)
  }

  matchesHand() {
    let cards = [...this.fiveCardHand]
    const flushChecker = new FlushChecker(this.fiveCardHand);
    const straightChecker = new StraightChecker(this.fiveCardHand)
    const flushResult = flushChecker.getResults()
    const straightResult = straightChecker.getResults()
    // TODO: figure out dynamic class instantiation
    return (flushResult.matchesHand && straightResult.matchesHand)

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
    let score
    let cards = [...this.fiveCardHand]

    let countMap = {}

    for (let card of cards) {
      if (countMap[card.value.position]) {
        countMap[card.value.position] += 1
      } else {
        countMap[card.value.position] = 1
      }
    }
    for (let value in countMap) {
      if (countMap[value] === 1) {
        kickerScore = kickerScoreMapper[value]
      } else {
        score = ((90000) * rankScoreMapper[value]) + 900000
      }
    }
    return kickerScore + score
  }

  matchesHand() {
    let cards = [...this.fiveCardHand]

    let countMap = {}

    for (let card of cards) {
      if (countMap[card.value.position]) {
        countMap[card.value.position] += 1
        if (countMap[card.value.position] === 4) {
          return true
        }
      } else {
        countMap[card.value.position] = 1
      }
    }

    return false
  }
}
class FullHouseChecker {
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
    let score
    let cards = [...this.fiveCardHand]

    let countMap = {}
    let tripsChecker = false
    let pairChecker = false
    for (let card of cards) {
      if (countMap[card.value.position]) {
        countMap[card.value.position] += 1
      } else {
        countMap[card.value.position] = 1
      }
    }
    for (let value in countMap) {
      if (countMap[value] === 2) {
        kickerScore = kickerScoreMapper[value]
      } else {
        score = ((90000) * rankScoreMapper[value]) + 800000
      }
    }
    return (kickerScore + score)
  }

  matchesHand() {
    let cards = [...this.fiveCardHand]

    let countMap = {}
    let tripsChecker = false
    let pairChecker = false
    for (let card of cards) {
      if (countMap[card.value.position]) {
        countMap[card.value.position] += 1
      } else {
        countMap[card.value.position] = 1
      }
    }
    for (let value in countMap) {
      if (countMap[value] === 3) {
        tripsChecker = true
      }
      if (countMap[value] === 2) {
        pairChecker = true
      }
    }

    return (tripsChecker && pairChecker)
  }
}

class FlushChecker {
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
    let kickerScore = 0
    let score
    let cards = [...this.fiveCardHand]

    let countMap = {}
    for (let card of cards) {
      kickerScore += kickerScoreMapper[card.value.position]
    }
    score = 700000 + kickerScore
    return (score)
  }

  matchesHand() {
    let cards = [...this.fiveCardHand]

    let countMap = {}

    for (let card of cards) {
      if (countMap[card.suit]) {
        countMap[card.suit] += 1
      } else {
        countMap[card.suit] = 1
      }
    }
    for (let value in countMap) {
      if (countMap[value] === 5) {
        return true
      }
    }

    return false
  }
}

class StraightChecker {
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
    let cards = [...this.fiveCardHand]
    let kickerScore = 0
    let score
    for (let card of cards) {
      kickerScore += kickerScoreMapper[card.value.position]
    }
    score = 600000 + kickerScore
    return (score)
  }

  matchesHand() {
    let broadway = ['A', 'K', 'Q', 'J', 'T']
    const hand = [...this.fiveCardHand]
    for (let i = 0; i < hand.length; i++) {
      if (broadway.includes(hand[i].name[0])) {
        broadway.splice(broadway.indexOf(hand[i].name[0]), 1)
      }
    }
    if (broadway.length === 0) {
      return true
    }
    let game = new Game()
    game.sortCards(this.fiveCardHand)
    let prevValue = this.fiveCardHand[0].value.position
    let score
    let cards = [...this.fiveCardHand]
    for (let i = 1; i < this.fiveCardHand.length; i++) {
      if (this.fiveCardHand[i].value.position - prevValue !== 1) {
        return false
      }
      prevValue = this.fiveCardHand[i].value.position
    }
    return true
  }
}

class ThreeOfAKindChecker {
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
    let score
    let cards = [...this.fiveCardHand]

    let countMap = {}
    for (let card of cards) {
      if (countMap[card.value.position]) {
        countMap[card.value.position] += 1
      } else {
        countMap[card.value.position] = 1
      }
    }
    for (let value in countMap) {
      if (countMap[value] !== 3) {
        kickerScore = kickerScoreMapper[value]
      } else {
        score = ((90000) * rankScoreMapper[value]) + 500000
      }
    }
    return (kickerScore + score)
  }

  matchesHand() {
    let cards = [...this.fiveCardHand]

    let countMap = {}
    for (let card of cards) {
      if (countMap[card.value.position]) {
        countMap[card.value.position] += 1
      } else {
        countMap[card.value.position] = 1
      }
    }
    for (let value in countMap) {
      if (countMap[value] === 3) {
        return true
      }
    }

    return false
  }
}

class TwoPairChecker {
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
    let kickerScore = 0
    let score = 400000
    let cards = [...this.fiveCardHand]
    let countMap = {}
    for (let card of cards) {
      if (countMap[card.value.position]) {
        countMap[card.value.position] += 1
      } else {
        countMap[card.value.position] = 1
      }
    }
    for (let value in countMap) {
      if (countMap[value] === 2) {
        score += ((90000) * rankScoreMapper[value]) / 10
      } else {
        kickerScore += kickerScoreMapper[value]
      }
    }
    return (score + kickerScore)
  }

  matchesHand() {
    let cards = [...this.fiveCardHand]

    let countMap = {}
    let twoPairCount = 0
    for (let card of cards) {
      if (countMap[card.value.position]) {
        countMap[card.value.position] += 1
      } else {
        countMap[card.value.position] = 1
      }
    }
    for (let value in countMap) {
      if (countMap[value] === 2)
        twoPairCount += 1

    }

    return twoPairCount === 2
  }
}

class PairChecker {
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
    let kickerScore = 0
    let score = 300000
    let cards = [...this.fiveCardHand]
    let countMap = {}
    for (let card of cards) {
      if (countMap[card.value.position]) {
        countMap[card.value.position] += 1
      } else {
        countMap[card.value.position] = 1
      }
    }
    for (let value in countMap) {
      if (countMap[value] === 2) {
        score += ((90000) * rankScoreMapper[value]) / 10
      } else {
        kickerScore += kickerScoreMapper[value]
      }
    }
    return (score + kickerScore)
  }

  matchesHand() {
    let cards = [...this.fiveCardHand]

    let countMap = {}
    let twoPairCount = 0
    for (let card of cards) {
      if (countMap[card.value.position]) {
        countMap[card.value.position] += 1
      } else {
        countMap[card.value.position] = 1
      }
    }
    for (let value in countMap) {
      if (countMap[value] === 2)
        return true

    }

    return false
  }
}

class HighCardChecker {
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
    let kickerScore = 0
    let score = 200000
    let cards = [...this.fiveCardHand]
    let countMap = {}
    for (let card of cards) {
      if (countMap[card.value.position]) {
        countMap[card.value.position] += 1
      } else {
        countMap[card.value.position] = 1
      }
    }
    for (let value in countMap) {
      kickerScore += kickerScoreMapper[value]
    }
    return (score + kickerScore)
  }

  matchesHand() {
    return true
  }
}
// TOOD: OTHER CHECKS

export class HandEvaluator {
  constructor(fiveCardHand) {
    this.fiveCardHand = fiveCardHand
    if (this.fiveCardHand.length !== 5) {
      throw new HandValidationError("Must include exactly 5 cards")
    }
    // Start form checking BEST hand to worst
    this.handCheckers = {
      // TODO: Straight flush (re-use logic for straight + flush)
      StraightFlushChecker,
      FourOfAKindChecker,
      FullHouseChecker,
      FlushChecker,
      StraightChecker,
      ThreeOfAKindChecker,
      TwoPairChecker,
      PairChecker,
      HighCardChecker,
    }
  }

  getScore() {
    for (let checkerClass in this.handCheckers) {
      const checker = new this.handCheckers[checkerClass](this.fiveCardHand); // TODO: figure out dynamic class instantiation
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
