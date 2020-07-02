import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
class EquitoolMainMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Equitool Main Menu</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default EquitoolMainMenu
