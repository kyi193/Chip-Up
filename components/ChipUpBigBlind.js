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

const bbAmounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

class ChipUpBigBlind extends Component {
  state = {
    bigBlind: 10
  }

  onChangeBigBlind = (bigBlind) => {
    this.setState(() => ({
      bigBlind
    }))
  }
  decrementBigBlind = () => {
    const bigBlind = (this.state.bigBlind === 1) ? 1 : this.state.bigBlind - 1
    this.props.updateBigBlind(bigBlind)
    this.setState(() => ({
      bigBlind: (this.state.bigBlind === 1) ? 1 : this.state.bigBlind - 1
    }))
  }
  incrementBigBlind = () => {
    const bigBlind = (this.state.bigBlind === 20) ? 20 : this.state.bigBlind + 1
    this.props.updateBigBlind(bigBlind)
    this.setState(() => ({
      bigBlind: (this.state.bigBlind === 20) ? 20 : this.state.bigBlind + 1
    }))
  }
  render() {
    console.log("Big Blind", this.state.bigBlind)
    const { bigBlind } = this.state
    const DismissKeyboardView = DismissKeyboardHOC(View)
    return (
      <View>
        <Text>Big Blinds</Text>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={this.decrementBigBlind}
          >
            <AntDesign name="caretleft" size={40} color="black" />
          </TouchableOpacity>
          <DismissKeyboardView>
            <TextInput
              defaultValue={bigBlind.toString()}
              style={styles.inputField}
              keyboardType='numeric'
              onChangeText={text => this.onChangeBigBlind(text)}
              value={bigBlind.toString()}
            >
              <Text> BB</Text>
            </TextInput>
          </DismissKeyboardView>
          <TouchableOpacity
            style={styles.buttonRight}
            onPress={this.incrementBigBlind}
          >
            <AntDesign name="caretright" size={40} color="black" />
          </TouchableOpacity>
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
    borderColor: 'black',
    borderWidth: 2,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  buttonRight: {
    height: 100,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  inputField: {
    width: 100,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 30,
  }
})
export default ChipUpBigBlind
