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

function UseCamera () {
    return (
        <View style = {{flex: 1, backgroundColor: '#153C43'}}>
            <View style = {{margin: 20}}>
            <Text style = {styles.title}>Create memo with real life examples!</Text>
            </View>
            <Text>UseCamera</Text>

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

export default UseCamera;