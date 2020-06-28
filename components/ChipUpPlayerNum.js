import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
const numOfPlayers = [9, 8, 7, 6, 5, 4, 3, 2]
class ChipUpPlayerNum extends Component {
  state = {
    playerNum: 9
  }

  playerNumSelection = key => (event) => {
    this.props.updateNumOfPlayers(key)
    this.setState(() => ({
      playerNum: key
    }))
  }
  render() {
    const { playerNum } = this.state
    return (
      <View>
        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2, height: 50, backgroundColor: 'black', justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{ fontSize: 25, color: 'white', textAlign: 'center', }}>How many players?</Text>
        </View>
        <View style={styles.numOfPlayers}>
          {numOfPlayers.map((number) => (
            number === playerNum
              ? <TouchableOpacity
                key={number}
                style={styles.playerNumBoxSelected}
                onPress={this.playerNumSelection(number)}>
                <Text style={styles.playerNum}>{number}</Text>
              </TouchableOpacity>
              : <TouchableOpacity
                key={number}
                style={styles.playerNumBox}
                onPress={this.playerNumSelection(number)}>
                <Text style={styles.playerNum}>{number}</Text>
              </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }
}
export default ChipUpPlayerNum

const styles = StyleSheet.create({
  numOfPlayers: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 20,
  },
  playerNumBox: {
    height: 45,
    width: 45,
    borderColor: '#A9A9A9',
    borderWidth: 2,
    marginLeft: 1.5,
    borderRadius: 10,
    backgroundColor: '#A9A9A9'
  },
  playerNumBoxSelected: {
    height: 45,
    width: 45,
    borderColor: 'orange',
    borderWidth: 2,
    marginLeft: 1.5,
    backgroundColor: 'orange',
    borderRadius: 10,
    fontWeight: 'bold'
  },
  playerNum: {
    marginTop: 7,
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
})
