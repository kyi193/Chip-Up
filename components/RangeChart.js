import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { handChart, ranges } from '../utils/helpers'
import { connect } from 'react-redux'

class RangeChart extends Component {
  render() {
    const { param } = this.props
    const range = ranges[param]
    return (
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap'
  },
  highlightedios: {
    height: 28.5,
    width: 28.5,
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
  },
  unhighlightedios: {
    height: 28.5,
    width: 28.5,
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
})

function mapStateToProps(state) {
  return {
    param: state.chipUp
  }
}
export default connect(mapStateToProps)(RangeChart)
