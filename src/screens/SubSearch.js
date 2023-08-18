import React, {useEffect, useState, useRef} from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native';
import { withTiming } from "react-native-reanimated";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import serverAddress from "../global";
import { useNavigation } from "@react-navigation/native";
import Camera from "./Camera";
import { useSelector } from "react-redux";
import { userReturn } from "../store/store";

const axios = require('axios').default;



function SubSearch () {
  const userData = useSelector(userReturn);

const navigation = useNavigation();
const[historyFound, setHistoryFound]= useState([]);
const [videoFound, setVideoFound] = useState([]);
const [searched, setSearched] = useState(false);
const [wordToFind, setWordToFind] = useState('');
let word;
const [loading, setLoading] = useState(false);
const inputRef = useRef();
useEffect(() =>{
    return setSearched(false);
},[])
    const searchHandler = ()=> {
        //  console.log('pressed')
        // setLoading(true);
        if(wordToFind == '') {
            setSearched(false);
            return;
        }
        Keyboard.dismiss();
         console.log('pressed')
         setSearched(false);
        setLoading(true);

        console.log(wordToFind);
        setVideoFound([]);
        axios.post(`${serverAddress}/video/search-subtitle`, {
            "userId": userData.userId,
            "wordToFind": wordToFind
          })
          .then(function (response) {
            // console.log("this is response",response.data.data.history);
           

                setVideoFound(response.data.data.other);
        
    
                setHistoryFound(response.data.data.history);
            
            
            //console.log('console log response search subtitle api: ',response.data.data.finalRes.thumbnailurl.maxres.url);
          })
          .then(()=>{
            setLoading(false);
             setSearched(true);
            //  console.log("video found: ", videoFound);
          })
          .catch(function (error) {
            console.log(error.response);
            setLoading(false);
            setSearched(false);
            Alert.alert(error.response.data.error, error.response.data.message, [
                // {
                //   text: 'Cancel',
                //   onPress: () => console.log('Cancel Pressed'),
                //   style: 'cancel',
                // },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
          });
        
        // setSearched(true);
    }
    //console.log("video found, from outside: ", videoFound);
    return (
        <View  style = {{flex: 1, backgroundColor: '#153C43'}}>
            <Text style = {[styles.title, {marginTop: 15}]}>Search by Subtitles</Text>
            <View style={{ height: 60, width: "100%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 15 }}>
                <View style={{ width: "90%", flexDirection: 'row' }} >
                    <View style={{ width: 'auto', justifyContent: 'center', paddingLeft: 8, borderTopLeftRadius: 50, borderBottomLeftRadius: 50, backgroundColor: '#F1E4CA', paddingRight: 5 }}><FontAwesome name="search" size={25} color="gray"/></View>
                    <TextInput 
                        style={{ width: '90%', backgroundColor: '#F1E4CA', borderTopRightRadius: 50, borderBottomRightRadius: 50, color: "black" }}
                        placeholder="subtitle search"
                        placeholderTextColor="gray"
                        onChangeText={(v)=> {
                            setWordToFind(v);
                        
                            // console.log(wordToFind);
                        }}  
                        ref={inputRef}
                    />
                </View>
               
            </View>
            <View style ={{flexDirection:'row'}}>
            <Pressable
            onPress={()=>{searchHandler()}}
            >
                    <View style = {{height: 50, width: 220, backgroundColor: 'green', alignSelf: 'center', margin: 20, justifyContent: 'center', borderRadius: 10}}>
                        <Text style = {[styles.normalText, {fontSize: 15, textAlign: 'center', color: '#F1E4CA'}]}>Search</Text>
                    </View>
                </Pressable>
                <Pressable
                        onPress={()=>{
                            inputRef.current.clear();
                            setWordToFind('');
                            setSearched(false);
                            setLoading(false);
                            word = '';
                        }}
            >
                    <View style = {{height: 50, width: 80, backgroundColor: 'green', alignSelf: 'center', marginVertical: 20, justifyContent: 'center', borderRadius: 10}}>
                        <Text style = {[styles.normalText, {fontSize: 15, textAlign: 'center', color: '#F1E4CA'}]}>Reset</Text>
                    </View>
                </Pressable>
            </View>
            {!searched ? 
            <View style= {{marginHorizontal: 20}}>
                <ActivityIndicator
                size = 'large'
                animating = {loading}
                style = {{margin: 20}}
           />
                <Text style = {[styles.normalText, {textAlign: 'center'}]}>"Searching for specific words and phrases in a video allows you to have exposure to the targeted words in their natural context, enabling deliberate acquisition practice."</Text>
            
                <Image style={{height: 200, width: 200, alignSelf: 'flex-end', margin: 20}} source={require('../../assets/icons/tighnariTeaching.png')} />

            </View>
            
            :
            <View style = {{flex: 1}}>
                {/* <FlatList
                data = {DATA}
                renderItem={({item}) => (
                    <View style = {{height: 300, width: 340, backgroundColor: '#234B76', margin: 10, alignContent: 'center', borderRadius: 12}}>
                        <Image
                            style={{ height: 190, width: 320, alignSelf: 'center', margin: 10,  borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                            source={{ uri: 'https://variety.com/wp-content/uploads/2019/12/pewdiepie.png?w=1024' }}
                        />
                        <Text style={[styles.title, {fontSize: 17, textAlign: 'left', marginHorizontal: 15}]} numberOfLines={2}>{item.title}</Text>
                        <Text style={[styles.normalText, {fontSize: 14, textAlign: 'left', marginHorizontal: 15}]}>{item.content}</Text>

                     </View>   
                )}
                
                /> */}

                <FlatList
                    data={videoFound}
                    ListHeaderComponent={<View>
                        <Text style = {[styles.title,{textAlign: 'left', color: 'white', marginLeft: 20}]}>From your watch history:</Text>
                    <FlatList
                        data={historyFound}
                        renderItem={({ item }) => {
                            let thumbnailurl ='https://yaviet.com/wp-content/uploads/2018/08/loi-404-not-found-300x225.jpg';
                            if(item.thumbnailurl){
                                if(item.thumbnailurl.maxres){
                                    thumbnailurl =item.thumbnailurl.maxres.url;
                                }
                                else if (item.thumbnailurl.standard){
                                    thumbnailurl =item.thumbnailurl.standard.url;
                                } 
                                else if (item.thumbnailurl.high){
                                    thumbnailurl =item.thumbnailurl.high.url;
                                }
                                else if (item.thumbnailurl.medium){
                                    thumbnailurl =item.thumbnailurl.medium.url;
                                }
                                else if (item.thumbnailurl.default){
                                    thumbnailurl =item.thumbnailurl.default.url;
                                }
                            }
                            
                            
                        return <Pressable
                            android_ripple={{ color: 'white' }}
                            onPress={() => {
                                navigation.navigate('WatchVideo', {
                                    videoid: item.videoid,
                                    title: item.title,
                                    wordToFind: wordToFind
                                });
    
                            }}>
                            <View style={{ height: "auto", width: "90%", backgroundColor: '#234B76', margin: 10, borderRadius: 10, alignSelf: 'center', padding: 10 }}>
                                <Image
                                    style={{ height: 170, width: "100%", alignSelf: 'center', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                    source={{ uri: thumbnailurl }}
                                />
                                <Text style={[styles.videoTitle]} numberOfLines={2}>{item.title}</Text>
                                <Text style={[styles.normalText,{fontSize: 14, alignSelf: 'flex-end', marginHorizontal: 10}]} numberOfLines={1}>{item.channelname}</Text>
                                <Text style={[styles.normalText,{fontSize: 11, alignSelf: 'flex-start', marginHorizontal: 10, marginTop: 10, color: 'white'}]} numberOfLines={4}>Example: "...{item.samplesentence}..."</Text>
    
                            </View>
                        </Pressable>}
                        }
                    />
                    <Text style = {styles.title}>------------------------</Text>
                    <Text style = {[styles.title,{textAlign: 'left', color: 'white', marginLeft: 20, marginTop: 30}]}>Other things:</Text>
                    </View>}
                    renderItem={({ item }) => {
                        let thumbnailurl ='https://yaviet.com/wp-content/uploads/2018/08/loi-404-not-found-300x225.jpg';
                        if(item.thumbnailurl){
                            if(item.thumbnailurl.maxres){
                            thumbnailurl =item.thumbnailurl.maxres.url;
                        }
                        else if (item.thumbnailurl.standard){
                            thumbnailurl =item.thumbnailurl.standard.url;
                        } 
                        else if (item.thumbnailurl.high){
                            thumbnailurl =item.thumbnailurl.high.url;
                        }
                        else if (item.thumbnailurl.medium){
                            thumbnailurl =item.thumbnailurl.medium.url;
                        }
                        else if (item.thumbnailurl.default){
                            thumbnailurl =item.thumbnailurl.default.url;
                        }

                        }

                       
                        
                    return <Pressable
                        android_ripple={{ color: 'white' }}
                        onPress={() => {
                            navigation.navigate('WatchVideo', {
                                videoid: item.videoid,
                                title: item.title,
                                wordToFind: wordToFind

                            });

                        }}>
                        <View style={{ height: "auto", width: "90%", backgroundColor: '#234B76', margin: 10, borderRadius: 10, alignSelf: 'center', padding: 10 }}>
                            <Image
                                style={{ height: 170, width: "100%", alignSelf: 'center', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                source={{ uri: thumbnailurl }}
                            />
                            <Text style={[styles.videoTitle]} numberOfLines={2}>{item.title}</Text>
                            <Text style={[styles.normalText,{fontSize: 14, alignSelf: 'flex-end', marginHorizontal: 10}]} numberOfLines={1}>{item.channelname}</Text>
                            <Text style={[styles.normalText,{fontSize: 11, alignSelf: 'flex-start', marginHorizontal: 10, marginTop: 10, color: 'white'}]} numberOfLines={4}>Example: "...{item.samplesentence}..."</Text>

                        </View>
                    </Pressable>}
                    }
                    
                />
            </View>
        
        }


        </View>
    )
}

const styles = StyleSheet.create({
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
        fontSize: 17,
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
export default SubSearch;

const DATA = [
    {
        title: 'First Item asfd asdf a qrtj erituh adsfiuh idsufhoa aihfaoi adifhu aoifdh afdh',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa'
    },
    {
        title: 'Second Item',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa'

    },
    {
        title: 'Third Item',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa'

    },
    {
        title: 'First Item',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa'

    },
    {
        title: 'Second Item',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa'

    },
    {
        title: 'Third Item',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa'

    },
    {
        title: 'First Item',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa'

    },
    {
        title: 'Second Item',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa'

    },
    {
        title: 'Third Item',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa'
        
        
    },
    {
        title: 'First Item',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa'

    },
    {
        title: 'Second Item',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa'

    },
    {
        title: 'Third Item',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa'

    },
    {
        title: 'First Item',
        content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa'

    },
    {
        title: 'Second Item',
    },
    {
        title: 'Third Item',
    },
    {
        title: 'First Item',
    },
    {
        title: 'Second Item',
    },
    {
        title: 'Third Item',
    },
    {
        title: 'First Item',
    },
    {
        title: 'Second Item',
    },
    {
        title: 'Third Item',
    },
    {
        title: 'First Item',
    },
    {
        title: 'Second Item',
    },
    {
        title: 'Third Item',
    },
    {
        title: 'First Item',
    },
    {
        title: 'Second Item',
    },
    {
        title: 'Third Item',
    },
];