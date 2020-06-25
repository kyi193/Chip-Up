import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
const numOfPlayers = [9, 8, 7, 6, 5, 4, 3, 2]
class ChipUpPlayerNum extends Component {
  state = {
    playerNum: 9
  }

  playerNumSelection = key => (event) => {
    this.setState(() => ({
      playerNum: key
    }))
  }
  render() {
    const { playerNum } = this.state
    return (
      <View>
        <Text>How many players?</Text>
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
    justifyContent: 'flex-start'
  },
  playerNumBox: {
    height: 45,
    width: 45,
    borderColor: 'orange',
    borderWidth: 2,
    marginLeft: .5,
  },
  playerNumBoxSelected: {
    height: 45,
    width: 45,
    borderColor: 'orange',
    borderWidth: 2,
    marginLeft: .5,
    backgroundColor: 'orange'
  },
  playerNum: {
    marginTop: 7,
    textAlign: 'center',
    fontSize: 20
  }
})
