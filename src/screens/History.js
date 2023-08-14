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
import { useSelector } from "react-redux";
import { userReturn } from "../store/store";
import serverAddress from "../global";
import { useNavigation } from "@react-navigation/native";
const axios = require('axios').default;


function History () {
    const navigation = useNavigation();
    const userData = useSelector(userReturn);
    const [historyData, setHistoryData] = useState([]);
    useEffect(()=>{
        axios.post(`${serverAddress}/video/get-history`, {
                userid : userData.userId,
            })
            .then((response)=>{
                console.log("response:",response.data.data.finalRes);
                setHistoryData(response.data.data.finalRes);
            })
            .catch((e)=>{
                console.log(e);
            })
    },[])
   
    return (
        <View  style = {{flex: 1, backgroundColor: '#153C43'}}>

            <Text style={styles.title}>History</Text>

            <FlatList
                    data={historyData}
                    inverted = {true}
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
                        <View style={{ height: 400, width: '90%', backgroundColor: '#234B76', margin: 10, borderRadius: 10, alignSelf: 'center' }}>
                            <Image
                                style={{ height: 160, width: '90%', alignSelf: 'center', marginTop: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                source={{ uri: thumbnailurl }}
                            />
                            <Text style={[styles.videoTitle]} numberOfLines={2}>{item.title}</Text>
                            <Text style={[styles.normalText,{fontSize: 12, alignSelf: 'flex-end', marginHorizontal: 20}]} numberOfLines={1}>{item.channelname}</Text>
                            <Text style={[styles.normalText,{fontSize: 12, alignSelf: 'center', marginHorizontal: 20}]} >comprehension: {item.comprehensionlevel[item.comprehensionlevel.length-1]}%</Text>
                            <Text style={[styles.normalText,{fontSize: 12, alignSelf: 'center', marginHorizontal: 20}]} >last watched: {item.watchdate[item.watchdate.length-1]}</Text>
                            <Text style={[styles.normalText,{fontSize: 12, alignSelf: 'center', marginHorizontal: 20}]} >Watched {item.timeswatched} times</Text>
                            <Text style={[styles.normalText,{fontSize: 12, alignSelf: 'center', marginHorizontal: 20}]} >Watche time {item.watchtime}</Text>

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
        marginHorizontal: 20,
        marginVertical: 10
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
export default History;



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