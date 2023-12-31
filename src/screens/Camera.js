import React, {useState} from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    Image

} from 'react-native';
import { useNavigation } from "@react-navigation/native";

function Camera () {
    const navigation = useNavigation();
    return (
        <View style = {{flex: 1, backgroundColor: '#153C43'}}>
            <View style = {{margin: 20}}>
            <Text style = {styles.title}>Create memo with real life examples!</Text>
            </View>
            <Text style = {styles.normalText}>Capture things, places, people... associated with the words or phrases you want to memorize</Text>
          
            <Image style={{height: 340, width: 340, alignSelf: 'center', margin: 20}} source={require('../../assets/icons/kanyeMeme.png')} />
            <Text style = {styles.normalText}>And then create a memo with the media you've taken yourself!</Text>
            {/* <Text style = {styles.normalText}></Text>
            <Text style = {[styles.normalText]}>Amazing!</Text> */}


            <Pressable
            onPress={()=>{navigation.navigate('UseCamera')}}
            >
                    <View style = {{height: 50, width: 200, backgroundColor: 'green', alignSelf: 'center', margin: 20, justifyContent: 'center', borderRadius: 10}}>
                        <Text style = {[styles.normalText, {fontSize: 15, textAlign: 'center', color: '#F1E4CA'}]}>Open camera</Text>
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
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        color: '#F1E4CA',
        fontFamily: 'genshin',
        textAlign: 'center'
    },
    normalText: {
        fontFamily: 'genshin', fontSize: 15, marginHorizontal: 10, color: '#F1E4CA'
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

export default Camera;