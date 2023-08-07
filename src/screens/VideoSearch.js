import React, {useEffect, useState} from "react";
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
const axios = require('axios').default;
import { useNavigation } from "@react-navigation/native";
import serverAddress from "../global";


function VideoSearch ({route}) {
    const navigation = useNavigation();
    const {keyword} = route.params;
    const [videoSearched, setVideoSearched] = useState([]);
    console.log("this is keyword",keyword);
    const searchVideo = ()=>{
         axios.post(`${serverAddress}/video/search-video`, {
        "keyword": keyword
      })
      .then((response)=>{
        setVideoSearched(response.data.data.finalRes);
      }
        
        
      )
    }
    useEffect(()=>{
        searchVideo();
    },[])
   

    return (
        <View  style = {{flex: 1, backgroundColor: '#153C43'}}>

            <Text style={styles.title}>{keyword}</Text>

            <FlatList
                    data={videoSearched}
                    renderItem={({ item }) => {
                        let thumbnailurl ='';
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
                        
                    return <Pressable
                        android_ripple={{ color: 'white' }}
                        onPress={() => {
                            navigation.navigate('WatchVideo', {
                                videoid: item.videoid,
                                title: item.title,
                            });

                        }}>
                        <View style={{ height: 215, width: 260, backgroundColor: '#234B76', margin: 10, borderRadius: 10, alignSelf: 'center' }}>
                            <Image
                                style={{ height: 140, width: 240, alignSelf: 'center', marginTop: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                source={{ uri: thumbnailurl }}
                            />
                            <Text style={[styles.videoTitle]} numberOfLines={2}>{item.title}</Text>
                            <Text style={[styles.normalText,{fontSize: 12, alignSelf: 'flex-end', marginHorizontal: 20}]} numberOfLines={1}>{item.channelname}</Text>

                        </View>
                    </Pressable>}
                    }
                    
                />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: '#F1E4CA',
        fontFamily: 'genshin',
        textAlign: 'center',
        margin :15
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
export default VideoSearch;



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