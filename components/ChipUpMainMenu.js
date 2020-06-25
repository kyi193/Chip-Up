import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ChipUpPlayerNum from './ChipUpPlayerNum'
import ChipUpAnteAmt from './ChipUpAnteAmt'
import ChipUpBigBlind from './ChipUpBigBlind'

class ChipUpMainMenu extends Component {
  state = {
    numOfPlayers: 9,
    ante: 15,
    bigBlind: 10,
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
  render() {
    console.log('Num', this.state.numOfPlayers)
    console.log('ANTE', this.state.ante)
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
        <ChipUpBigBlind />
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
