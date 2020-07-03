import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { Header } from 'react-native-elements'
import { Entypo, Ionicons } from '@expo/vector-icons';
import EquitoolPlayerCards from './EquitoolPlayerCards'

class EquitoolMainMenu extends Component {
  state = {
    playerOneCardA: '',
    playerOneCardB: '',
    playerTwoCardA: '',
    playerTwoCardB: '',
  }

  updatePlayerOneCards = (cardA, cardB) => {
    this.setState(() => ({
      playerOneCardA: cardA,
      playerOneCardB: cardB
    }))
  }
  updatePlayerTwoCards = (cardA, cardB) => {
    this.setState(() => ({
      playerTwoCardA: cardA,
      playerTwoCardB: cardB
    }))
  }
  render() {
    console.log('PLAYER ONE:', this.state.playerOneCardA, this.state.playerOneCardB)
    console.log('PLAYER TWO:', this.state.playerTwoCardA, this.state.playerTwoCardB)
    return (
      <View style={styles.container}>
        <Header
          leftComponent={<Ionicons style={(Platform.OS === 'ios' || Platform.OS === 'android' ? {} : { paddingLeft: 25 })} name="md-arrow-round-back" size={30} color="#3498db" onPress={() => this.props.navigation.goBack(null)} />}
          centerComponent={{ text: 'Equitools', style: { color: '#3498db', fontSize: (Platform.OS === 'ios' || Platform.OS === 'android') ? 24 : 40, fontWeight: 'bold', } }}
          rightComponent={<Entypo style={(Platform.OS === 'ios' || Platform.OS === 'android' ? {} : { paddingRight: 25 })} name="hair-cross" size={30}
            color={'#3498db'} />}
          containerStyle={(Platform.OS === 'ios' || Platform.OS === 'android')
            ? {
              backgroundColor: 'black',
              justifyContent: 'space-around',
              borderBottomColor: 'silver',
              borderBottomWidth: '3',
            } : {
              backgroundColor: 'black',
              justifyContent: 'space-around',
              borderBottomColor: 'silver',
              borderBottomWidth: '3',
              height: 100,
              borderBottomWidth: 4
            }} />
        <EquitoolPlayerCards updatePlayer={this.updatePlayerOneCards} />
        <EquitoolPlayerCards updatePlayer={this.updatePlayerTwoCards} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  }
})
export default EquitoolMainMenu
