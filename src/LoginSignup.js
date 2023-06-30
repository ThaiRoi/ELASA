import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import * as Animatable from 'react-native-animatable';

function LoginSignup({navigation}) {
  const contentLogin = (
    <View>
      <Text style={[styles.text, { marginTop: 20 }]}>Account:</Text>
      <TextInput
        style={styles.inputBox}
      />
      <Text style={styles.text}>Password:</Text>
      <TextInput
        style={styles.inputBox}
        secureTextEntry={true}
        keyboardType='default'
      />
      <Text style={[styles.smallText, { paddingLeft: 20, paddingTop: 5 }]}>Forgot password?</Text>
      <View style={[styles.button, { alignContent: 'center', justifyContent: 'center', overflow: 'hidden' }]}>
        <Pressable
          android_ripple={{
            color: 'white'
          }}
          style={{ width: '100%', borderRadius: 15 }}
          onPress={() => {navigation.navigate('Info')}}
        >
          <Text style={[styles.text, { textAlign: 'center' }]}>Login</Text>
        </Pressable>

      </View>

      <Text style={[styles.smallText, { alignSelf: 'center', marginBottom: 20 }]}>or Login with</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Image style={{ height: 50, width: 52 }} source={require('../assets/icons/_Facebook.png')} />
        <Image style={{ height: 50, width: 50 }} source={require('../assets/icons/_Google.png')} />
        <Image style={{ height: 50, width: 50 }} source={require('../assets/icons/_Twitter.png')} />
      </View>
    </View>
  );
  const contentSignup = (
    <View>
      <Text style={[styles.text, { marginTop: 20 }]}>Account:</Text>
      <TextInput
        style={styles.inputBox}
      />
      <Text style={styles.text} >Password:</Text>
      <TextInput
        style={styles.inputBox}
        secureTextEntry={true}
        keyboardType='default'
      />
      <Text style={styles.text}>Confirm password:</Text>
      <TextInput
        style={styles.inputBox}
        secureTextEntry={true}
        keyboardType='default'
      />
      <View style={[styles.button, { alignContent: 'center', justifyContent: 'center', overflow: 'hidden', marginTop: 45 }]}>
        <Pressable
          android_ripple={{
            color: 'white'
          }}
          style={{ width: '100%', borderRadius: 15 }}
          onPress={() => {navigation.navigate('Info')}}
        >
          <Text style={[styles.text, { textAlign: 'center', }]}>Sign up</Text>
        </Pressable>

      </View>
    </View>
  );
  const activeTitle = ({
    fontSize: 25,
    color: '#F1E4CA',
    borderBottomWidth: 2,
    borderColor: '#F1E4CA',
    padding: 10,
  });
  const inactiveTitle = ({
    fontSize: 20,
  })

  const [styleTitle1, setStyleTitle1] = useState(activeTitle);
  const [styleTitle2, setStyleTitle2] = useState(inactiveTitle);
  const [content, setContent] = useState(contentLogin);

  const handleButton1Press = () => {
    setContent(contentLogin);
    setStyleTitle1(activeTitle);
    setStyleTitle2(inactiveTitle);
  };

  const handleButton2Press = () => {
    setContent(contentSignup);
    setStyleTitle2(activeTitle);
    setStyleTitle1(inactiveTitle);
  };

  return (
<ScrollView style = {{backgroundColor: '#5BB467'}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ backgroundColor: '#153C43', alignItems: 'center', flex: 1, flexDirection: 'column' }}>
        <View
          animation="faceIn" iterationCount={1} direction="normal"
          style={{ backgroundColor: '#153C43', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[styles.textTitle, { paddingTop: 20 }]}>Welcome to</Text>
          <Text style={styles.title}>ELASA</Text>
          <Text style={styles.textTitle}>English Language Acquisition Support App</Text>
          <Text style={[styles.textTitle, { fontSize: 10, paddingTop: 20, paddingBottom: 20 }]}>Cringe</Text>
        </View>



        <Animatable.View
          animation="slideInUp" iterationCount={1} direction="normal" easing={'ease-in-out-back'}
          style={{ backgroundColor: '#5BB467', width: '100%', height: '100%', borderTopStartRadius: 30, borderTopEndRadius: 30, }}
        >
          <View style={{ flexDirection: 'row', height: 70, alignItems: 'center', }}>

            <Pressable
              onPress={handleButton1Press}
              hitSlop={{
                bottom: 20,
                top: 20,
              }}
              style={{ flex: 1, }}>
              <Text style={[styles.textLogin, styleTitle1,]}>Login</Text>
            </Pressable>

            <Pressable
              onPress={handleButton2Press}
              hitSlop={{
                bottom: 20,
                top: 20,
              }}
              style={{ flex: 1, }}>
              <Text style={[styles.textLogin, styleTitle2]}>Sign up</Text>
            </Pressable>


          </View>
          <View style ={{}}>
            {content}
          </View>

        </Animatable.View>

      </View>
    </TouchableWithoutFeedback >
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 18,
    color: '#F1E4CA',
    fontFamily: 'Roboto',
    fontStyle: 'italic'
  },
  title: {
    fontSize: 50,
    color: '#F1E4CA',
    fontFamily: 'genshin',
    margin: 20
  },
  textLogin: {
    fontSize: 20,
    fontFamily: 'genshin',
    color: '#153C43',
    textAlign: 'center'
  },
  text: {
    fontSize: 18,
    fontFamily: 'genshin',
    color: '#153C43',
    textAlign: 'left',
    paddingLeft: '4%',
    margin: 10
  },
  inputBox: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#153C43',
    width: '90%',
    height: '50',
    alignSelf: 'center',
    backgroundColor: '#F1E4CA',
    fontSize: 20
  },
  button: {
    width: '90%',
    height: '50',
    backgroundColor: '#F8FE81',
    color: 'black',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#153C43',
    margin: 20,
    borderRadius: 10
  },
  smallText: {
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#F1E4AC'
  }
});

export default LoginSignup;
