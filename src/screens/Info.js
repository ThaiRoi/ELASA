import React, {useState} from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { useSelector } from "react-redux";
import { userReturn } from "../store/store";

function Info() {

    // const userInfo = useSelector(userReturn);
    // console.log("userinfo from info page: ",userInfo);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: '#153C43' }}>

                    <Text style={[styles.title, {marginVertical: 30}]}>Enter your info please! </Text>

                    <Text style={styles.text}>Username*</Text>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={v => setUserName(v)}
                    />
                    <Text style={styles.text}>Email* </Text>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={v => setEmail(v)}
                    />
                    <Text style={styles.text}>Phone number*</Text>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={v => setPhone(v)}
                    />
                    <Text style={styles.textItalic}>We will use your phone number or your email to verify when you forget your password, so dread carefully!</Text>
                    <View style={styles.button}>
                        <Pressable
                            android_ripple={{
                                color: 'white'
                            }}
                            style={[{ width: '100%', height: 50 }]}
                            onPress={() => {
                                // console.log(userInfo);
                            }}
                        ><Text style = {styles.textButton}>Confirm</Text>

                        </Pressable>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        title: {
            fontSize: 30,
            color: '#F1E4CA',
            fontFamily: 'genshin',
            margin: 20,
            textAlign: 'center',
        },
        textItalic: {
            fontSize: 15,
            color: '#5BB467',
            fontFamily: 'Roboto',
            fontStyle: 'italic',
            paddingHorizontal: '7%'
        },
        textButton: {
            fontSize: 18,
            fontFamily: 'genshin',
            color: '#153C43',
            textAlign: 'center',
            margin: 10
          },
        text: {
            fontFamily: 'genshin',
            fontSize: 20,
            color: '#F1E4CA',
            paddingLeft: '7%',
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
            fontSize: 20,
            marginBottom: 20
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
            borderRadius: 10,
            marginTop: 50
        },
    }
)


export default Info;