import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import { MagicEightBall } from '../../utils/magicEightBall'
import FadeInView from 'react-native-fade-in-view';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={{ justifyContent: 'center', alignItems: 'center', height: 50, width: 75, borderWidth: 1, borderColor: 'black' }}
      onPress={onPress}>
      <Text>Ask</Text>
    </TouchableOpacity>
  )
}
function ResetBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={{ justifyContent: 'center', alignItems: 'center', height: 50, width: 75, borderWidth: 1, borderColor: 'black' }}
      onPress={onPress}>
      <Text>Reset</Text>
    </TouchableOpacity>
  )
}
class MagicEightBallMainMenu extends Component {
  state = {
    textInput: '',
    answer: null
  }
  onChangeText = (text) => {
    this.setState(() => ({
      textInput: text
    }))
  }

  submitQuestion = () => {
    Keyboard.dismiss()
    const magic8Ball = new MagicEightBall()
    const answer = magic8Ball.getResponse().answer
    this.setState(() => ({
      answer,
    }))
  }
  reset = () => {
    Keyboard.dismiss()
    this.setState(() => ({
      textInput: '',
      answer: null
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
            <View style={{ flexDirection: 'row' }}>
              <SubmitBtn onPress={this.submitQuestion} />
              <ResetBtn onPress={this.reset} />
            </View>
            {this.state.answer &&
              <FadeInView
                duration={750}
                style={{ alignItems: 'center' }}
              >
                <Text>{this.state.answer}</Text>
              </FadeInView>}
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
