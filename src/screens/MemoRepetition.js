import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import serverAddress from "../global";
import { useSelector } from "react-redux";
import { userReturn } from "../store/store";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
function MemoRepetition () {
    const navigation = useNavigation();
    const userData = useSelector(userReturn);
    const [memoData, setMemoData] = useState([]);
    useEffect(()=>{
        axios.post(`${serverAddress}/memo/get-memo`, {
                userid : userData.userId,
            })
            .then((response)=>{
                console.log("response:",response.data.data);
                setMemoData(response.data.data);
            })
            .catch((e)=>{
                console.log(e);
            })
    },[])
    return (
        <View style = {{flex: 1, backgroundColor: '#153C43'}}>
            <View style = {{margin: 20}}>
            <Text style = {styles.title}>Memo List</Text>
            </View>
            <Text style = {styles.videoTitle}>Memos for today: </Text>
            <FlatList
                data={memoData.slice(0,3)}
                renderItem={({item}) => <View style={{ height: "auto", padding: 10, width: 320, backgroundColor: '#234B76', margin: 20}}>
                    <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 6 }}>
                            <Text style={[styles.title]}>{item.title}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end'}}>
                           
                        </View>
                    </View>
                    <Pressable
                onPress={()=>{
                    if(item.videoid){
                        
                    navigation.navigate("WatchVideo", {videoid: item.videoid});
                    }
                }}
                android_ripple={{color: "white"}}
                >
                    { item.imageurl ?
                       <Image
                        source={{ uri: `${serverAddress}/uploads/${item.imageurl}.jpeg` }}
                        style={{ height: 200, width: 300, alignSelf: 'center' }}
                    /> 
                    : 
                    <View></View>
                    }
                    

                    <Text style={[styles.normalText,]} numberOfLines={6}>
                       {item.description}
                       </Text>
                    {
                        item.videoid ?
                        <View style= {{padding: 10}}><Text>From video: {item.videoid}</Text></View>
                        
                        :
                        <View></View>
                    }
                
                    </Pressable>
                    <View style = {{height: 50, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Pressable
                        onPress={()=>{
                            Toast.show({
                                type: 'success',
                                text1: "Let's go!!!",
                                text2: 'We have saved your progress👋',
                                visibilityTime: 5000
                              });
                        }}
                        ><View
                        style = {{height: 40, backgroundColor: 'green', justifyContent: 'center', padding: 5, borderRadius:5}}
                        ><Text>Doesn't remember</Text></View></Pressable>

                        <Pressable
                        onPress={()=>{
                            Toast.show({
                                type: 'success',
                                text1: "Let's go!!!",
                                text2: 'We have saved your progress👋',
                                visibilityTime: 1000
                              });
                        }}>
                           <View
                        style = {{height: 40, backgroundColor: 'green', justifyContent: 'center', padding: 5, borderRadius:5}}
                        ><Text>Remembered!</Text></View> 
                        </Pressable>
                        
                    </View>
                </View>
                
                }
            />

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

export default MemoRepetition;