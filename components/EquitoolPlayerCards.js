import React, { Component } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Image, Platform } from 'react-native'
import EquitoolCardSelector from './EquitoolCardSelector'

class EquitoolPlayerCards extends Component {
  state = {
    cardOneHighLighted: false,
    cardTwoHighLighted: false,
    cardSelected: 'none',
    cardOneSelected: null,
    cardTwoSelected: null,
    cardOneValue: 'empty',
    cardTwoValue: 'empty',
  }
  componentDidMount() {
  }
  cardOneSelected = () => {
    const { cardOneHighLighted, cardTwoHighLighted } = this.state
    if (cardOneHighLighted && !cardTwoHighLighted) {
      this.setState(() => ({
        cardOneHighLighted: false,
        cardTwoHighLighted: false,
        cardSelected: 'none',
      }))
    } else {
      this.setState(() => ({
        cardOneHighLighted: !cardOneHighLighted,
        cardTwoHighLighted: (cardOneHighLighted === cardTwoHighLighted) ? cardTwoHighLighted : !cardTwoHighLighted,
        cardSelected: 'one',
      }))
    }
  }
  cardTwoSelected = () => {
    const { cardOneHighLighted, cardTwoHighLighted } = this.state
    if (cardTwoHighLighted && !cardOneHighLighted) {
      this.setState(() => ({
        cardOneHighLighted: false,
        cardTwoHighLighted: false,
        cardSelected: 'none',
      }))
    } else {
      this.setState(() => ({
        cardTwoHighLighted: !cardTwoHighLighted,
        cardOneHighLighted: (cardTwoHighLighted === cardOneHighLighted) ? cardOneHighLighted : !cardOneHighLighted,
        cardSelected: 'two'
      }))
    }
  }
  selectCard = (card) => {
    const image = card.imagePath;
    let value = card.name;
    const { cardSelected } = this.state
    const { updatePlayer } = this.props

    if (cardSelected === 'one') {
      updatePlayer(value, this.state.cardTwoValue)
      this.setState(() => ({
        cardOneSelected: image,
        cardSelected: 'none',
        cardOneValue: value
      }))
    } else {
      updatePlayer(this.state.cardOneValue, value)
      this.setState(() => ({
        cardTwoSelected: image,
        cardSelected: 'none',
        cardTwoValue: value
      }))
    }
  }
  render() {
    const { cardOneHighLighted, cardTwoHighLighted, cardSelected, cardOneSelected, cardTwoSelected, } = this.state
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={this.props.player === 'one' ? (Platform.OS === 'web' ? styles.containerOne : styles.containerOneIos) : (Platform.OS === 'web' ? styles.containerTwo : styles.containerTwoIos)}>
          <TouchableWithoutFeedback onPress={this.cardOneSelected}>
            {cardOneSelected === null
              ? <View style={Platform.OS === 'web' ? (cardOneHighLighted ? styles.cardHighlighted : styles.cardUnhighlighted) : (cardOneHighLighted ? styles.cardHighlightedIos : styles.cardUnhighlightedIos)} />
              : <Image
                source={cardOneSelected}
                alt="info"
                style={Platform.OS === 'web' ? { height: 100, width: 71, borderRadius: 8, borderWidth: 2, borderColor: 'black', marginHorizontal: 5 } : { height: 50, width: 36.5, borderWidth: 1, borderColor: 'black', marginHorizontal: 2 }} />
            }
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.cardTwoSelected}>
            {cardTwoSelected === null
              ? <View style={Platform.OS === 'web' ? (cardTwoHighLighted ? styles.cardHighlighted : styles.cardUnhighlighted) : (cardTwoHighLighted ? styles.cardHighlightedIos : styles.cardUnhighlightedIos)} />
              : <Image
                source={cardTwoSelected}
                alt="info"
                style={Platform.OS === 'web' ? { height: 100, width: 71, borderRadius: 8, borderWidth: 2, borderColor: 'black', marginHorizontal: 5 } : { height: 50, width: 36.5, borderWidth: 1, borderColor: 'black', marginHorizontal: 2 }} />
            }
          </TouchableWithoutFeedback>
        </View>
        {cardSelected !== 'none'
          ? <EquitoolCardSelector selectCard={this.selectCard} />
          : <View></View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerOne: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 50
  },
  containerTwo: {
    flexDirection: 'row-reverse',
    marginTop: 20,
    marginRight: 50
  },
  containerOneIos: {
    flexDirection: 'row',
    marginTop: 20,
  },
  containerTwoIos: {
    flexDirection: 'row-reverse',
    marginTop: 20,
  },
  cardHighlighted: {
    height: 100,
    width: 71,
    borderWidth: 2,
    borderColor: '#3498db',
    borderWidth: 3,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "#DDDDDD",
  },
  cardUnhighlighted: {
    height: 100,
    width: 71,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 8,
    marginHorizontal: 5,
  },
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
    backgroundColor: 'black',
    marginHorizontal: 5
  },
  cardHighlightedIos: {
    height: 50,
    width: 36.5,
    borderWidth: 1,
    borderColor: '#3498db',
    marginHorizontal: 5,
    backgroundColor: "#DDDDDD",
  },
  cardUnhighlightedIos: {
    height: 50,
    width: 36.5,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 5,
  },
  selectedCardIos: {
    height: 50,
    width: 36.5,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 5
  },
  blackedOutIos: {
    height: 50,
    width: 36.5,
    borderWidth: 1,
    backgroundColor: 'black',
    marginHorizontal: 5
  }
})
export default EquitoolPlayerCards
