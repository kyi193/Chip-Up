import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { Header } from 'react-native-elements'
import { Entypo, Ionicons } from '@expo/vector-icons';
import EquitoolPlayerCards from './EquitoolPlayerCards'
import { connect } from 'react-redux'
import { saveEquitoolParameters } from '../actions'

class EquitoolMainMenu extends Component {
  state = {
    playerOneCardA: 'empty',
    playerOneCardB: 'empty',
    playerTwoCardA: 'empty',
    playerTwoCardB: 'empty',
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
  componentDidUpdate = () => {
    const { dispatch } = this.props
    const { playerOneCardA, playerOneCardB, playerTwoCardA, playerTwoCardB } = this.state
    dispatch(saveEquitoolParameters(playerOneCardA, playerOneCardB, playerTwoCardA, playerTwoCardB))
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(saveEquitoolParameters('empty', 'empty', 'empty', 'empty'))
  }
  render() {
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <EquitoolPlayerCards updatePlayer={this.updatePlayerOneCards} player='one' />
          <EquitoolPlayerCards updatePlayer={this.updatePlayerTwoCards} player='two' />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  }
})
export default connect()(EquitoolMainMenu)
