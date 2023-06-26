/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

function App() {
  return (
    <SafeAreaView style = {{backgroundColor: '#153C43', alignItems: 'center', flex:1, flexDirection: 'column'}}>
      <View 
      animation="faceIn" iterationCount={1} direction="normal"
      style = {{backgroundColor: '#153C43' ,alignItems: 'center', justifyContent:'center'}}>
        <Text style = {styles.text}>Welcome to</Text>
        <Text style = {styles.title}>ELASA</Text>
        <Text style = {styles.text}>English Language Acquisition Support App</Text>
        <Text style = {[styles.text, {fontSize: 10, paddingTop: 20, paddingBottom: 20}]}>Cringe</Text>
      </View>

      <Animatable.View 
      animation="slideInUp" iterationCount={1} direction="normal" easing={'ease-in-out-back'}
      style = {{backgroundColor: '#5BB467', width: '100%', height: '100%', borderTopStartRadius: 30, borderTopEndRadius: 30, flexDirection: 'row'}}
      >
          <Text style ={{flex:1}}>aaaaaaaaa</Text>
          <Text style ={{flex:1}}>bbbbbbbb</Text>
      </Animatable.View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#F1E4CA',
    fontFamily:'Roboto',
    fontStyle: 'italic'
  },
  title: {
    fontSize: 50,
    color: '#F1E4CA',
    fontFamily: 'genshin',
    margin: 20
  }
});

export default App;
