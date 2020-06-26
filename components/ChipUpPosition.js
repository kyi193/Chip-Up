import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
const positions = ['UTG', 'UTG+1', 'UTG+2', 'Lojack', 'Hijack', 'Cutoff', 'Button', 'SB', 'BB']
class ChipUpPosition extends Component {
  state = {
    position: 'UTG'
  }

  positionSelection = key => (event) => {
    this.props.updatePosition(key)
    this.setState(() => ({
      position: key
    }))
  }
  render() {
    const { position } = this.state
    return (
      <View>
        <Text>Position</Text>
        <View style={styles.positions}>
          {positions.map((number) => (
            number === position
              ? <TouchableOpacity
                key={number}
                style={styles.playerNumBoxSelected}
                onPress={this.positionSelection(number)}>
                <Text style={styles.playerNum}>{number}</Text>
              </TouchableOpacity>
              : <TouchableOpacity
                key={number}
                style={styles.playerNumBox}
                onPress={this.positionSelection(number)}>
                <Text style={styles.playerNum}>{number}</Text>
              </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }
}
export default ChipUpPosition

const styles = StyleSheet.create({
  positions: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: "row",
    justifyContent: 'flex-start'
  },
  playerNumBox: {
    height: 72,
    width: 72,
    borderColor: '#A9A9A9',
    borderWidth: 2,
    marginLeft: .5,
    borderRadius: 10,
    backgroundColor: '#A9A9A9'
  },
  playerNumBoxSelected: {
    height: 72,
    width: 72,
    borderColor: 'orange',
    borderWidth: 2,
    marginLeft: .5,
    backgroundColor: 'orange',
    borderRadius: 10
  },
  playerNum: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  }
})
