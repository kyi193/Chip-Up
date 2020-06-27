import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { handChart } from '../utils/helpers'
class RangeChart extends Component {
  render() {
    return (
      <View style={styles.container}>
        {handChart.map((row) => (
          row.map((hand) => (
            <View style={styles.rangeChart} key={hand}>
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
  rangeChart: {
    height: 28.5,
    width: 28.5,
    backgroundColor: 'gray',
    borderColor: 'black',
    borderWidth: 1,
  }
})

export default RangeChart
