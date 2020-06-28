import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
const anteAmounts = [[12.5, 125], [10, 10], [0, 0]]
class ChipUpAnteAmt extends Component {
  state = {
    anteNum: 0
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
        <View style={{ borderColor: 'gray', borderTopWidth: 2, borderBottomWidth: 2, height: 50, backgroundColor: 'black', justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{ fontSize: 25, color: 'white', textAlign: 'center' }}>Antes</Text>
        </View>
        <View style={styles.anteAmounts}>
          {anteAmounts.map((number) => (
            number[1] === anteNum
              ? <TouchableOpacity
                key={number[1]}
                style={styles.playerNumBoxSelected}
                onPress={this.anteAmtSelection(number[1])}>
                <Text style={styles.playerNum}>{number[0]}%</Text>
              </TouchableOpacity>
              : <TouchableOpacity
                key={number[1]}
                style={styles.playerNumBox}
                onPress={this.anteAmtSelection(number[1])}>
                <Text style={styles.playerNum}>{number[0]}%</Text>
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
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
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
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
})
