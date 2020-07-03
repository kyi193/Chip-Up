import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
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
  selectCard = (image) => {
    let value = image.substring(14, 16)
    // value = value[0] + value[1].toLowerCase()
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
        <View style={styles.containerOne}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableWithoutFeedback onPress={!values.includes(this.state.cardSelected) ? (() => this.setState(() => ({ cardSelected: 'flopOne' }))) : (() => this.setState(() => ({ cardSelected: 'none' })))}>
              {flopOneSelected === null
                ? <View style={styles.cardUnhighlighted}>
                  <Text>Flop 1</Text>
                </View>
                : <Image
                  source={flopOneSelected}
                  alt="info"
                  style={{ height: 100, width: 71, borderRadius: 8, borderWidth: 2, borderColor: 'black', marginHorizontal: 5 }} />
              }
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={!values.includes(this.state.cardSelected) ? (() => this.setState(() => ({ cardSelected: 'flopTwo' }))) : (() => this.setState(() => ({ cardSelected: 'none' })))}>
              {flopTwoSelected === null
                ? <View style={styles.cardUnhighlighted}>
                  <Text>Flop 2</Text>
                </View>
                : <Image
                  source={flopTwoSelected}
                  alt="info"
                  style={{ height: 100, width: 71, borderRadius: 8, borderWidth: 2, borderColor: 'black', marginHorizontal: 5 }} />
              }
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={!values.includes(this.state.cardSelected) ? (() => this.setState(() => ({ cardSelected: 'flopThree' }))) : (() => this.setState(() => ({ cardSelected: 'none' })))}>
              {flopThreeSelected === null
                ? <View style={styles.cardUnhighlighted}>
                  <Text>Flop 3</Text>
                </View>
                : <Image
                  source={flopThreeSelected}
                  alt="info"
                  style={{ height: 100, width: 71, borderRadius: 8, borderWidth: 2, borderColor: 'black', marginHorizontal: 5 }} />
              }
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={!values.includes(this.state.cardSelected) ? (() => this.setState(() => ({ cardSelected: 'turn' }))) : (() => this.setState(() => ({ cardSelected: 'none' })))}>
            {flopTwoSelected === null
              ? <View style={styles.cardUnhighlighted}>
                <Text>Turn</Text>
              </View>
              : <Image
                source={turnSelected}
                alt="info"
                style={{ height: 100, width: 71, borderRadius: 8, borderWidth: 2, borderColor: 'black', marginHorizontal: 5 }} />
            }
          </TouchableWithoutFeedback>
          <View>
            <View style={styles.cardUnhighlighted}>
              <Text>River</Text>
            </View>
          </View>
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
  cardUnhighlighted: {
    height: 100,
    width: 71,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 8,
    marginHorizontal: 5,
  },
})
export default EquitoolCommunityCardSelector
