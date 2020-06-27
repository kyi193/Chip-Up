import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
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
              ? <View style={styles.highlighted} key={hand}>
                <Text style={{ color: 'white', fontSize: 12, padding: 2, textAlign: 'center' }}>{hand}</Text>
              </View>
              : <View style={styles.unhighlighted} key={hand}>
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
  highlighted: {
    height: 50,
    width: 50,
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
  },
  unhighlighted: {
    height: 50,
    width: 50,
    backgroundColor: 'gray',
    borderColor: 'black',
    borderWidth: 1,
  }
})

function mapStateToProps(state) {
  return {
    param: state.chipUp
  }
}
export default connect(mapStateToProps)(RangeChart)
