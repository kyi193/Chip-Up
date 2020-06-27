import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
const anteAmounts = [15, 12.5, 10, 0]
class ChipUpAnteAmt extends Component {
  state = {
    anteNum: 15
  }

  anteAmtSelection = key => (event) => {
    this.props.updateAnte(key)
    this.setState(() => ({
      anteNum: key
    }))
  }
  render() {
    const { anteNum } = this.state
    return (
      <View>
        <Text>Ante Amount</Text>
        <View style={styles.anteAmounts}>
          {anteAmounts.map((number) => (
            number === anteNum
              ? <TouchableOpacity
                key={number}
                style={styles.playerNumBoxSelected}
                onPress={this.anteAmtSelection(number)}>
                <Text style={styles.playerNum}>{number}%</Text>
              </TouchableOpacity>
              : <TouchableOpacity
                key={number}
                style={styles.playerNumBox}
                onPress={this.anteAmtSelection(number)}>
                <Text style={styles.playerNum}>{number}%</Text>
              </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }
}
export default ChipUpAnteAmt

const styles = StyleSheet.create({
  anteAmounts: {
    flexDirection: "row",
    justifyContent: 'flex-start'
  },
  playerNumBox: {
    height: 60,
    width: 60,
    borderColor: '#A9A9A9',
    borderWidth: 2,
    marginLeft: 1.5,
    borderRadius: 10,
    backgroundColor: '#A9A9A9'
  },
  playerNumBoxSelected: {
    height: 60,
    width: 60,
    borderColor: 'orange',
    borderWidth: 2,
    marginLeft: 1.5,
    backgroundColor: 'orange',
    borderRadius: 10,
  },
  playerNum: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
})
