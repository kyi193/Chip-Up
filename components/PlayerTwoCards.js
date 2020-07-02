import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
let listOfCards = []
class PlayerTwoCards extends Component {
  state = {
    cardOneHighLighted: false,
    cardTwoHighLighted: false,
    cardSelected: 'none'
  }
  importAll(r) {
    return r.keys().map(r);
  }
  componentWillMount() {
    listOfCards = this.importAll(require.context('../assets/images/cards', false, /\.(png|jpe?g|svg)$/));
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
        cardSelected: 'one'
      }))
    }
  }
  cardTwoSelected = () => {
    const { cardOneHighLighted, cardTwoHighLighted } = this.state
    if (cardTwoHighLighted && !cardOneHighLighted) {
      this.setState(() => ({
        cardOneHighLighted: false,
        cardTwoHighLighted: false,
        cardSelected: 'none'
      }))
    } else {
      this.setState(() => ({
        cardTwoHighLighted: !cardTwoHighLighted,
        cardOneHighLighted: (cardTwoHighLighted === cardOneHighLighted) ? cardOneHighLighted : !cardOneHighLighted,
        cardSelected: 'two'
      }))
    }
  }
  render() {
    const { cardOneHighLighted, cardTwoHighLighted, cardSelected } = this.state
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.cardOneSelected}>
          <View style={cardOneHighLighted ? styles.cardHighlighted : styles.cardUnhighlighted}>
            <Text>Card 1</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.cardTwoSelected}>
          <View style={cardTwoHighLighted ? styles.cardHighlighted : styles.cardUnhighlighted}>
            <Text>Card 2</Text>
          </View>
        </TouchableWithoutFeedback>
        {cardSelected !== 'none'
          ? <View style={{ width: 1000, height: 80, flexDirection: 'row', flexWrap: 'wrap', }}>
            {listOfCards.map(
              (image, index) => <TouchableWithoutFeedback key={index}>
                <Image key={index} source={image} alt="info" style={{ height: 100, width: 71, margin: 2, borderRadius: 8, borderWidth: 2, borderColor: 'black' }} />
              </TouchableWithoutFeedback>
            )}
          </View>
          : <View></View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardHighlighted: {
    height: 100,
    width: 71,
    borderWidth: 2,
    borderColor: 'black',
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
  }
})
export default PlayerTwoCards
