export const SUBMIT_PARAMETERS = ' SUBMIT_PARAMETERS'
export const SAVE_EQUITOOL_PARAMETERS = 'SAVE_EQUITOOL_PARAMETERS'

export function submitParameters(position, bigBlind, ante) {
  return {
    type: SUBMIT_PARAMETERS,
    position,
    bigBlind,
    ante
  }
}

export function saveEquitoolParameters(game) {
  return {
    type: SAVE_EQUITOOL_PARAMETERS,
    // playerOneCardA,
    // playerOneCardB,
    // playerTwoCardA,
    // playerTwoCardB,
    // flopOneCard,
    // flopTwoCard,
    // flopThreeCard,
    // turnCard,
    game
  }
}
