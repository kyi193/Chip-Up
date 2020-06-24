import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ChipUpPlayerNum from './ChipUpPlayerNum'

class ChipUpMainMenu extends Component {
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
        <ChipUpPlayerNum />
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
