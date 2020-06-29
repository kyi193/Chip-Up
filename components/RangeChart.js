import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { handChart, ranges } from '../utils/helpers'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';



class RangeChart extends Component {
  getCombination = (range) => {
    let combinations = 0
    for (let i = 0; i < range.length; i++) {
      if (range[i].length === 2) {
        combinations += 6
      } else {
        if (range[i][2] === 'o') {
          combinations += 12
        } else {
          combinations += 4
        }
      }
    }
    return combinations
  }
  render() {
    const { param, state } = this.props
    const range = ranges[param]
    const position = state.chipUp.position
    let pos = ''
    const bigBlind = state.chipUp.bigBlind
    const combinations = ((this.getCombination(range) / 1326) * 100).toFixed(2)
    if (position === 'utg') {
      pos = 'UTG'
    } else if (position === 'utgOne') {
      pos = 'UTG+1'
    } else if (position === 'utgTwo') {
      pos = 'UTG+2'
    } else if (position === 'mp') {
      pos = 'Middle Position'
    } else if (position === 'lj') {
      pos = 'Lojack'
    } else if (position === 'hj') {
      pos = 'Hijack'
    } else if (position === 'co') {
      pos = 'Cut Off'
    } else if (position === 'btn') {
      pos = 'Button'
    } else if (position === 'sb') {
      pos = 'Small Blind'
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Header
          leftComponent={<Ionicons name="md-arrow-round-back" size={30} color="orange" onPress={() => this.props.navigation.goBack(null)} />}
          centerComponent={{ text: `${pos} - ${bigBlind} BB`, style: { color: 'gold', fontSize: (Platform.OS === 'ios' || Platform.OS === 'android') ? 24 : 40, fontWeight: 'bold' } }}
          rightComponent={<Entypo name="hair-cross" size={30}
            color={'orange'} />}
          containerStyle={(Platform.OS === 'ios' || Platform.OS === 'android')
            ? {
              backgroundColor: 'black',
              justifyContent: 'space-around',
              borderBottomColor: 'orange',
              borderBottomWidth: '3',
            } : {
              backgroundColor: 'black',
              justifyContent: 'space-around',
              borderBottomColor: 'orange',
              borderBottomWidth: '3',
              height: 100,
              borderBottomColor: 'orange',
              borderBottomWidth: 4
            }} />
        <View style={(Platform.OS === 'ios' || Platform.OS === 'android') ? styles.containerIos : styles.containerWeb}>
          {handChart.map((row) => (
            row.map((hand) => (
              range.includes(hand)
                ? <View style={(Platform.OS === 'ios' || Platform.OS === 'android')
                  ? styles.highlightedios
                  : styles.highlightedweb} key={hand}>
                  <Text style={(Platform.OS === 'ios' || Platform.OS === 'android') ? styles.handIos : styles.handWeb}>{hand}</Text>
                </View>
                : <View style={(Platform.OS === 'ios' || Platform.OS === 'android')
                  ? styles.unhighlightedios
                  : styles.unhighlightedweb} key={hand}>
                  <Text style={(Platform.OS === 'ios' || Platform.OS === 'android') ? styles.handIos : styles.handWeb}>{hand}</Text>
                </View>
            ))
          ))}
        </View>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, color: 'white', backgroundColor: 'gray', borderColor: 'orange', borderWidth: 4, padding: 10 }}>You can shove these hands from the {pos} position for {bigBlind} big blinds ({combinations}% of hands)</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerIos: {
    borderTopWidth: 3,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    alignSelf: 'center',
    maxWidth: 380
  },
  containerWeb: {
    marginTop: 10,
    borderTopWidth: 3,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    alignSelf: 'center',
    maxWidth: 655
  },
  highlightedios: {
    height: 28.83,
    width: 28.83,
    backgroundColor: 'orange',
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
    backgroundColor: 'orange',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  unhighlightedweb: {
    height: 50,
    width: 50,
    backgroundColor: 'gray',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  handWeb: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  handIos: {
    color: 'white',
    fontSize: 12,
    padding: 2,
    textAlign: 'center'
  }
})

function mapStateToProps(state) {
  return {
    state,
    param: state.chipUp.range
  }
}
export default connect(mapStateToProps)(RangeChart)
