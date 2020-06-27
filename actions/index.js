export const SUBMIT_PARAMETERS = ' SUBMIT_PARAMETERS'

export function submitParameters(position, bigBlind, ante) {
  return {
    type: SUBMIT_PARAMETERS,
    position,
    bigBlind,
    ante
  }
}
