import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
const positions = [['UTG', 'utg'],
['+1', 'utgOne'],
['+2', 'utgTwo'],
['MP', 'mp'],
['LJ', 'lj'],
['HJ', 'hj'],
['CO', 'co'],
['BTN', 'btn'],
['SB', 'sb']
]
class ChipUpPosition extends Component {
  state = {
    position: 'utg'
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
        <View style={(Platform.OS === 'ios' || Platform.OS === 'android') ? styles.bannerIos : styles.bannerWeb}>
          <Text style={{ fontSize: 25, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Position</Text>
        </View>
        <View style={styles.positions}>
          {positions.map((number) => (
            number[1] === position
              ? <TouchableOpacity
                key={number[1]}
                style={styles.playerNumBoxSelected}
                onPress={this.positionSelection(number[1])}>
                <Text style={styles.playerNum}>{number[0]}</Text>
              </TouchableOpacity>
              : <TouchableOpacity
                key={number[1]}
                style={styles.playerNumBox}
                onPress={this.positionSelection(number[1])}>
                <Text style={styles.playerNum}>{number[0]}</Text>
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
    flexWrap: 'wrap',
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginTop: 10,
    alignSelf: 'center',
  },
  playerNumBox: {
    height: 39,
    width: 39,
    borderColor: '#A9A9A9',
    borderWidth: 2,
    marginLeft: 2,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#A9A9A9',
    justifyContent: 'center',
    alignContent: 'center',
  },
  playerNumBoxSelected: {
    height: 39,
    width: 39,
    borderColor: 'orange',
    borderWidth: 2,
    marginLeft: 2,
    marginBottom: 5,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  playerNum: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
  },
  bannerWeb: {
    borderColor: 'gray',
    borderWidth: 2,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignContent: 'center',
    width: 450,
    alignSelf: 'center'
  },
  bannerIos: {
    borderTopColor: 'gray',
    borderBottomColor: 'gray',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignContent: 'center',
  }
})
