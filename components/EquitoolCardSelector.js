import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
import { connect } from 'react-redux'
import { generateUID } from '../utils/helpers'
import Card from '../utils/card'
import Deck from '../utils/card'

class EquitoolCardSelector extends Component {
  importAll(r) {
    return r.keys().map(r);
  }

  shouldRenderCard = (card) => {
    const { cardsInPlay } = this.props
    for (let cardInPlayStr of cardsInPlay) {
      if (card.name === cardInPlayStr) {
        return false
      }
    }
    return true
  }
  render() {
    const deck = new Deck()
    return (
      <View style={{ width: 800, height: 500, flexDirection: 'row', flexWrap: 'wrap', }}>
        {deck.cards.map(
          (card, index) =>
            this.shouldRenderCard(card)
              ? (<TouchableWithoutFeedback key={index} onPress={() => this.props.selectCard(card)}>
                <Image
                  key={index}
                  source={card.imagePath}
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
  // console.log(state)
  // const { playerOneCardA, playerOneCardB, playerTwoCardA, playerTwoCardB, flopOneCard, flopTwoCard, flopThreeCard, turnCard } = state.equitool
  return { cardsInPlay: state.cardsInPlay }
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
