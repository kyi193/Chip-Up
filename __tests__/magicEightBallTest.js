import { YesResponse, PerhapsResponse } from '../utils/magicEightBall'

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
