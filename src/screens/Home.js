import React, { useDebugValue, useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    FlatList,
    ScrollView,
    Pressable,
    Alert

} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import serverAddress from "../global";
import { useSelector } from "react-redux";
import { userReturn } from "../store/store";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from "axios";


function Home() {
    const userData = useSelector(userReturn);
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [loginYoutube, setLoginYoutube] = useState(false);
    const [channelData, setChannelData]= useState();
    const [selectChannel, setSelectChannel] = useState();
    const [channelVideo, setChannelVideo] = useState();
    // var allow = false;
    const navigation = useNavigation();
    const [recommendData, setRecommendData] = useState([]);
    function getRecommendation() {
        fetch(`${serverAddress}/video/get-recommendation`)
            .then(response => response.json())
            .then(data => {
                //handle data
                setRecommendData(data.data.recommendation);
                // console.log("from home tab, recommend data: ", recommendData);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getRecommendation();
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/youtube.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '160860312025-uljkdhv5eivi9r8hficnae6u6mm8s26o.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            accountName: '', // [Android] specifies an account name on the device that should be used
            //  iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
            //    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
            // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
            //profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
        });

    }, [])

    // useEffect(() => {
    //     navigation.addListener('beforeRemove', (e) => {
    //         if (userData == null) return;
    //         e.preventDefault();

    //     })
    // }, [])

    // console.log(allow)

    const OriginalContent = () => {
        return (
            <ScrollView>
                <Text style={styles.titleView}>About English learning:</Text>
                <FlatList
                    data={englishLearningData}
                    renderItem={({ item }) => <Pressable
                        android_ripple={{ color: 'white' }}
                        onPress={() => {
                            navigation.navigate('WatchVideo', {
                                videoid: item.videoid,
                                title: item.title,
                            });

                        }}>
                        <View style={{ height: 215, width: 260, backgroundColor: '#234B76', margin: 10, borderRadius: 10 }}>
                            <Image
                                style={{ height: 140, width: 240, alignSelf: 'center', marginTop: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                source={{ uri: item.thumbnailurl }}
                            />
                            <Text style={[styles.videoTitle]} numberOfLines={2}>{item.title}</Text>
                            <Text style={[styles.normalText, { fontSize: 12, alignSelf: 'flex-end', marginHorizontal: 20 }]} numberOfLines={1}>{item.channelname}</Text>

                        </View>
                    </Pressable>}
                    horizontal={true}
                />
                <Text style={styles.titleView}>About the app:</Text>
                <FlatList
                    data={aboutAppData}
                    renderItem={({ item }) => <Pressable
                        android_ripple={{ color: 'white' }}
                        onPress={() => {
                            navigation.navigate('WatchVideo', {
                                videoid: item.videoid,
                                title: item.title,
                            });

                        }}>
                        <View style={{ height: 215, width: 260, backgroundColor: '#234B76', margin: 10, borderRadius: 10 }}>
                            <Image
                                style={{ height: 140, width: 240, alignSelf: 'center', marginTop: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                source={{ uri: item.thumbnailurl }}
                            />
                            <Text style={[styles.videoTitle]} numberOfLines={2}>{item.title}</Text>
                            <Text style={[styles.normalText, { fontSize: 12, alignSelf: 'flex-end', marginHorizontal: 20 }]} numberOfLines={1}>{item.channelname}</Text>

                        </View>
                    </Pressable>}
                    horizontal={true}
                />
                <Text style={styles.titleView}>Random English content:</Text>
                <FlatList
                    data={randomContentData}
                    renderItem={({ item }) => <Pressable
                        android_ripple={{ color: 'white' }}
                        onPress={() => {
                            navigation.navigate('WatchVideo', {
                                videoid: item.videoid,
                                title: item.title,
                            });

                        }}>
                        <View style={{ height: 215, width: 260, backgroundColor: '#234B76', margin: 10, borderRadius: 10 }}>
                            <Image
                                style={{ height: 140, width: 240, alignSelf: 'center', marginTop: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                source={{ uri: item.thumbnailurl }}
                            />
                            <Text style={[styles.videoTitle]} numberOfLines={2}>{item.title}</Text>
                            <Text style={[styles.normalText, { fontSize: 12, alignSelf: 'flex-end', marginHorizontal: 20 }]} numberOfLines={1}>{item.channelname}</Text>

                        </View>
                    </Pressable>}
                    horizontal={true}
                />
            </ScrollView>
        )
    }

    const ContentFromYourYoutube = () => {

        return (
            <ScrollView>

                {loginYoutube ?
                 
                            <View>
                                <Text style={[styles.titleView]}>Channels</Text>
                                <FlatList
                                    data={channelData.items}
                                    renderItem={({ item }) => (
                                        <Pressable
                                        onPress={()=>{
                                            console.log(item.snippet.title);
                                        }}
                                        >
                                        <View style={{ height: 'auto' }}>
        
                                        <Image 
                                         style={{ height: 80, width: 80, backgroundColor: 'green', margin: 5, borderRadius: 50, justifyContent: 'center' }}
                                        source={{uri: item.snippet.thumbnails.high.url}}
                                        />
                                  
                                </View></Pressable>
                                )
                                
                                }
                                    horizontal={true}
                                />
                                <Text style={styles.titleView}>Videos from the channel:</Text>
                                


                            </View>
                   

                    : <View style={{ flex: 1 }} >
                        <View style = {{height: 100, width: "80%",justifyContent: 'center', alignSelf: 'center'}}>
                        <Text style={[styles.normalText, { textAlign: 'center' }]}>Login to your Google account to see videos from the channels you subscribed to</Text>
                        
                        </View>

                        <Pressable
                style = {{width: "80%", height: 50, backgroundColor: 'green', alignSelf: 'center', justifyContent: 'center', borderRadius: 10}}
                onPress={async ()=>{
                    const user = await GoogleSignin.signIn();
                    console.log(user);
                    
                    axios.get('https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=25&mine=true&key=AIzaSyDil_bOsqhaiAFE3wNeraXB5wQrq_vsLBc',
                     {
                        headers: {
                          'Authorization': `Bearer ${(await GoogleSignin.getTokens()).accessToken}`,
                          'Accept' : 'application/json'
                        }
                    }
                    )
                    .then(res =>{
                        console.log(res.data)
                        setChannelData(res.data);
                        setLoginYoutube(true);
                    })
                }}
                >
                   <Text style = {[styles.normalText,{textAlign: 'center'}]}>Login to Google</Text>
                </Pressable> 
                          
                    </View>
                }

            </ScrollView>
        )
    }

    const ContentMain = () => {

        return (
            <ScrollView>
                <Text style={styles.titleView}>Creator's recommendations:</Text>
                <FlatList
                    data={recommendData}
                    renderItem={({ item }) => <Pressable
                        android_ripple={{ color: 'white' }}
                        onPress={() => {
                            navigation.navigate('WatchVideo', {
                                videoid: item.videoid,
                                title: item.title,
                            });

                        }}>
                        <View style={{ height: 215, width: 260, backgroundColor: '#234B76', margin: 10, borderRadius: 10 }}>
                            <Image
                                style={{ height: 140, width: 240, alignSelf: 'center', marginTop: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                source={{ uri: item.thumbnailurl.maxres.url }}
                            />
                            <Text style={[styles.videoTitle]} numberOfLines={2}>{item.title}</Text>
                            <Text style={[styles.normalText, { fontSize: 12, alignSelf: 'flex-end', marginHorizontal: 20 }]} numberOfLines={1}>{item.channelname}</Text>

                        </View>
                    </Pressable>
                    }
                    horizontal={true}
                />
                <Text style={styles.titleView}>Spaced Repetition Zone:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Pressable
                        onPress={() => { navigation.navigate('VideoRepetition') }}
                    >
                        <View style={{ height: 160, width: 160, backgroundColor: '#5BB467', borderRadius: 10 }}>
                            <Text style={[styles.titleView, { color: '#153C43', fontSize: 20 }]}>Video</Text>
                            <Text style={styles.normalText}>{"Revisit videos to see how much more you understand"}</Text>
                            <Text style={{ fontFamily: 'genshin', fontSize: 20, marginRight: 10, alignSelf: 'flex-end', color: '#E5D5A4' }}>{">>"}</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={() => { navigation.navigate('MemoRepetition') }}

                    >
                        <View style={{ height: 160, width: 160, backgroundColor: '#5BB467', borderRadius: 10 }}>
                            <Text style={[styles.titleView, { color: '#153C43', fontSize: 20 }]}>Memo</Text>
                            <Text style={[styles.normalText, { margin: 7 }]}>{"Revisit memos you created to get a refresher"}</Text>
                            <Text style={{ fontFamily: 'genshin', fontSize: 20, marginRight: 10, marginTop: 5, alignSelf: 'flex-end', color: '#E5D5A4' }}>{">>"}</Text>
                        </View>
                    </Pressable>
                </View>
                <Text style={styles.titleView}>Analysis/Statistic:</Text>
                <View style={{ height: 500, width: 300, backgroundColor: '#5BB467', alignSelf: 'center', marginBottom: 40, borderRadius: 10 }}>
                    <Text>Statictic</Text>
                    <Text>Videos watched</Text>
                    <Text>Hours watched</Text>
                    <Text></Text>
                    <Text>Statictic</Text>
                    <Text>Statictic</Text>

                    <Pressable
                        onPress={() => { navigation.navigate('Statistic') }}
                        style={{ alignSelf: 'center', marginTop: 300 }}
                    >
                        <View style={{ width: 200, height: 50, backgroundColor: 'green', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.normalText}>See more:</Text>
                        </View>
                    </Pressable>
                </View>

            </ScrollView>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#153C43" }}>
            <Pressable
                onPress={() => {
                    console.log(userData);
                }}
            >
                <Text style={[styles.title, { marginTop: 15 }]}>HOME</Text>
            </Pressable>
            <View style={{ height: 60, width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15 }}>
                {/* <View style={{ height: 50, justifyContent: 'center' }}>
                    <Image style={{ height: 45, width: 41, margin: 5 }} source={require('../../assets/icons/user.png')} />
                </View> */}
                <View style={{ width: "85%", flexDirection: 'row', alignSelf: 'center', alignContent: 'center', marginHorizontal: 20 }} >
                    <View style={{ width: 'auto', justifyContent: 'center', paddingLeft: 8, borderTopLeftRadius: 50, borderBottomLeftRadius: 50, backgroundColor: '#F1E4CA', paddingRight: 5 }}>
                        <FontAwesome name="search" size={25} color="gray" /></View>
                    <TextInput

                        style={{ width: '90%', backgroundColor: '#F1E4CA', borderTopRightRadius: 50, borderBottomRightRadius: 50, color: "black" }}
                        placeholder="video search"
                        placeholderTextColor="gray"

                        onChangeText={(v) => { setKeyword(v) }}
                        onSubmitEditing={() => {
                            navigation.navigate('VideoSearch', { keyword: keyword })
                        }}
                    />
                </View>
                {/* <View style={{ marginHorizontal: 15 }}>
                    <FontAwesome name="cog" color={'#5BB467'} size={45} />
                </View> */}
            </View>

            <View style={{ margin: 10, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>

                <View style={[(page == 1) ? styles.activeTitleView : styles.inactiveTitleView, { flex: 1 }]}>
                    <Pressable onPress={() => setPage(1)}>
                        <Text style={(page == 1) ? styles.activeTitle : styles.title}>Main</Text>
                    </Pressable>
                </View>



                <View style={[(page == 2) ? styles.activeTitleView : styles.inactiveTitleView, { flex: 1.5 }]}>
                    <Pressable onPress={() => setPage(2)}>
                        <Text style={(page == 2) ? styles.activeTitle : styles.title}>From your Youtube</Text>
                    </Pressable>
                </View>



                <View style={[(page == 3) ? styles.activeTitleView : styles.inactiveTitleView, , { flex: 1 }]}>
                    <Pressable onPress={() => setPage(3)}>
                        <Text style={(page == 3) ? styles.activeTitle : styles.title}>Original content</Text>
                    </Pressable>
                </View>

            </View>

            <View style={{ flex: 1 }}>
                <View style={{ display: ((page == 1) ? 'flex' : 'none') }} >
                    <ContentMain />
                </View>

                <View style={{ display: ((page == 2) ? 'flex' : 'none') }} >
                    <ContentFromYourYoutube />
                </View>

                <View style={{ display: ((page == 3) ? 'flex' : 'none') }}>
                    <OriginalContent />
                </View>

            </View>
        </View>
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
        fontSize: 20,
        color: '#F1E4CA',
        fontFamily: 'genshin',
        textAlign: 'left',
        margin: 15,
    },
})
export default Home;


const Recommend = ({ title }) => (

    <View style={{ height: 200, width: 260, backgroundColor: '#234B76', margin: 10, borderRadius: 10 }}>
        <Image
            style={{ height: 140, width: 240, alignSelf: 'center', marginTop: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
            source={{ uri: 'https://variety.com/wp-content/uploads/2019/12/pewdiepie.png?w=1024' }}
        />
        <Text style={[styles.videoTitle]} numberOfLines={2}>{title}</Text>
    </View>

);

const Channel = ({ title }) => (
    <View style={{ height: 'auto' }}>
        
            <Image 
             style={{ height: 80, width: 80, backgroundColor: 'green', margin: 5, borderRadius: 50, justifyContent: 'center' }}
            source={{uri: title}}
            />
      
    </View>
);
const Video = ({ title }) => (
    <View style={{ height: 300, width: '95%', backgroundColor: 'green', margin: 10, borderRadius: 10, justifyContent: 'center' }}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const RandomContentVideo = ({ title }) => (
    <View style={{ height: 200, width: 200, backgroundColor: 'green', margin: 5, borderRadius: 10, justifyContent: 'center' }}>
        <Text style={styles.title}>{title}</Text>
    </View>
);


const englishLearningData = [
    {
        "videoid": "Vv4VCHcxVN4",
        "title": "Workshop học tiếng Anh như thế nào",
        "thumbnailurl": "https://i.ytimg.com/vi/Vv4VCHcxVN4/maxresdefault.jpg",
        "uploaddate": "whocares",
        "channelid": "thairoi8382",
        "channelname": "Thái Roi"
    },
    {
        "videoid": "GkYpv5Q9vSA",
        "title": "Cách duy nhất để học được tiếng Anh",
        "thumbnailurl": "https://img.youtube.com/vi/GkYpv5Q9vSA/hqdefault.jpg",
        "uploaddate": "whocares",
        "channelid": "thairoi8382",
        "channelname": "Thái Roi"
    },

]

const aboutAppData = [
    {
        "videoid": "bepkjsOwfg0",
        "title": "Không tìm được sub xử lý như thế nào?",
        "thumbnailurl": "https://i.ytimg.com/vi/tDfpQ3_zijM/maxresdefault.jpg",
        "uploaddate": "whocares",
        "channelid": "thairoi8382",
        "channelname": "Thái Roi"
    },


]

const randomContentData = [
    {
        "videoid": "R77ZvlHOGwU",
        "title": "Midnight deep Would you rather questions",
        "thumbnailurl": "https://i.ytimg.com/vi/R77ZvlHOGwU/maxresdefault.jpg",
        "uploaddate": "whocares",
        "channelid": "thairoi8382",
        "channelname": "Thái Roi"
    },
    {
        "videoid": "AF-4QwKMBJs",
        "title": "Valorant #2",
        "thumbnailurl": "https://img.youtube.com/vi/AF-4QwKMBJs/hqdefault.jpg",
        "uploaddate": "whocares",
        "channelid": "thairoi8382",
        "channelname": "Thái Roi"
    },
    {
        "videoid": "m4zdNxjLbZI",
        "title": "Tôi lồng tiếng Tighnari",
        "thumbnailurl": "https://img.youtube.com/vi/m4zdNxjLbZI/hqdefault.jpg",
        "uploaddate": "whocares",
        "channelid": "thairoi8382",
        "channelname": "Thái Roi"
    },

]


const DATA = [
    {
        title: 'First Item asfd asdf a qrtj erituh adsfiuh idsufhoa aihfaoi adifhu aoifdh afdh',
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
