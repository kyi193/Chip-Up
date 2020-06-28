import { SUBMIT_PARAMETERS } from '../actions'
const reducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_PARAMETERS:
      {
        state['chipUp'] = {
          range: action.position + action.bigBlind + action.ante,
          position: action.position,
          bigBlind: action.bigBlind
        }
        return state
      }
  }
}

export default reducer
