import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Header } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ChipUpPlayerNum from './ChipUpPlayerNum'
import ChipUpAnteAmt from './ChipUpAnteAmt'
import ChipUpBigBlind from './ChipUpBigBlind'
import ChipUpPosition from './ChipUpPosition'

class ChipUpMainMenu extends Component {
  state = {
    numOfPlayers: 9,
    ante: 15,
    bigBlind: 10,
    position: 'UTG'
  }

  updateNumOfPlayers = (numOfPlayers) => {
    this.setState(() => ({
      numOfPlayers
    }))
  }
  updateAnte = (ante) => {
    this.setState(() => ({
      ante
    }))
  }
  updateBigBlind = (bigBlind) => {
    this.setState(() => ({
      bigBlind
    }))
  }
  updatePosition = (position) => {
    this.setState(() => ({
      position
    }))
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={<Feather name="menu" size={30} color="orange" />}
          centerComponent={{ text: 'Chip Up', style: { color: 'black', fontSize: 24 } }}
          rightComponent={<Entypo name="hair-cross" size={30}
            color={'orange'} />}
          containerStyle={{
            backgroundColor: 'white',
            justifyContent: 'space-around',
          }} />
        <ChipUpPlayerNum updateNumOfPlayers={this.updateNumOfPlayers} />
        <ChipUpAnteAmt updateAnte={this.updateAnte} />
        <ChipUpBigBlind updateBigBlind={this.updateBigBlind} />
        <ChipUpPosition updatePosition={this.updatePosition} />
      </View>
    )
  }
}

export default ChipUpMainMenu

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
