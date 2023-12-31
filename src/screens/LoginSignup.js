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
import serverAddress from "../global";
import { setUser } from '../user/userSlice';
import { userReturn } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';




const ContentLogin = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(userReturn);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    "account": account,
    "password": password
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '160860312025-uljkdhv5eivi9r8hficnae6u6mm8s26o.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
//  iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
   // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });
  return <View>

    <Text style={[styles.text, { marginTop: 20 }]}>Account:</Text>
    <TextInput
      style={[styles.inputBox, {color: 'black', paddingLeft: 10}]}
      value={account}
      onChangeText={(value => {
        setAccount(value)
      })}
    />
    <Text style={styles.text}>Password:</Text>
    <TextInput
      style={[styles.inputBox, {color: 'black', paddingLeft: 10}]}
      secureTextEntry={true}
      defaultValue={password}
      keyboardType='default'
      onChangeText={value => { setPassword(value) }}

    />
    <Text style={[styles.smallText, { paddingLeft: 20, paddingTop: 5 }]}>Forgot password?</Text>
    <View style={[styles.button, { alignContent: 'center', justifyContent: 'center', overflow: 'hidden' }]}>
      <Pressable
        android_ripple={{
          color: 'white'
        }}
        style={{ width: '100%', borderRadius: 15 }}
        onPress={() => {
          {
            // navigation.navigate('MainApp');
              fetch(`${serverAddress}/account/login`, requestOptions)
                .then(response => {
                  if (response.ok) {
                    // Request was successful (status code 200-299)
                    console.log(response);
                    return response.json(); // Parse response body as JSON
                  } else {
                    // Request failed (status code outside 200-299 range)
                    console.log('from respose: ', response);
                    throw new Error('Request failed with status ' + response.status);
                  }
                })
                .then( async (data) => {
                  // Handle the response data
                  try {
                    await AsyncStorage.setItem('userData', JSON.stringify(data.data));
                  } catch (error) {
                    console.log(error);
                  }
                  dispatch(setUser(data.data));
                  console.log('from data: ', data);
                  navigation.navigate('MainApp');
                  // Additional logic based on the response data
                })
                .catch(error => {
                  // Handle any errors that occurred during the request
                  console.error('from error: ', error);
                });

              console.log('this is from login page: ', account, password);
          }
        }}
      >
        <Text style={[styles.text, { textAlign: 'center' }]}>Login</Text>
      </Pressable>

    </View>

    <Text style={[styles.smallText, { alignSelf: 'center', marginBottom: 20 }]}>or Login with</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <Pressable
      onPress={()=>{
        console.log(userData)
      }}
      >
      <Image style={{ height: 50, width: 52 }} source={require('../../assets/icons/_Facebook.png')} />
      </Pressable>

      <Pressable
      onPress={
      //   async ()=>{
      //   try {
      //     const userData = await AsyncStorage.getItem('userData');
      //      userData != null ? JSON.parse(userData) : null;
      //      console.log(userData)
      //   } catch (e) {
      //     // error reading value
      //   }
      // }
      async ()=>{
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const token = await GoogleSignin.getTokens()
            console.log("google sign in",token);
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
              console.log(error.code);
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
              console.log(error.code);

            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
              console.log(error.code);

            } else {
              // some other error happened
              console.log("idk man: ",error);

            }
          }
    
      }
    }
      >
         <Image style={{ height: 50, width: 50 }} source={require('../../assets/icons/_Google.png')} />
      </Pressable>
     
      <Image style={{ height: 50, width: 50 }} source={require('../../assets/icons/_Twitter.png')} />
    </View>
  </View>
}

function LoginHandler() {

}

const ContentSignup = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  // const dispatch = useDispatch();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "account": account,
    "password": password
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return <View>
    {/* <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      }}>
        <View style={{
          margin: 20,
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 35,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}>
          <Text style={{
            marginBottom: 15,
            textAlign: 'center',
          }}>Hello World!</Text>
          <Pressable
            style={[{
              borderRadius: 20,
              padding: 10,
              elevation: 2,
            }, {
              backgroundColor: '#2196F3',
            }]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    <Pressable
      style={[styles.button, styles.buttonOpen]}
      onPress={() => setModalVisible(true)}>
      <Text style={styles.textStyle}>Show Modal</Text>
    </Pressable> */}
    <Text style={[styles.text, { marginTop: 20 }]}>Account:</Text>
    <TextInput
      style={[styles.inputBox, {color: 'black', paddingLeft: 10}]}
      onChangeText={v => setAccount(v)}
    />
    <Text style={styles.text} >Password:</Text>
    <TextInput
      style={[styles.inputBox, {color: 'black', paddingLeft: 10}]}
      secureTextEntry={true}
      keyboardType='default'
      onChangeText={v => setPassword(v)}
    />
    <Text style={styles.text}>Confirm password:</Text>
    <TextInput
      style={[styles.inputBox, {color: 'black', paddingLeft: 10}]}
      secureTextEntry={true}
      keyboardType='default'
      onChangeText={v => setRePassword(v)}

    />
    <View style={[styles.button, { alignContent: 'center', justifyContent: 'center', overflow: 'hidden', marginTop: 45 }]}>
      <Pressable
        android_ripple={{
          color: 'white'
        }}
        style={{ width: '100%', borderRadius: 15 }}
        onPress={() => {

          fetch(`${serverAddress}/account/sign-up`, requestOptions)
            .then(response => {
              if (response.ok) {
                // Request was successful (status code 200-299)
                console.log(response);
                return response.json(); // Parse response body as JSON
              } else {
                // Request failed (status code outside 200-299 range)
                console.log('from respose: ', response);
                throw new Error('Request failed with status ' + response.status);
              }
            })
            .then(data => {
              // Handle the response data
              //dispatch(setUser(data));
              console.log('from data: ', data);
              // Additional logic based on the response data
            })
            .catch(error => {
              // Handle any errors that occurred during the request
              console.error('from error: ', error);
            });
        }}
      >
        <Text style={[styles.text, { textAlign: 'center', }]}>Sign up</Text>
      </Pressable>

    </View>
  </View>

}

// function SignUpHandler(account, password, rePassword, dispatch) {

// }

// const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('userData');
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     console.log(e);
//   }
// };



function LoginSignup() {
const dispatch = useDispatch();
const navigation = useNavigation();
  const checkLoginState = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        // If user token exists, dispatch login success action with the token
        console.log('alrady loging: ', userData);
        dispatch(setUser(JSON.parse(userData)));
        navigation.replace('MainApp')
      } else {
        // If user token doesn't exist,
        console.log('nothing yet')
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLoginState();
  }, []);

  // try {
  //   const jsonValue = (await AsyncStorage.getItem('userData')) != null ? JSON.parse(jsonValue) : null;
  //   console.log('come on man: ',jsonValue);
  // } catch (e) {
  //   console.log(e);
  // }
  // const storage = getData();
  // AsyncStorage.getItem('userData').then(()=>{
  //   if(storage == null){
  //   console.log('its null')
  // }
  // else{
  //   console.log('itsnot null', storage)
  // }
  // })
  // .catch((e)=>{console.log(e)})
  


  const [active, setActive] = useState(1);
  const handleLoginPress = () => {
    setActive(1);
  };
  const handleSignupPress = () => {
    setActive(0);
  };


  return (
    <ScrollView style={{ backgroundColor: '#5BB467' }}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ backgroundColor: '#153C43', alignItems: 'center', flex: 1, flexDirection: 'column' }}>
          <View
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
                onPress={handleLoginPress}
                hitSlop={{
                  bottom: 20,
                  top: 20,
                }}
                style={{ flex: 1, }}>
                <Text style={[styles.textLogin, (active ? styles.activeTitle : styles.inactiveTitle)]}>Login</Text>
              </Pressable>

              <Pressable
                onPress={handleSignupPress}
                hitSlop={{
                  bottom: 20,
                  top: 20,
                }}
                style={{ flex: 1, }}>
                <Text style={[styles.textLogin, (!active ? styles.activeTitle : styles.inactiveTitle)]}>Sign up</Text>
              </Pressable>


            </View>

            <View style={{ display: (active ? 'flex' : 'none') }}>
              <ContentLogin />
            </View>

            <View style={{ display: !active ? 'flex' : 'none' }}>
              <ContentSignup />
            </View>


          </Animatable.View>

        </View>
      </TouchableWithoutFeedback >
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  activeTitle: ({
    fontSize: 25,
    color: '#F1E4CA',
    borderBottomWidth: 2,
    borderColor: '#F1E4CA',
    padding: 10,
  }),
  inactiveTitle: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#153C43',
    padding: 14
  },
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
