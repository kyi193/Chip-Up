import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native'
import { Header } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ChipUpPlayerNum from './ChipUpPlayerNum'
import ChipUpAnteAmt from './ChipUpAnteAmt'
import ChipUpBigBlind from './ChipUpBigBlind'
import ChipUpPosition from './ChipUpPosition'
import RangeChart from './RangeChart'

const backgroundImage = { uri: "https://i.imgur.com/BrFGUhA.jpg" };

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
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
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
          {/* <RangeChart /> */}
        </ImageBackground>
      </View>
    )
  }
}

export default ChipUpMainMenu

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  }
})
