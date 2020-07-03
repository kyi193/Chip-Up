import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
import { connect } from 'react-redux'
import { generateUID } from '../utils/helpers'
let listOfCards = []

class EquitoolCardSelector extends Component {
  importAll(r) {
    return r.keys().map(r);
  }
  render() {
    const {
      playerOneCardA,
      playerOneCardB,
      playerTwoCardA,
      playerTwoCardB,
      flopOneCard,
      flopTwoCard,
      flopThreeCard,
      turnCard
    } = this.props
    listOfCards = this.importAll(require.context('../assets/images/cards', false, /\.(png|jpe?g|svg)$/));
    return (
      <View style={{ width: 1300, height: 400, flexDirection: 'row', flexWrap: 'wrap', }}>
        {listOfCards.map(
          (image, index) =>
            ((!image.includes(playerOneCardA) && !image.includes(playerOneCardB) && !image.includes(playerTwoCardA) && !image.includes(playerTwoCardB)
              && !image.includes(flopOneCard) && !image.includes(flopTwoCard) && !image.includes(flopThreeCard) && !image.includes(turnCard)))
              ? (<TouchableWithoutFeedback key={index} onPress={() => this.props.selectCard(image)}>
                <Image
                  key={index}
                  source={image}
                  alt="info"
                  style={styles.selectedCard} />
              </TouchableWithoutFeedback>
              ) : <View key={generateUID()} style={styles.blackedOut} />
        )}
      </View>
    )
  }
}
function mapStateToProps(state) {
  const { playerOneCardA, playerOneCardB, playerTwoCardA, playerTwoCardB, flopOneCard, flopTwoCard, flopThreeCard, turnCard } = state.equitool
  return {
    playerOneCardA,
    playerOneCardB,
    playerTwoCardA,
    playerTwoCardB,
    flopOneCard,
    flopTwoCard,
    flopThreeCard,
    turnCard
  }
}

const styles = StyleSheet.create({
  selectedCard: {
    height: 100,
    width: 71,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'black',
    marginHorizontal: 5
  },
  blackedOut: {
    height: 100,
    width: 71,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: 'gray',
    marginHorizontal: 5
  }
})
export default connect(mapStateToProps)(EquitoolCardSelector)
