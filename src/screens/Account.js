import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { clearUser } from "../user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import Slider from '@react-native-community/slider';


function Account() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [value, setValue] = useState(1);
    

 
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#153C43' }}>
            <Text style={styles.title}>Account {Math.floor(value)}</Text>
                <Slider
                style={{width: 200, height: 40, alignSelf: 'center'}}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(v)=>{setValue(v)}}
                />
            <Pressable
                onPress={() => { }}
                android_ripple={{ color: '#E5D5A4' }}
                style={styles.menuBox}
            >
                <View>
                    <Text style={[styles.normalText, { shadowColor: 'red', elevation: 1 }]}>Name and shit</Text>
                </View>
            </Pressable>

            <Pressable
                onPress={() => { }}
                android_ripple={{ color: '#E5D5A4' }}
                style={styles.menuBox}
            >
                <View>
                    <Text style={styles.normalText}>Change Personal Info</Text>
                </View>
            </Pressable>

            <Pressable
                onPress={() => { }}
                android_ripple={{ color: '#E5D5A4' }}
                style={styles.menuBox}
            >
                <View>
                    <Text style={styles.normalText}>Progress</Text>
                </View>
            </Pressable>

            <Pressable
                onPress={() => {navigation.navigate('History')}}
                android_ripple={{ color: '#E5D5A4' }}
                style={styles.menuBox}
            >
                <View>
                    <Text style={styles.normalText}>History</Text>
                </View>
            </Pressable>

        

            <Pressable
                onPress={() => { }}
                android_ripple={{ color: '#E5D5A4' }}
                style={styles.menuBox}
            >
                <View>
                    <Text style={styles.normalText}>Settings</Text>
                </View>
            </Pressable>

            <Pressable
                onPress={() => { }}
                android_ripple={{ color: '#E5D5A4' }}
                style={styles.menuBox}
            >
                <View>
                    <Text style={styles.normalText}>Support</Text>
                </View>
            </Pressable>

            <Pressable
                onPress={() => { }}
                android_ripple={{ color: '#E5D5A4' }}
                style={styles.menuBox}>
                <View>
                    <Text style={styles.normalText}>Upgrade to Pro</Text>
                </View>
            </Pressable>










            <Pressable
                onPress={async () => {
                    try {
                        await AsyncStorage.removeItem('userData');
                        dispatch(clearUser());
                        navigation.navigate('LoginSignup')
                    } catch (e) {
                        console.log(e);
                    }
                    navigation.dispatch
                    console.log('Done.')
                }}
                style={[styles.menuBox, { shadowColor: 'red' }]}
                android_ripple={{ color: 'red' }}
            >
                <View>
                    <Text style={[styles.normalText, { color: 'red' }]}>Log out</Text>
                </View>
            </Pressable>




        </ScrollView>
    )
}
const styles = StyleSheet.create({

    title: {
        fontSize: 20,
        color: '#F1E4CA',
        fontFamily: 'genshin',
        textAlign: 'center',
        margin: 15
    },
    normalText: {
        fontFamily: 'genshin', fontSize: 15, marginHorizontal: 5, color: '#E5D5A4'
    },
    menuBox: {
        height: 50, width: '90%', backgroundColor: '#153C43', alignSelf: 'center', shadowColor: 'yellow', elevation: 10, margin: 10
    }

})
export default Account;