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
import { useNavigation } from "@react-navigation/native";
import { clearUser } from "../user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
function Account () {
    const navigation = useNavigation();
  const dispatch = useDispatch();

    return (
        <View  style = {{flex: 1, backgroundColor: '#153C43'}}>

            <Text style = {styles.title}>Account</Text>
            <Text style = {styles.normalText}>Name and shit</Text>
            <Text style = {styles.normalText}>Progress</Text>
            <Text style = {styles.normalText}>History</Text>

            <Text style = {styles.normalText}>Change Personal Info</Text>
            <Text style = {styles.normalText}>Settings</Text>
            <Text style = {styles.normalText}>Support</Text>
            <Text style = {styles.normalText}>Upgrade to Pro</Text>
            
            <Pressable 
            onPress={async()=>{
                try {
                    await AsyncStorage.removeItem('userData');
                    dispatch(clearUser());
                    navigation.navigate('LoginSignup')
                  } catch(e) {
                    console.log(e);
                  }
                
                  console.log('Done.')
            }}
            >
            <View style = {{height: 100, width: 200, backgroundColor: 'red'}}>
                 <Text style = {styles.normalText}>Log out</Text>
            </View>
           </Pressable>

            


        </View>
    )
}
const styles = StyleSheet.create({
    activeTitle: {
        fontSize: 20,
        color: '#5BB467',
        fontFamily: 'genshin',
        textAlign: 'center'
    },
    title: {
        fontSize: 20,
        color: '#F1E4CA',
        fontFamily: 'genshin',
        textAlign: 'center'
    },
    normalText: {
        fontFamily: 'genshin', fontSize: 15, marginHorizontal: 5, color: '#E5D5A4'
    },
    videoTitle: {
        fontSize: 15,
        color: '#F2DD7D',
        fontFamily: 'genshin',
        textAlign: 'left',
        marginHorizontal: 10
    },
    activeTitleView: {
        height: 80, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 3, borderBottomColor: '#5BB467', margin: 1
    },
    inactiveTitleView: {
        height: 80, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#5BB467', padding: 1
    },
    titleView: {
        fontSize: 15,
        color: '#F1E4CA',
        fontFamily: 'genshin',
        textAlign: 'left',
        margin: 15,
    },
})
export default Account;