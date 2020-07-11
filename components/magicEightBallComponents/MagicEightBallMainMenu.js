import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import FadeInView from 'react-native-fade-in-view';
import { ShakeEventExpo } from '../../utils/ShakeEventExpo'
import KevinsThoughtMachine from '@kyi193/kevins-thought-machine/dist'
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
  async UNSAFE_componentWillMount() {
    ShakeEventExpo.addListener(() => {
      this.submitQuestion()
    });
  }

  UNSAFE_componentWillUnmount() {
    ShakeEventExpo.removeListener();
  }

  submitQuestion = () => {
    const kevinsThoughtMachine = new KevinsThoughtMachine()
    const answer = kevinsThoughtMachine.getResponse().answer
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
        <Text style={styles.title}>Magic 8 Ball</Text>
        <View style={styles.magicEightBall}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Text style={{ color: 'white', fontSize: 20, width: 310, textAlign: 'center', fontFamily: 'Hoefler Text' }}>Please ask a yes or no question (shake your phone to reveal answer)</Text>
              <FadeInView
                duration={3000}
                style={styles.answer}
              >
                {this.state.answer &&
                  <FadeInView
                    duration={2000}
                    style={{ padding: 5 }}
                  >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>{this.state.answer}</Text>
                  </FadeInView>}
              </FadeInView>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <SubmitBtn onPress={this.submitQuestion} />
                <ResetBtn onPress={this.reset} />
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontFamily: 'Zapfino',
    fontSize: 30
  },
  magicEightBall: {
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
    paddingLeft: 10,
    borderRadius: 15,
    marginTop: 5
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 75,
    borderWidth: 1,
    borderColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 20
  },
  reset: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 75,
    borderWidth: 1,
    borderColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 20
  },
  answer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: 250,
    width: 250,
    borderColor: 'gray',
    borderWidth: 5,
    borderRadius: 150,
    marginBottom: 40,
    marginTop: 20
  }
})
export default MagicEightBallMainMenu
