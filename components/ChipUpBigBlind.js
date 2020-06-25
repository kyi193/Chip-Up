import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';

const bbAmounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

class ChipUpBigBlind extends Component {
  state = {
    bigBlind: 10
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Feather name="minus" size={24} color="black" />
        </TouchableOpacity>
        <View>
          <Text>Big Blind</Text>
        </View>
        <TouchableOpacity>
          <Feather name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
})
export default ChipUpBigBlind
