import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import { MagicEightBall } from '../../utils/magicEightBall'
import FadeInView from 'react-native-fade-in-view';
import { ShakeEventExpo } from '../../utils/ShakeEventExpo'
function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.submit}
      onPress={onPress}>
      <Text style={{ color: 'white' }}>Ask</Text>
    </TouchableOpacity>
  )
}
function ResetBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.reset}
      onPress={onPress}>
      <Text style={{ color: 'white' }}>Reset</Text>
    </TouchableOpacity>
  )
}
class MagicEightBallMainMenu extends Component {
  state = {
    textInput: '',
    answer: null
  }
  async componentWillMount() {
    ShakeEventExpo.addListener(() => {
      Keyboard.dismiss()
      const magic8Ball = new MagicEightBall()
      const answer = magic8Ball.getResponse().answer
      this.setState(() => ({
        answer,
      }))
    });
  }

  componentWillUnmount() {
    ShakeEventExpo.removeListener();
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
        <FadeInView
          duration={750}
          style={{ alignItems: 'center' }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Text style={{ color: 'white' }}>Please ask a yes or no question</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={text => this.onChangeText(text)}
                value={this.state.textInput}
                color='white'
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
                  <Text style={{ color: 'white' }}>Answer: {this.state.answer}</Text>
                </FadeInView>}
            </View>
          </TouchableWithoutFeedback>
        </FadeInView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  textInput: {
    height: 40,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 75,
    borderWidth: 1,
    borderColor: 'white'
  },
  reset: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 75,
    borderWidth: 1,
    borderColor: 'white'
  }
})
export default MagicEightBallMainMenu
