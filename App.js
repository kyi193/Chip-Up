import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import MainMenu from './components/MainMenu'
import ChipUpMainMenu from './components/ChipUpMainMenu'
import { SafeAreaProvider } from 'react-native-safe-area-context';



const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      name="Main Menu"
      component={MainMenu}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Chip Up"
      component={ChipUpMainMenu}
    />
  </Stack.Navigator>
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, composeWithDevTools(middleware))}>
        <SafeAreaProvider style={{ flex: 1 }}>
          <NavigationContainer>
            <MainNav />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
