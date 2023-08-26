import React, {useState, useRef} from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableOpacity,
    Keyboard, ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CardFlip from 'react-native-card-flip';
import { Image } from "react-native-animatable";

function DailyTest () {
    const cardRef = useRef();
    return (
        <ScrollView style = {{flex: 1, backgroundColor: '#153C43'}}>
            <View style = {{margin: 20}}>
            <Text style = {styles.title}>DailyTest</Text>
            </View>
            <Text style = {styles.normalText}>What is this?</Text>
            <View style = {{height: 300, margin : 20}}>
            <CardFlip style={{width: '80%', alignSelf: 'center'}} ref={(card) => this.card = card} >
             <TouchableOpacity style={{height: 300, width: '100%', backgroundColor: '#31333B'}} onPress={() => this.card.flip()} >
                <Image
                style = {{height: '100%', width: "100%"}}
                resizeMode= "contain"
                source={uri = require("../../assets/icons/catwink.jpg")}
                />
                </TouchableOpacity>
            <TouchableOpacity style={{height: 300, width: '100%', backgroundColor: 'gray', justifyContent: 'center'}} onPress={() => this.card.flip()} >
                <Text
                style = {[styles.title]}
                >A CAT</Text></TouchableOpacity>
                </CardFlip>
            </View>

                <Text style = {styles.normalText}>Your answer is:</Text>
            <TextInput

                        style={{ width: '90%', backgroundColor: '#F1E4CA', borderRadius: 50, color: "black", alignSelf: 'center'}}
                        placeholder="title"
                        placeholderTextColor="gray"

                        onChangeText={(v) => { }}
                        onSubmitEditing={() => {
                            console.log("entered")
                        }}
                    />
                <Pressable 
                style = {{height: 50, width: 100, alignSelf: "center", backgroundColor: 'green', margin: 10, borderRadius: 10}}
                onPress={()=>{}}
                >
                    <Text style = {styles.normalText}>Submit</Text>
                    </Pressable>

        </ScrollView>
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

export default DailyTest;