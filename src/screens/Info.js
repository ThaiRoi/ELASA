import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable
} from 'react-native';
import { useSelector } from "react-redux";
import { userReturn } from "../store/store";

function Info(){

            const userInfo = useSelector(userReturn);
            console.log("userinfo from info page: ",userInfo);
            
    return(
        <View style = {{flex: 1, backgroundColor:'#153C43'}}>
            <Text style ={styles.text}>Enter your info please </Text>
            <Text style ={styles.text}>user name</Text>
            <Text style ={styles.text}>email </Text>
            <Text style ={styles.text}>Phone number</Text>
            <Text style ={styles.text}>we will use your phone number or your email to verify when you forget your password, so dread carefully</Text>
            <Pressable
            style = {{width: 100, height: 50,backgroundColor: 'pink'}}
            onPress = {() => {
                
                console.log(userInfo);
            }}
            ><Text>aaaaaaaaaaaaaa</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create(
{
     text: {
        fontFamily: 'genshin',
        fontSize: 20,
        color: '#F1E4CA'
    }
}
)

export default Info;