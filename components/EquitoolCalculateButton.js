import React from 'react'
import AwesomeButton from "react-native-really-awesome-button";

function isButtonActive(state) {
  const { flopOneCard, flopTwoCard, flopThreeCard } = state
  if (flopOneCard !== 'empty' && flopTwoCard !== 'empty' && flopThreeCard !== 'empty') {
    return true
  } else {
    return false
  }
}
function EquitoolCalculateButton({ state, calculateOdds }) {
  return <AwesomeButton
    width={200}
    disabled={isButtonActive(state) ? false : true}
    backgroundColor={isButtonActive(state) ? '#3498db' : '#C0C0C0'}
    springRelease={true}
    onPress={calculateOdds}>
    Calculate
    </AwesomeButton>;
}

export default EquitoolCalculateButton
