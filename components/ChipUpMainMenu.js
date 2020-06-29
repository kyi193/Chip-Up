import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, ImageBackground, TouchableOpacity, Platform } from 'react-native'
import { Header } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import ChipUpPlayerNum from './ChipUpPlayerNum'
import ChipUpAnteAmt from './ChipUpAnteAmt'
import ChipUpBigBlind from './ChipUpBigBlind'
import ChipUpPosition from './ChipUpPosition'
import RangeChart from './RangeChart'
import { connect } from 'react-redux'
import { submitParameters } from '../actions'
import { Ionicons } from '@expo/vector-icons';

const backgroundImage = (Platform.OS === 'ios' || Platform.OS === 'android') ? { uri: "https://i.imgur.com/BrFGUhA.jpg" } : { uri: "https://i.imgur.com/qDG7eHT.jpg" };

function SubmitBtn({ onPress }) {
  return (
    <View>
      <TouchableOpacity
        style={(Platform.OS === 'ios' || Platform.OS === 'android') ? styles.submitBtn : styles.submitBtnWeb}
        onPress={onPress}>
        <Text style={(Platform.OS === 'ios' || Platform.OS === 'android') ? styles.submitBtnText : styles.submitBtnTextWeb}>Calculate</Text>
      </TouchableOpacity>
    </View>
  )
}

class ChipUpMainMenu extends Component {
  state = {
    numOfPlayers: 9,
    ante: 0,
    bigBlind: 20,
    position: 'utg'
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

  calculateRange = () => {
    const { position, bigBlind, ante } = this.state
    const { dispatch } = this.props
    dispatch(submitParameters(position, bigBlind, ante))
    this.props.navigation.navigate('Range Chart')
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <Header
            leftComponent={<Ionicons name="md-arrow-round-back" size={30} color="orange" onPress={() => this.props.navigation.goBack(null)} />}
            centerComponent={{ text: 'Chip Up', style: { color: 'gold', fontSize: 24, } }}
            rightComponent={<Entypo name="hair-cross" size={30}
              color={'orange'} />}
            containerStyle={{
              backgroundColor: 'black',
              justifyContent: 'space-around',
              borderBottomColor: 'orange',
              borderBottomWidth: '3',
            }} />
          <ChipUpPlayerNum updateNumOfPlayers={this.updateNumOfPlayers} />
          <ChipUpAnteAmt updateAnte={this.updateAnte} />
          <ChipUpPosition updatePosition={this.updatePosition} />
          <ChipUpBigBlind updateBigBlind={this.updateBigBlind} />
          {/* <RangeChart /> */}
          <SubmitBtn onPress={this.calculateRange} />
        </ImageBackground>
      </View>
    )
  }
}

export default connect()(ChipUpMainMenu)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  submitBtn: {
    flexDirection: 'column-reverse',
    backgroundColor: 'orange',
    borderColor: 'gray',
    borderWidth: 3,
    padding: 10,
    borderRadius: 7,
    height: 60,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  submitBtnText: {
    flex: 1,
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  submitBtnWeb: {
    flexDirection: 'column-reverse',
    backgroundColor: 'orange',
    borderColor: 'gray',
    borderWidth: 3,
    padding: 10,
    borderRadius: 7,
    height: 60,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    width: 400,
  },
  submitBtnTextWeb: {
    flex: 1,
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'
  },
})
