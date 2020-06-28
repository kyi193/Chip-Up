import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { handChart, ranges } from '../utils/helpers'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

class RangeChart extends Component {
  render() {
    const { param, state } = this.props
    const range = ranges[param]
    const position = state.chipUp.position
    const bigBlind = state.chipUp.bigBlind
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Header
          leftComponent={<Feather name="menu" size={30} color="orange" />}
          centerComponent={{ text: 'Chip Up', style: { color: 'gold', fontSize: 24 } }}
          rightComponent={<Entypo name="hair-cross" size={30}
            color={'orange'} />}
          containerStyle={{
            backgroundColor: 'black',
            justifyContent: 'space-around',
            borderBottomColor: 'orange',
            borderBottomWidth: '3',
          }} />
        <View style={styles.container}>
          {handChart.map((row) => (
            row.map((hand) => (
              range.includes(hand)
                ? <View style={(Platform.OS === 'ios' || Platform.OS === 'android')
                  ? styles.highlightedios
                  : styles.highlightedweb} key={hand}>
                  <Text style={{ color: 'white', fontSize: 12, padding: 2, textAlign: 'center' }}>{hand}</Text>
                </View>
                : <View style={(Platform.OS === 'ios' || Platform.OS === 'android')
                  ? styles.unhighlightedios
                  : styles.unhighlightedweb} key={hand}>
                  <Text style={{ color: 'white', fontSize: 12, padding: 2, textAlign: 'center' }}>{hand}</Text>
                </View>
            ))
          ))}
        </View>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, color: 'black', backgroundColor: 'white', borderColor: 'orange', borderWidth: 4, padding: 10 }}>You can shove these hands from the {position} position for {bigBlind} big blinds</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 3,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap'
  },
  highlightedios: {
    height: 28.83,
    width: 28.83,
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
  },
  unhighlightedios: {
    height: 28.83,
    width: 28.83,
    backgroundColor: 'gray',
    borderColor: 'black',
    borderWidth: 1,
  },
  highlightedweb: {
    height: 50,
    width: 50,
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
  },
  unhighlightedweb: {
    height: 50,
    width: 50,
    backgroundColor: 'gray',
    borderColor: 'black',
    borderWidth: 1,
  },
  title: {
    marginTop: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 300,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderRadius: 10,
    borderRightWidth: 4,
    borderTopWidth: 4,
    padding: 10,
  }
})

function mapStateToProps(state) {
  return {
    state,
    param: state.chipUp.range
  }
}
export default connect(mapStateToProps)(RangeChart)
