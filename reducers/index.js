import { SUBMIT_PARAMETERS } from '../actions'
const reducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_PARAMETERS:
      {
        state['chipUp'] = action.position + action.bigBlind + action.ante
        return state
      }
  }
}

export default reducer
