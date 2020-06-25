import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';

const DismissKeyboardHOC = (Comp) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};

class ChipUpBigBlind extends Component {
  state = {
    bigBlind: 10
  }

  onChangeBigBlind = (bigBlind) => {
    bigBlind = parseInt(bigBlind);
    this.setState(() => ({
      bigBlind
    }))
  }
  decrementBigBlind = () => {
    const bigBlind = (this.state.bigBlind === 1) ? 1 : this.state.bigBlind - 1
    this.props.updateBigBlind(bigBlind)
    this.setState(() => ({
      bigBlind: bigBlind
    }))
  }
  incrementBigBlind = () => {
    const bigBlind = (this.state.bigBlind === 20) ? 20 : this.state.bigBlind + 1
    this.props.updateBigBlind(bigBlind)
    this.setState(() => ({
      bigBlind: bigBlind
    }))
  }
  render() {
    console.log("Big Blind", this.state.bigBlind)
    const { bigBlind } = this.state
    return (
      <View>
        <Text>Big Blinds</Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={this.decrementBigBlind}
            >
              <AntDesign name="caretleft" size={40} color="gray" />
            </TouchableOpacity>
            <TextInput
              style={styles.inputField}
              keyboardType='numeric'
              onChangeText={text => this.onChangeBigBlind(text)}
            >
              {isNaN(bigBlind) ? "" : bigBlind}
            </TextInput>
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={this.incrementBigBlind}
            >
              <AntDesign name="caretright" size={40} color="gray" />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ width: 100, height: 30, marginLeft: 60, }}>
          <Text style={{ fontSize: 24, textAlign: 'center' }}>BB</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonLeft: {
    height: 100,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FF4500',
    borderWidth: 2,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  buttonRight: {
    height: 100,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FF4500',
    borderWidth: 2,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  inputField: {
    flexDirection: 'column',
    width: 100,
    height: 100,
    borderColor: '#FF4500',
    borderWidth: 2,
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 30,
  }
})
export default ChipUpBigBlind
