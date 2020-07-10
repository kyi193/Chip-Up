import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={{ justifyContent: 'center', alignItems: 'center', height: 50, width: 75, borderWidth: 1, borderColor: 'black' }}
      onPress={onPress}>
      <Text>Ask</Text>
    </TouchableOpacity>
  )
}
class MagicEightBallMainMenu extends Component {
  state = {
    textInput: ''
  }
  onChangeText = (text) => {
    this.setState(() => ({
      textInput: text
    }))
  }

  submitQuestion = () => {
    this.setState(() => ({
      textInput: ''
    }))
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text>Please ask a yes or no question</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.onChangeText(text)}
              value={this.state.textInput}
            />
            <SubmitBtn onPress={this.submitQuestion} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10
  }
})
export default MagicEightBallMainMenu
