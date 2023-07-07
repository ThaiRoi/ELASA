import React, { useState, useEffect } from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import {
  StyleSheet,
} from 'react-native';
import LoginSignup from './screens/LoginSignup';
import Info from './screens/Info';
import LottieSplashScreen from 'react-native-lottie-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App({navigation}) {
  
  useEffect(() => {
    LottieSplashScreen.hide(); // hide splashscreen when this file is done loading aka the app is done loading
  }, []);

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}  
      >
        <Stack.Screen
        name = 'LoginSignup'
        component={LoginSignup}
        
        />
        <Stack.Screen
        name = 'Info'
        component={Info}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({

});

export default App;
