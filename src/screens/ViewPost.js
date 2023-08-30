import React, {useState, useEffect, useRef} from "react";
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
    ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";
import { userReturn } from "../store/store";
function ViewPost ({route}) {
    const userData = useSelector(userReturn);
    const inputRef = useRef();
    const {item} = route.params;
    const [comment, setComment] = useState([]);
    const [iconColor, setIconColor] = useState(true);
    const [content, setContent] = useState('');

    useEffect(()=>{
        setComment(item.comments)
    },[])
    // console.log(item)
    return (
        <ScrollView style = {{flex: 1, backgroundColor: '#153C43'}}>
            <View style = {{margin: 20}}>
            <Text style = {styles.title}>{item.title}</Text>
            </View>
 
                    <Image
                        source={{ uri: item.imageURL }}
                        style={{ height: 222, width: 333, alignSelf: 'center', marginBottom: 20 }}
                    />
                    <Text style={[styles.normalText, {marginHorizontal: 35}]} numberOfLines={6}>
                       Description:
                       </Text>
                    <Text style={[styles.normalText, {marginHorizontal: 20}]} numberOfLines={6}>
                       {item.description}
                       </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, borderBottomColor: 'gray', borderBottomWidth: 2, paddingBottom: 20 }}>
                        <Pressable
                        onPress={()=>{setIconColor(!iconColor)}}
                        >
                        <View style={{ flexDirection: 'row', paddingHorizontal: 20}}>
                        <FontAwesome name="heart" size={30} color= {iconColor ? "gray" : "pink"} />    
                            <Text style={styles.normalText}>{item.likes + (iconColor ? 0 : 1)}</Text>
                        </View>
                        </Pressable>
                        <Text style={styles.normalText}>{item.author}</Text>
                    </View>
                    <Text style={[styles.normalText, {padding: 10, color: 'green', fontSize: 25}]}>Comments: </Text>

                    {/* <FlatList
                    data = {item.comments}
                    renderItem={({item}) => (<View>
                    <Text style={[styles.normalText, {padding: 10}]}>{item.author}</Text>
                    <Text style={[styles.normalText, {padding: 10}]}>{item.content}</Text>


                    </View>)}
                    /> */}
                    {
                        comment.length != 0 ?
                        comment.map((item, index)=> <View key={index} style= {{backgroundColor: '#234B76', margin: 5}}>
                        <Text style={[styles.videoTitle, {paddingHorizontal: 10, paddingTop: 5, marginTop: 5}]}>{item.author}</Text>
                        <Text style={[styles.titleView, {paddingHorizontal: 10, paddingBottom: 5, marginBottom: 5}]}>{item.content}</Text>
                        </View>)
                        : 
                        <View></View>
                    }

                <TextInput
                style={{margin: 20, width: "90%", height: 60, backgroundColor: '#F1E4CA', alignSelf: 'center', borderRadius: 10, color: 'black', fontFamily: 'genshin', fontSize: 20, marginBottom: 10, elevation: 3 }}
                defaultValue= {content}
                placeholder= "add your comment..."
                placeholderTextColor={"gray"}
                onChangeText={(v)=>{
                    setContent(v)
                }}
            />
                <Pressable
                onPress={()=>{
                    if(content.length==0) return;
                    const newcomment = {
                        "author": userData.account,
                        "content": content
                    }
                    const newArr = comment.concat(newcomment)
                    setComment(newArr)
                    // console.log("this is new comment",newcomment)
                    setContent('');
                }}
                >
                <View style = {{height: 50, width: '90%', padding: 10, borderRadius: 10, backgroundColor: '#5BB467', alignSelf: 'center', alignItems: 'center'}}>
                    
                    <Text style={[styles.normalText, {color: '#153C43'}]}>Post</Text>
                    </View>
                </Pressable>
                <View style = {{height: 100}}></View>
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
        fontSize: 25,
        color: '#F1E4CA',
        fontFamily: 'genshin',
        textAlign: 'center'
    },
    normalText: {
        fontFamily: 'genshin', fontSize: 18, marginHorizontal: 5, color: '#E5D5A4'
    },
    videoTitle: {
        fontSize: 20,
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
    },
})

export default ViewPost;