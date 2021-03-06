import { SUBMIT_PARAMETERS, SAVE_EQUITOOL_PARAMETERS } from '../actions'
const reducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_PARAMETERS: {
      state['chipUp'] = {
        range: action.bigBlind + action.position + action.ante,
        position: action.position,
        bigBlind: action.bigBlind,
        ante: action.ante
      }
      return state
    }
    case SAVE_EQUITOOL_PARAMETERS: {
      state['cardsInPlay'] = action.game.cardsInPlay()
      return state
    }
  }
}

export default reducer
