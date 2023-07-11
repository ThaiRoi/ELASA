import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Modal
} from 'react-native';
import { setUser } from '../user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Camera from './Camera';
import Memo from './Memo';
import Social from './Social';
import SubSearch from './SubSearch';

import LottieSplashScreen from 'react-native-lottie-splash-screen';
const Tab = createBottomTabNavigator();

function MyTabs() {
  useEffect(() => {
    LottieSplashScreen.hide(); // hide splashscreen when this file is done loading aka the app is done loading
  }, []);
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SubSearch" component={SubSearch} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="Memo" component={Memo} />
      <Tab.Screen name="Social" component={Social} />

    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;



