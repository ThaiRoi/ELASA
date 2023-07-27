import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
    ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


function Memo() {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#153C43' }}>
            <Text style={[styles.title, { margin: 15 }]}>MEMO flashcards</Text>

            <View style={{ height: 80, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ height: 60, width: '48%', backgroundColor: '#5BB467', borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <FontAwesome name="plus" color="#153C43" size={20} />
                    <Text style={[styles.normalText, { textAlign: 'center', color: '#153C43' }]}>Create New</Text>
                </View>
                <View style={{ height: 60, width: '48%', backgroundColor: '#5BB467', borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <FontAwesome name="search" color="#153C43" size={20} />
                    <Text style={[styles.normalText, { textAlign: 'center', color: '#153C43' }]}>Sreach</Text>
                </View>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20}}>
                <View style = {{width: 100, backgroundColor: '#E5D5A4', paddingVertical: 10, alignContent: 'center', justifyContent: 'center', borderRadius: 10}}>
                    <View style = {{alignSelf: 'center'}}><FontAwesome name="circle" color="red" size={20}/></View>
                    <Text style={[styles.normalText, {color: '#153C43'}]}>New</Text>
                    <Text style={[styles.normalText, {fontSize: 25, color: '#153C43'}]}>1</Text>
                </View>
                <View style = {{width: 100, backgroundColor: '#E5D5A4', paddingVertical: 10, alignContent: 'center', justifyContent: 'center', borderRadius: 10}}>
                <View style = {{alignSelf: 'center'}}><FontAwesome name="circle" color="yellow" size={20}/></View>
                    <Text style={[styles.normalText, {color: '#153C43'}]}>Learning</Text>
                    <Text style={[styles.normalText, {fontSize: 25, color: '#153C43'}]}>2</Text>
                </View>
                <View style = {{width: 100, backgroundColor: '#E5D5A4', paddingVertical: 10, alignContent: 'center', justifyContent: 'center', borderRadius: 10}}>
                <View style = {{alignSelf: 'center'}}><FontAwesome name="circle" color="#66ff00" size={20}/></View>
                    <Text style={[styles.normalText, {color: '#153C43'}]}>Mastered</Text>
                    <Text style={[styles.normalText, {fontSize: 25, color: '#153C43'}]}>3</Text>
                </View>
            </View>

            <View style = {{marginBottom: 20}}>
            <ImageBackground 
            source={require('../../assets/icons/test.png')}
            style = {{height: 110, marginHorizontal: 15, borderRadius: 10}}
            >
                <Text style={{fontFamily: 'genshin', fontSize: 35, color: '#153C43'}}>  Daily</Text>
                <Text style={{fontFamily: 'genshin', fontSize: 35, color: '#153C43'}}>  Test</Text>

            </ImageBackground>
            </View>

            <Text style={[styles.title, {textAlign: 'left', marginHorizontal: 15, marginVertical: 10}]}>Newly created</Text>
            <Text style={[styles.title, {textAlign: 'left', marginHorizontal: 15, marginVertical: 10}]}>Learning</Text>
            <Text style={[styles.title, {textAlign: 'left', marginHorizontal: 15, marginVertical: 10}]}>Mastered</Text>



        </ScrollView>
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
        fontFamily: 'genshin', fontSize: 15, marginHorizontal: 5, color: '#E5D5A4', textAlign: 'center'
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
export default Memo;