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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();

function MyTabs() {
  useEffect(() => {
    LottieSplashScreen.hide(); // hide splashscreen when this file is done loading aka the app is done loading
  }, []);
  return (

    <Tab.Navigator
       screenOptions={{
        tabBarActiveTintColor: '#5BB467',
        headerShown: false,
        tabBarStyle: {borderTopWidth: 0}
      }}
      
    >
      <Tab.Screen name="Home" 
                  component={Home} 
                  options={{
                    tabBarIcon : () => <FontAwesome name="home" color="#5BB467" size={25}/>,
                    tabBarActiveBackgroundColor : "#2B3852",
                    tabBarInactiveBackgroundColor: "#31333B"
                  }}
      />
      <Tab.Screen name="SubSearch" 
                  component={SubSearch} 
                  options={{
                    tabBarIcon : () => <FontAwesome name="search" color="#5BB467" size={20}/>,
                    tabBarActiveBackgroundColor : "#2B3852",
                    tabBarInactiveBackgroundColor: "#31333B"
                  }}
      />
      <Tab.Screen name="Camera" 
                  component={Camera} 
                  options={{
                    tabBarIcon : () => <FontAwesome name="camera" color="#5BB467" size={20}/>,
                    tabBarActiveBackgroundColor : "#2B3852",
                    tabBarInactiveBackgroundColor: "#31333B"
                  }}
      />
      <Tab.Screen name="Memo" 
                  component={Memo} 
                  options={{
                    tabBarIcon : () => <FontAwesome name="sticky-note" color="#5BB467" size={20}/>,
                    tabBarActiveBackgroundColor : "#2B3852",
                    tabBarInactiveBackgroundColor: "#31333B"
                  }}
      />
      <Tab.Screen name="Social" 
                  component={Social} 
                  options={{
                    tabBarIcon : () => <FontAwesome name="globe" color="#5BB467" size={25}/>,
                    tabBarActiveBackgroundColor : "#2B3852",
                    tabBarInactiveBackgroundColor: "#31333B"
                  }}
      />

    </Tab.Navigator>

  );
}

export default MyTabs;



