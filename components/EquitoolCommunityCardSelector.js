import React, { Component } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Image, Platform } from 'react-native'
import EquitoolCardSelector from './EquitoolCardSelector'

class EquitoolCommunityCardSelector extends Component {
  state = {
    flopOneSelected: null,
    flopTwoSelected: null,
    flopThreeSelected: null,
    turnSelected: null,
    riverSelected: null,
    cardSelected: 'none',
    flopOneValue: 'empty',
    flopTwoValue: 'empty',
    flopThreeValue: 'empty',
    turnValue: 'empty',
  }
  selectCard = (card) => {
    const image = card.imagePath;
    let value = card.name;

    const { cardSelected } = this.state
    const { updateCommunity } = this.props

    if (cardSelected === 'flopOne') {
      updateCommunity(value, this.state.flopTwoValue, this.state.flopThreeValue, this.state.turnValue)
      this.setState(() => ({
        flopOneSelected: image,
        cardSelected: 'none',
        flopOneValue: value
      }))
    } else if (cardSelected === 'flopTwo') {
      updateCommunity(this.state.flopOneValue, value, this.state.flopThreeValue, this.state.turnValue)
      this.setState(() => ({
        flopTwoSelected: image,
        cardSelected: 'none',
        flopTwoValue: value
      }))
    } else if (cardSelected === 'flopThree') {
      updateCommunity(this.state.flopOneValue, this.state.flopTwoValue, value, this.state.turnValue)
      this.setState(() => ({
        flopThreeSelected: image,
        cardSelected: 'none',
        flopThreeValue: value
      }))
    } else if (cardSelected === 'turn') {
      updateCommunity(this.state.flopOneValue, this.state.flopTwoValue, this.state.flopThreeValue, value)
      this.setState(() => ({
        turnSelected: image,
        cardSelected: 'none',
        turnValue: value
      }))
    }
  }
  render() {
    const { flopOneSelected, flopTwoSelected, flopThreeSelected, turnSelected } = this.state
    const values = ['flopOne', 'flopTwo', 'flopThree', 'turn']
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={Platform.OS === 'web' ? styles.containerOne : styles.containerOneIos}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableWithoutFeedback onPress={!values.includes(this.state.cardSelected) ? (() => this.setState(() => ({ cardSelected: 'flopOne' }))) : (() => this.setState(() => ({ cardSelected: 'none' })))}>
              {flopOneSelected === null
                ? <View style={Platform.OS === 'web' ? styles.cardUnhighlighted : styles.cardUnhighlightedIos} />
                : <Image
                  source={flopOneSelected}
                  alt="info"
                  style={Platform.OS === 'web' ? { height: 100, width: 71, borderRadius: 8, borderWidth: 2, borderColor: 'gray', marginHorizontal: 5 } : { height: 50, width: 36.5, borderWidth: 1, borderColor: 'gray', marginHorizontal: 2 }} />
              }
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={!values.includes(this.state.cardSelected) ? (() => this.setState(() => ({ cardSelected: 'flopTwo' }))) : (() => this.setState(() => ({ cardSelected: 'none' })))}>
              {flopTwoSelected === null
                ? <View style={Platform.OS === 'web' ? styles.cardUnhighlighted : styles.cardUnhighlightedIos} />
                : <Image
                  source={flopTwoSelected}
                  alt="info"
                  style={Platform.OS === 'web' ? { height: 100, width: 71, borderRadius: 8, borderWidth: 2, borderColor: 'gray', marginHorizontal: 5 } : { height: 50, width: 36.5, borderWidth: 1, borderColor: 'gray', marginHorizontal: 2 }} />
              }
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={!values.includes(this.state.cardSelected) ? (() => this.setState(() => ({ cardSelected: 'flopThree' }))) : (() => this.setState(() => ({ cardSelected: 'none' })))}>
              {flopThreeSelected === null
                ? <View style={Platform.OS === 'web' ? styles.cardUnhighlighted : styles.cardUnhighlightedIos} />
                : <Image
                  source={flopThreeSelected}
                  alt="info"
                  style={Platform.OS === 'web' ? { height: 100, width: 71, borderRadius: 8, borderWidth: 2, borderColor: 'gray', marginHorizontal: 5 } : { height: 50, width: 36.5, borderWidth: 1, borderColor: 'gray', marginHorizontal: 2 }} />
              }
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={!values.includes(this.state.cardSelected) ? (() => this.setState(() => ({ cardSelected: 'turn' }))) : (() => this.setState(() => ({ cardSelected: 'none' })))}>
            {turnSelected === null
              ? <View style={Platform.OS === 'web' ? styles.cardUnhighlighted : styles.cardUnhighlightedIos} />
              : <Image
                source={turnSelected}
                alt="info"
                style={Platform.OS === 'web' ? { height: 100, width: 71, borderRadius: 8, borderWidth: 2, borderColor: 'gray', marginHorizontal: 5 } : { height: 50, width: 36.5, borderWidth: 1, borderColor: 'gray', marginHorizontal: 2 }} />
            }
          </TouchableWithoutFeedback>
        </View>
        {this.state.cardSelected !== 'none' ? <EquitoolCardSelector selectCard={this.selectCard} /> : <View></View>}

      </View >
    )
  }
}
const styles = StyleSheet.create({
  containerOne: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 50,
    marginBottom: 10
  },
  containerOneIos: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
  cardUnhighlighted: {
    height: 100,
    width: 71,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cardUnhighlightedIos: {
    height: 50,
    width: 36.5,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 2,
  },
})
export default EquitoolCommunityCardSelector
