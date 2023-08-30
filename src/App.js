import React, { useState, useEffect } from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import {
  StyleSheet,
} from 'react-native';
import LoginSignup from './screens/LoginSignup';
import Info from './screens/Info';
import MainApp from './screens/MainApp';
import WatchVideo from './screens/WatchVideo';
import VideoRepetition from './screens/VideoRepetition';
import MemoRepetition from './screens/MemoRepetition';
import Statistic from './screens/Statistic';
import UseCamera from './screens/UseCamera';
import CreateMemo from './screens/CreateMemo';
import DailyTest from './screens/DailyTest';
import SearchMemo from './screens/SearchMemo';
import SeeMemo from './screens/SeeMemo';
import History from './screens/History';
import VideoSearch from './screens/VideoSearch';
import ViewPost from './screens/ViewPost';

import LottieSplashScreen from 'react-native-lottie-splash-screen';
import Toast from 'react-native-toast-message';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from 'react-native-popup-menu';
const Stack = createNativeStackNavigator();

function App() {
  
  useEffect(() => {
    LottieSplashScreen.hide(); // hide splashscreen when this file is done loading aka the app is done loading
  }, []);

  return (
    <Provider store={store}>
       <MenuProvider>
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
         <Stack.Screen
        name = 'MainApp'
        component={MainApp}
        />
          <Stack.Screen
        name = 'WatchVideo'
        component={WatchVideo}
        />
         <Stack.Screen
        name = 'VideoRepetition'
        component={VideoRepetition}
        />
            <Stack.Screen
        name = 'MemoRepetition'
        component={MemoRepetition}
        />
         <Stack.Screen
        name = 'Statistic'
        component={Statistic}
        />
         <Stack.Screen
        name = 'UseCamera'
        component={UseCamera}
        />
         <Stack.Screen
        name = 'CreateMemo'
        component={CreateMemo}
        />
        <Stack.Screen
        name = 'DailyTest'
        component={DailyTest}
        />
         <Stack.Screen
        name = 'SearchMemo'
        component={SearchMemo}
        />
           <Stack.Screen
        name = 'SeeMemo'
        component={SeeMemo}
        />
         <Stack.Screen
        name = 'History'
        component={History}
        />
        <Stack.Screen
        name = 'VideoSearch'
        component={VideoSearch}
        />
        <Stack.Screen
        name = 'ViewPost'
        component={ViewPost}
        />
  
      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </MenuProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({

});

export default App;
