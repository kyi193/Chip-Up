import React from 'react'
import { HandEvaluator, Game, Card } from '../utils/card'
import renderer from 'react-test-renderer';
function getScore(fiveCardHand) {
  const evaluator = new HandEvaluator(fiveCardHand)
  return evaluator.getScore()
}

function assertHand1GreaterThanHand(hand1Arr, hand2Arr) {
  const playerOne5CardHand = hand1Arr.map(cardStr => new Card(cardStr))
  const playerTwo5CardHand = hand2Arr.map(cardStr => new Card(cardStr))
  expect(getScore(playerOne5CardHand) > getScore(playerTwo5CardHand)).toBe(true)
}

function assertHand1EqualsHand2(hand1Arr, hand2Arr) {
  const playerOne5CardHand = hand1Arr.map(cardStr => new Card(cardStr))
  const playerTwo5CardHand = hand2Arr.map(cardStr => new Card(cardStr))
  expect(getScore(playerOne5CardHand) === getScore(playerTwo5CardHand)).toBe(true)
}

describe('HandEvaluator', () => {
  describe('constructor', () => {
    test('raises error if array is empty', () => {
      expect(() => (new HandEvaluator([]))).toThrowError(new Error('Must include exactly 5 cards'));
    })
    test('raises error if array has 4 cards', () => {
      expect(() => (new HandEvaluator([new Card('AC'), new Card('2H'), new Card('KH'), new Card('JS')]))).toThrowError(new Error('Must include exactly 5 cards'));
    })
    test('raises error if array has 6 cards', () => {
      expect(() => (new HandEvaluator([new Card('AC'), new Card('2H'), new Card('KH'), new Card('JS'), new Card('TS'), new Card('4H')]))).toThrowError(new Error('Must include exactly 5 cards'));
    })
    test('Should not raise error if array has 5 cards', () => {
      expect(() => (new HandEvaluator([new Card('AC'), new Card('2H'), new Card('KH'), new Card('JS'), new Card('TS')]))).not.toThrowError(new Error('Must include exactly 5 cards'));
    })
  })
})

describe('Straight flush', () => {
  describe('Straight flush beats four of a kind', () => {
    test('Royal flush should beat JJJJA', () => {
      assertHand1GreaterThanHand(
        ['AS', 'KS', 'QS', 'JS', 'TS'],
        ['JS', 'JC', 'JH', 'JD', 'AH']
      )
    })
    test('4-8 straight flush should be AAAAK', () => {
      assertHand1GreaterThanHand(
        ['4S', '5S', '6S', '7S', '8S'],
        ['AS', 'AC', 'AH', '3D', 'AD']
      )
    })
  })

  describe('Straight flush beats straight flush', () => {
    test('Royal flush should beat 9-K straight flush', () => {
      assertHand1GreaterThanHand(
        ['AS', 'KS', 'QS', 'JS', 'TS'],
        ['9S', 'TS', 'JS', 'QS', 'KS']
      )
    })
    test('Royal flush should equal a royal flush', () => {
      assertHand1EqualsHand2(
        ['AS', 'KS', 'QS', 'JS', 'TS'],
        ['AS', 'KS', 'QS', 'JS', 'TS']
      )
    })
  })

  describe('Straight flush beats normal straight', () => {
    test('6-T straight flush should be T-A straight', () => {
      assertHand1GreaterThanHand(
        ['6S', '7S', '8S', '9S', 'TS'],
        ['TC', 'JC', 'QS', 'KH', 'AD']
      )
    })
    test('A-5 straight flush should beat T-A straight', () => {
      assertHand1GreaterThanHand(
        ['AS', '2S', '3S', '4S', '5S'],
        ['AS', 'KC', 'QH', 'JS', 'TS']
      )
    })
  })
})

describe('Four of a kind', () => {
  describe('Four of a kind beats a full house', () => {
    test('AAAAQ should beat KKKJJ', () => {
      assertHand1GreaterThanHand(
        ['AS', 'AC', 'AD', 'AH', 'QS'],
        ['KS', 'KC', 'KH', 'JS', 'JH']
      )
    })
    test('2222Q should beat AAA33', () => {
      assertHand1GreaterThanHand(
        ['2S', '2C', '2D', '2H', 'QS'],
        ['AS', 'AC', 'AH', '3S', '3H']
      )
    })
  })

  describe('Four of a kind beats a four of a kind', () => {
    test('AAAAQ should beat KKKK3', () => {
      assertHand1GreaterThanHand(
        ['AS', 'AC', 'AD', 'AH', 'QS'],
        ['KS', 'KC', 'KH', 'KD', '3H']
      )
    })
    test('KKKKJ should beat 33332', () => {
      assertHand1GreaterThanHand(
        ['KS', 'KC', 'KH', 'KD', 'JH'],
        ['3S', '3C', '3H', '3D', '2H']
      )
    })
    test('AAAAK should beat AAAAQ', () => {
      assertHand1GreaterThanHand(
        ['AS', 'AC', 'AD', 'AH', 'KS'],
        ['AS', 'AC', 'AD', 'AH', 'QS']
      )
    })
    test('AAAAK should equal AAAAK', () => {
      assertHand1EqualsHand2(
        ['AS', 'AC', 'AD', 'AH', 'KS'],
        ['AS', 'AC', 'AD', 'AH', 'KH']
      )
    })
  })
})

describe('Full House', () => {
  describe('Full House beats flush', () => {
    test('22233 should beat 4s6s9sTsJs', () => {
      assertHand1GreaterThanHand(
        ['2S', '2C', '2D', '3H', '3S'],
        ['4S', '6S', '9S', 'TS', 'JS']
      )
    })
    test('AAAKK should beat AsKs8s9sJs', () => {
      assertHand1GreaterThanHand(
        ['AS', 'AC', 'AD', 'KH', 'KS'],
        ['AS', 'KS', '8S', '9S', 'JS']
      )
    })
  })
  describe('Full House beats full House', () => {
    test('44433 should beat 33344', () => {
      assertHand1GreaterThanHand(
        ['4S', '4C', '4D', '3H', '3S'],
        ['3S', '3H', '3D', '4S', '4D']
      )
    })
    test('AAAKK should beat KKKAA', () => {
      assertHand1GreaterThanHand(
        ['AS', 'AC', 'AD', 'KH', 'KS'],
        ['KS', 'KH', 'KD', 'AS', 'AD']
      )
    })
    test('AAAKK should beat AAAQQ', () => {
      assertHand1GreaterThanHand(
        ['AS', 'AC', 'AD', 'KH', 'KS'],
        ['AS', 'AC', 'AD', 'QH', 'QS']
      )
    })
  })
})

describe('Flush', () => {
  describe('Flush beats straight', () => {
    test('4d7d8d9dTd should beat T-A straight', () => {
      assertHand1GreaterThanHand(
        ['4D', '7D', '8D', '9D', 'TD'],
        ['TC', 'JH', 'QC', 'KD', 'AS']
      )
    })
    test('4dKd8d9dAd should beat A-5 straight', () => {
      assertHand1GreaterThanHand(
        ['4D', 'KD', '8D', '9D', 'AD'],
        ['5C', '4H', '3C', '2D', 'AS']
      )
    })
  })

  describe('Flush beats flush', () => {
    test('4D7D8D9DTD should beat 3D7D8D9DTD', () => {
      assertHand1GreaterThanHand(
        ['4D', '7D', '8D', '9D', 'TD'],
        ['3D', '7D', '8D', '9D', 'TD']
      )
    })
    test('4dQd8dKdAd should beat 4dQd8d9dAd', () => {
      assertHand1GreaterThanHand(
        ['4D', 'QD', '8D', 'KD', 'AD'],
        ['4D', 'QD', '8D', '9D', 'AD']
      )
    })
  })
})
