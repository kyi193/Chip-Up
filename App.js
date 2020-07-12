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
import RangeChart from './components/RangeChart'
import EquitoolMainMenu from './components/EquitoolMainMenu'
import MagicEightBallMainMenu from './components/magicEightBallComponents/MagicEightBallMainMenu'
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset'


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
    <Stack.Screen
      name="Range Chart"
      component={RangeChart}
    />
    <Stack.Screen
      name="Equitool"
      component={EquitoolMainMenu}
    />
    <Stack.Screen
      name="Magic Eight Ball"
      component={MagicEightBallMainMenu}
    />
  </Stack.Navigator>
);

export default class App extends React.Component {
  state = {
    isReady: false,
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

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

  async _cacheResourcesAsync() {
    const images = [require('./assets/images/splashscreen.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }
}
