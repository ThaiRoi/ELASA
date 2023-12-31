import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList
} from 'react-native';

function Statistic() {
    return (
        <View style={{ flex: 1, backgroundColor: '#153C43' }}>
            <View style = {styles.titleView}><Text style = {styles.title}>Word Statistic</Text></View>
            <Text style = {styles.normalText}>Words encountered:</Text>
            <View style={{ height: "auto", padding: 10, width: "95%", backgroundColor: '#234B76', margin: 5, alignSelf: 'center'}}>
                <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ flex: 3 }}>
                    <Text style={[styles.title, {fontSize: 15}]}>Word</Text>

                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={[styles.title, {fontSize: 15}]}>Times:</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end'}}>
                    <Text style={[styles.title, {fontSize: 15}]}>CEFR</Text>
                     
                    </View>
                </View>
               
              
            </View><FlatList
                data={statisticData}
                 
                renderItem={({item}) => <View style={{ height: "auto", padding: 10, width: "95%", backgroundColor: '#234B76', margin: 5, alignSelf: 'center'}}>
                    <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flex: 3 }}>
                        <Text style={[styles.title]}>{item.word}</Text>

                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={[styles.title]}>{item.time}</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'flex-end'}}>
                        <Text style={[styles.title]}>{item.cefr}</Text>
                         
                        </View>
                    </View>
                   
                  
                </View>
                
                }
            />
        </View>
    )
}
export default Statistic;
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
        fontFamily: 'genshin', fontSize: 15, marginHorizontal: 5, color: '#E5D5A4', padding : 10
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
        fontSize: 20,
        color: '#F1E4CA',
        fontFamily: 'genshin',
        textAlign: 'left',
        margin: 15,
    },
})
const statisticData =
    [
        { "word": "apple", "time": 750, "cefr": "A1" },
        { "word": "house", "time": 1000, "cefr": "A1" },
        { "word": "cat", "time": 450, "cefr": "A1" },
        { "word": "dog", "time": 600, "cefr": "A1" },
        { "word": "book", "time": 700, "cefr": "A1" },
        { "word": "table", "time": 550, "cefr": "A1" },
        { "word": "run", "time": 300, "cefr": "A2" },
        { "word": "happy", "time": 400, "cefr": "A2" },
        { "word": "food", "time": 500, "cefr": "A2" },
        { "word": "computer", "time": 250, "cefr": "A2" },
        { "word": "travel", "time": 200, "cefr": "A2" },
        { "word": "learn", "time": 350, "cefr": "A2" },
        { "word": "friend", "time": 150, "cefr": "B1" },
        { "word": "music", "time": 180, "cefr": "B1" },
        { "word": "city", "time": 220, "cefr": "B1" },
        { "word": "exercise", "time": 120, "cefr": "B1" },
        { "word": "experience", "time": 160, "cefr": "B1" },
        { "word": "nature", "time": 100, "cefr": "B1" },
        { "word": "technology", "time": 80, "cefr": "B2" },
        { "word": "environment", "time": 60, "cefr": "B2" },
        { "word": "challenge", "time": 150, "cefr": "B2" },
        { "word": "communication", "time": 100, "cefr": "B2" },
        { "word": "globalization", "time": 70, "cefr": "B2" },
        { "word": "innovation", "time": 130, "cefr": "B2" },
        { "word": "education", "time": 350, "cefr": "C1" },
        { "word": "perspective", "time": 180, "cefr": "C1" },
        { "word": "interaction", "time": 120, "cefr": "C1" },
        { "word": "complexity", "time": 90, "cefr": "C1" },
        { "word": "philosophy", "time": 200, "cefr": "C1" },
        { "word": "paradigm", "time": 140, "cefr": "C1" },
        { "word": "ball", "time": 1250, "cefr": "A1" },
        { "word": "tree", "time": 1300, "cefr": "A1" },
        { "word": "fish", "time": 1100, "cefr": "A1" },
        { "word": "car", "time": 1350, "cefr": "A1" },
        { "word": "flower", "time": 1400, "cefr": "A1" },
        { "word": "sun", "time": 1150, "cefr": "A1" },
        { "word": "swim", "time": 950, "cefr": "A2" },
        { "word": "rain", "time": 800, "cefr": "A2" },
        { "word": "jump", "time": 900, "cefr": "A2" },
        { "word": "dance", "time": 700, "cefr": "A2" },
        { "word": "laugh", "time": 600, "cefr": "A2" },
        { "word": "read", "time": 850, "cefr": "A2" },
        { "word": "movie", "time": 500, "cefr": "B1" },
        { "word": "game", "time": 550, "cefr": "B1" },
        { "word": "exercise", "time": 470, "cefr": "B1" },
        { "word": "listen", "time": 800, "cefr": "B1" },
        { "word": "write", "time": 680, "cefr": "B1" },
        { "word": "science", "time": 400, "cefr": "B2" },
        { "word": "history", "time": 430, "cefr": "B2" },
        { "word": "culture", "time": 350, "cefr": "B2" },
        { "word": "politics", "time": 380, "cefr": "B2" },
        { "word": "economy", "time": 300, "cefr": "B2" },
        { "word": "language", "time": 420, "cefr": "B2" },
        { "word": "philosophy", "time": 240, "cefr": "C1" },
        { "word": "literature", "time": 280, "cefr": "C1" },
        { "word": "knowledge", "time": 200, "cefr": "C1" },
        { "word": "innovation", "time": 180, "cefr": "C1" },
        { "word": "education", "time": 320, "cefr": "C1" },
        { "word": "experience", "time": 220, "cefr": "C1" },
        { "word": "bicycle", "time": 1100, "cefr": "A1" },
        { "word": "hat", "time": 1250, "cefr": "A1" },
        { "word": "bird", "time": 1300, "cefr": "A1" },
        { "word": "shoe", "time": 1350, "cefr": "A1" },
        { "word": "moon", "time": 1150, "cefr": "A1" },
        { "word": "flower", "time": 1200, "cefr": "A1" },
        { "word": "fly", "time": 950, "cefr": "A2" },
        { "word": "play", "time": 850, "cefr": "A2" },
        { "word": "sing", "time": 900, "cefr": "A2" },
        { "word": "swim", "time": 800, "cefr": "A2" },
        { "word": "sleep", "time": 750, "cefr": "A2" },
        { "word": "drink", "time": 700, "cefr": "A2" },
        { "word": "family", "time": 580, "cefr": "B1" },
        { "word": "sport", "time": 550, "cefr": "B1" },
        { "word": "nature", "time": 600, "cefr": "B1" },
        { "word": "music", "time": 520, "cefr": "B1" },
        { "word": "art", "time": 480, "cefr": "B1" },
        { "word": "technology", "time": 320, "cefr": "B2" },
        { "word": "environment", "time": 280, "cefr": "B2" },
        { "word": "culture", "time": 350, "cefr": "B2" },
        { "word": "communication", "time": 400, "cefr": "B2" },
        { "word": "challenge", "time": 380, "cefr": "B2" },
        { "word": "innovation", "time": 250, "cefr": "B2" },
        { "word": "philosophy", "time": 180, "cefr": "C1" },
        { "word": "literature", "time": 220, "cefr": "C1" },
        { "word": "knowledge", "time": 200, "cefr": "C1" },
        { "word": "leadership", "time": 150, "cefr": "C1" },
        { "word": "education", "time": 320, "cefr": "C1" },
        { "word": "experience", "time": 280, "cefr": "C1" }
    ]