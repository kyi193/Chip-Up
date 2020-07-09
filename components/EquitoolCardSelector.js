import React, { Component } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Image, Platform } from 'react-native'
import { connect } from 'react-redux'
import { generateUID } from '../utils/helpers'
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
      <View style={Platform.OS === 'web' ? { width: 900, height: 500, flexDirection: 'row', flexWrap: 'wrap' } : { maxWidth: 215, height: 500, flexDirection: 'row', flexWrap: 'wrap', }}>
        {deck.cards.map(
          (card, index) =>
            this.shouldRenderCard(card)
              ? (<TouchableWithoutFeedback key={index} onPress={() => this.props.selectCard(card)}>
                <Image
                  key={index}
                  source={card.imagePath}
                  alt="info"
                  style={Platform.OS === 'web' ? styles.selectedCard : styles.selectedCardIos} />
              </TouchableWithoutFeedback>
              ) : <View key={generateUID()} style={Platform.OS === 'web' ? styles.blackedOut : styles.blackedOutIos} />
        )}
      </View>
    )
  }
}
function mapStateToProps(state) {
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
  },
  selectedCardIos: {
    height: 50,
    width: 37.5,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 2
  },
  blackedOutIos: {
    height: 50,
    width: 37.5,
    borderWidth: 1,
    backgroundColor: 'gray',
    marginHorizontal: 2
  }
})
export default connect(mapStateToProps)(EquitoolCardSelector)
