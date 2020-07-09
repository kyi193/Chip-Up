import { YesResponse, PerhapsResponse, MaybeResponse, NotTodayResponse } from '../utils/magicEightBall'

describe('YesReponse', () => {
  describe('getResults()', () => {
    const yesResponse = new YesResponse()
    const yesResults = yesResponse.getResults()
    test('answer should be Yes', () => {
      expect(yesResults.answer).toBe('Yes');
    })
    test('index should be 0', () => {
      expect(yesResults.index).toBe(0);
    })
  })
})

describe('PerhapsResponse', () => {
  describe('getResults()', () => {
    const perhapsResponse = new PerhapsResponse()
    const perhapsResults = perhapsResponse.getResults()
    test('answer should be Perhaps', () => {
      expect(perhapsResults.answer).toBe('Perhaps');
    })
    test('index should be 1', () => {
      expect(perhapsResults.index).toBe(1);
    })
  })
})

describe('MaybeResponse', () => {
  describe('getResults()', () => {
    const maybeResponse = new MaybeResponse()
    const maybeResults = maybeResponse.getResults()
    test('answer should be Perhaps', () => {
      expect(maybeResults.answer).toBe('Maybe');
    })
    test('index should be 2', () => {
      expect(maybeResults.index).toBe(2);
    })
    test('index should be not be anything other than 2', () => {
      expect(maybeResults.index).not.toBe(1);
    })
  })
})

describe('NotTodayResponse', () => {
  describe('getResults()', () => {
    const notTodayResponse = new NotTodayResponse()
    const notTodayResults = notTodayResponse.getResults()
    test('answer should be Not today bud', () => {
      expect(notTodayResults.answer).toBe('Not today bud');
    })
    test('index should be 3', () => {
      expect(notTodayResults.index).toBe(3);
    })
    test('index should be not be anything other than 3', () => {
      expect(notTodayResults.index).not.toBe(4);
    })
  })
})
