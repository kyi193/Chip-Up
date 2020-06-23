import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
class MainMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the main menu</Text>
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
export default MainMenu
