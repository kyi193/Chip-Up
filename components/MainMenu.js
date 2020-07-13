import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import ActionButton from '../assets/circularTools/ActionButton.js'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux'

class MainMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActionButton buttonColor="rgba(42, 125, 188, 0.5)">
          <ActionButton.Item buttonColor='#BEBEBE' title="New Task" btnOutRange='#ffffff' onPress={() => this.props.navigation.navigate('Chip Up')}>
            <Image
              style={{ height: 30, width: 30 }}
              source={require('../assets/images/rocketOrange.png')}
            />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#BEBEBE' title="Notifications" onPress={() => this.props.navigation.navigate('Equitool')}>
            <Image
              style={{ height: 30, width: 30 }}
              source={require('../assets/images/pokerBlue.png')}
            />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#BEBEBE' title="All Tasks" onPress={() => this.props.navigation.navigate('Magic Eight Ball')}>
            <Image
              style={{ height: 40, width: 40 }}
              source={require('../assets/images/magicEightBall.png')}
            />
          </ActionButton.Item>
        </ActionButton>
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
  actionButtonIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    color: 'white',
  },
})
export default connect()(MainMenu)
