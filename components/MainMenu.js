import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
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
          <ActionButton.Item buttonColor='#FF8C00' title="New Task" onPress={() => this.props.navigation.navigate('Chip Up')}>
            <Entypo name="hair-cross" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
            <Feather name="shuffle" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
            <FontAwesome5 name="bolt" style={styles.actionButtonIcon} />
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
