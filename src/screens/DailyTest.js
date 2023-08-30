import React, { useState, useRef, useEffect, memo } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableOpacity,
    Keyboard,
    ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CardFlip from 'react-native-card-flip';
import { Image } from "react-native-animatable";

import axios from "axios";
import serverAddress from "../global";
import { useSelector } from "react-redux";
import { userReturn } from "../store/store";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
function DailyTest() {
    const cardRef = useRef();
    const [result, setResult] = useState('');
    const navigation = useNavigation();
    const userData = useSelector(userReturn);
    const [memoData, setMemoData] = useState([]);
    const [currentMemo, setCurrentMemo] = useState(0);
    const [flipped, setFlip] = useState(false)
    useEffect(() => {
        axios.post(`${serverAddress}/memo/get-memo`, {
            userid: userData.userId,
        })
            .then((response) => {
                console.log("response:", response.data.data);
                setMemoData(response.data.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [])
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#153C43' }}>
            <View style={{ margin: 20 }}>
                <Text style={styles.title}>DailyTest</Text>
            </View>
            
            <Text style={[styles.normalText, {alignSelf: 'center'}]}>{currentMemo}/{memoData.length-1}</Text>
            <Text style={[styles.normalText, {paddingLeft: 20}]}>What is this?</Text>
            {
                memoData.length !=0 ?
                    <View>
                        <View style={{ height: 350, margin: 20 }}>
                            <CardFlip style={{ width: '80%', alignSelf: 'center' }} ref={cardRef}  >
                                <TouchableOpacity style={{ height: 300, width: '100%', backgroundColor: '#31333B' }} onPress={() => cardRef.current.jiggle()} >
                                    {
                                        memoData[currentMemo].imageurl ? <Image
                                            style={{ height: '100%', width: "100%" }}
                                            resizeMode="contain"
                                            source={{uri : `${serverAddress}/uploads/${memoData[currentMemo].imageurl}.jpeg`}}
                                        />
                                            :
                                            <View></View>
                                    }
                                    <Text style={[styles.normalText,]} numberOfLines={6}>
                                        {memoData[currentMemo].description}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 300, width: '100%', backgroundColor: 'gray', justifyContent: 'center' }} onPress={() => cardRef.current.jiggle()} >
                                    <Text
                                        style={[styles.title]}
                                    >{flipped ? memoData[currentMemo].title : ""}</Text></TouchableOpacity>
                            </CardFlip>
                        </View>

                        <Text style={styles.normalText}>Your answer is:</Text>
                        <TextInput

                            style={{ width: '90%', backgroundColor: '#F1E4CA', borderRadius: 50, color: "black", alignSelf: 'center' }}
                            placeholder="title"
                            placeholderTextColor="gray"
                            defaultValue={result}
                            onChangeText={(v) => {
                                setResult(v)
                                console.log(v)
                            }}
                        />
                        <Pressable
                            style={{ height: 50, width: 100, alignSelf: "center", backgroundColor: 'green', margin: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                if(result.toLowerCase() == memoData[currentMemo].title.toLowerCase()){
                                    cardRef.current.flip();
                                    setFlip(true);
                                }
                                else { cardRef.current.jiggle();}
                                   
                                
                            }}
                        >
                            <Text style={styles.normalText}>Submit</Text>
                        </Pressable>
                    </View>
                    :
                    <View></View>
            }
     <View style = {{height: 50, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Pressable
                        onPress={()=>{
                           if(currentMemo>0){
                            setCurrentMemo(currentMemo-1);
                            setResult('')
                            if(flipped){
                                setFlip(false);
                                cardRef.current.flip();
                            }
                           }
                        }}
                        ><View
                        style = {{height: 40,width: 100, backgroundColor: 'green', justifyContent: 'center', padding: 5, borderRadius:5}}
                        ><Text>Previous</Text></View></Pressable>

                        <Pressable
                        onPress={()=>{
                            if(currentMemo<memoData.length - 1){
                                setCurrentMemo(currentMemo+1);
                                setResult('')
                                if(flipped){
                                    setFlip(false);
                                    cardRef.current.flip();
                                }
                            }
                        }}>
                           <View
                        style = {{height: 40,width: 100,  backgroundColor: 'green', justifyContent: 'center', padding: 5, borderRadius:5}}
                        ><Text>Next</Text></View> 
                        </Pressable>
                        
                    </View>


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