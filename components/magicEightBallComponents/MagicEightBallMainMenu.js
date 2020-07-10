import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
class MagicEightBallMainMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Magic Eight Ball</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default MagicEightBallMainMenu
