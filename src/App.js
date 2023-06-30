import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LoginSignup from './LoginSignup';
import Info from './Info';
import LottieSplashScreen from 'react-native-lottie-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App({navigation}) {
  useEffect(() => {
    LottieSplashScreen.hide(); // here
  }, []);
  return (
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
  );
}

const styles = StyleSheet.create({

});

export default App;
