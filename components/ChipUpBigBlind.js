import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'
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
    bigBlind: 20
  }

  onChangeBigBlind = (bigBlind) => {
    bigBlind = parseInt(bigBlind);
    this.props.updateBigBlind(bigBlind)
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
    const { bigBlind } = this.state
    return (
      <View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={this.decrementBigBlind}
            >
              <Image
                style={{ height: 30, width: 30 }}
                source={require('../assets/images/left.png')}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.inputField}
              keyboardType='numeric'
              onChangeText={text => this.onChangeBigBlind(text)}
              value={isNaN(bigBlind) ? "" : (bigBlind > 20 || bigBlind < 1) ? "" : bigBlind.toString()}
            />
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={this.incrementBigBlind}
            >
              <Image
                style={{ height: 30, width: 30 }}
                source={require('../assets/images/right.png')}
              />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ width: 100, height: 30, justifyContent: 'center', alignSelf: 'center' }}>
          <Text style={{ fontSize: 24, color: 'gold', justifyContent: 'center', alignSelf: 'center' }}>BB</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonLeft: {
    height: 50,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'orange',
    borderWidth: 2,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: 'orange'
  },
  buttonRight: {
    height: 50,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'orange',
    borderWidth: 2,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: 'orange'
  },
  inputField: {
    flexDirection: 'column',
    width: 100,
    height: 50,
    borderTopColor: 'gold',
    borderBottomColor: 'gold',
    backgroundColor: '#FFFAFA',
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 30,
  }
})
export default ChipUpBigBlind
