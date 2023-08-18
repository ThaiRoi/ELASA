import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import { Image } from "react-native-animatable";
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

function CreateMemo({ route }) {

    const {sub} = route.params;
    
    console.log("this is sub",sub)
    const navigation = useNavigation();
    const [videoid, setVideoid] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [titleState, setTitleState] = useState('');
    const [description, setDescription] = useState('');
    const [captionStart, setCaptionStart] = useState('');
        useEffect(()=>{
    if(sub){
    setDescription(sub.text);
    setCaptionStart(sub.start);
    }
},[])
    
    return (
        <ScrollView style={{flex: 1, backgroundColor: '#153C43' }}>
            
            <View style={{ margin: 20, flexDirection: 'row', marginBottom: 30 }}>
                <Pressable 
                onPress={()=>{
                    navigation.goBack();
                }}
                >
                   <Text style={[styles.title, {width: 30, marginRight: 20,}]}>{"<"}</Text> 
                </Pressable>
                
                <Text style={[styles.title, {color: '#F2DD7D'}]}>Create Memo</Text>
            </View>
            {/* <Text style={styles.videoTitle}>Title:</Text> */}
            <TextInput
                style={{ width: "90%", height: 50, backgroundColor: '#F1E4CA', alignSelf: 'center', borderRadius: 10, color: 'black', fontFamily: 'genshin', fontSize: 20, marginBottom: 10, elevation: 3 }}
                textAlign="center"
                placeholder= "word to remember..."
                placeholderTextColor={"gray"}
                defaultValue= {titleState}
                onChangeText={(v)=>{
                    setTitleState(v);
                }}
            />
            <TextInput
                style={{ width: "90%", height: 200, backgroundColor: '#F1E4CA', alignSelf: 'center', borderRadius: 10, color: 'black', fontFamily: 'genshin', padding: 10, elevation: 3, marginBottom: 30 }}
                multiline={true}
                textAlignVertical="top"
                placeholder="description"
                defaultValue= {description}
                placeholderTextColor={"gray"}
            />
            <Text style={styles.videoTitle}>Image:</Text>


            {imagePath
                ?
                <Image
                    style={{ height: 300, width: 300, alignSelf: 'center',}}
                    source={{ uri: imagePath }}
                    resizeMode="center"
                />
                :
                <View style={{ height: 300, width: 300, backgroundColor: '#31333B', alignSelf: 'center', marginHorizontal: 10, justifyContent: 'center' }}>
                    <Text style = {[styles.normalText, {color: 'gray'}]}>No image</Text>
                    <Text style = {[styles.normalText, {color: 'gray'}]}>You can add one by taking a photo or choosing from library!</Text>

                </View>
            }

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 10 }}>
                
                <Pressable
                    style={{ height: 50, width: "auto", borderRadius: 10, justifyContent: 'center', marginHorizontal: 10}}
                    onPress={() => {
                        ImagePicker.openCamera({
                            width: 300,
                            height: 300,
                            mediaType: 'photo',
                            cropping: false,
                        }).then(image => {
                            setImagePath(image.path);
                            console.log(image);
                        })
                            .catch((err) => {

                                console.log(err);
                            })
                    }}
                >
                    <FontAwesome name='camera' size={25} color="#5BB467" />
                </Pressable>
                <Pressable
                    style={{ height: 50, width: "auto", borderRadius: 10, justifyContent: 'center', marginHorizontal: 10 }}
                    onPress={() => {
                        ImagePicker.openPicker({
                            width: 300,
                            height: 300,
                            mediaType: 'photo',
                            cropping: false
                        }).then(image => {
                            setImagePath(image.path);

                            console.log(image);
                        }).catch((err) => {
                            console.log(err);
                        })
                    }}
                >
                                        <FontAwesome name='image' size={25} color="#5BB467" />

                </Pressable>
                <Pressable
                    style={{ height: 50, width: "auto", borderRadius: 10 }}  
                    onPress={() => {
                        setImagePath(''); //thumbnail
                    }}
                >
                    <Text style={[styles.normalText, { textDecorationLine: 'underline', marginHorizontal: 10 , color: '#5BB467' }]}>Default</Text>
                </Pressable>
                <Pressable
                    style={{ height: 50, width: "auto", borderRadius: 10 }}  
                    onPress={() => {
                        setImagePath('');
                    }}
                >
                    <Text style={[styles.normalText, { textDecorationLine: 'underline', marginHorizontal: 10 , color: '#5BB467' }]}>Clear</Text>
                </Pressable>

            </View>

            <Text style= {[styles.normalText, {textAlign: 'left', marginLeft: 20}]}>From video: </Text>      
            <Text style= {[styles.normalText, {textAlign: 'left', marginLeft: 20}]}>Caption starts at: {captionStart}</Text>          

            {/* <Text style={styles.videoTitle}>Note:</Text> */}
          
         <Pressable
         onPress={()=>{
        
         }}
         style = {{height: 50, width: "90%", justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10,margin: 20, marginTop: 40, backgroundColor: "#5BB467"}}
         android_ripple={{color: 'white'}}
         >
            <View>
                <Text style={[styles.videoTitle, {fontSize: 22, margin: 0, color: '#F1E4CA'}]}>Save</Text>
            </View>
         </Pressable>
            
             <Pressable
             onPress={()=>{
                navigation.goBack();
             }}
             >
                <Text style={[styles.videoTitle, {color: '#F1E4CA', textDecorationLine : "underline", fontSize: 15, alignSelf: 'center', margin: 20 }]}>Cancel</Text>
           
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
        fontSize: 20,
        color: '#F1E4CA',
        fontFamily: 'genshin',
        textAlign: 'center'
    },
    normalText: {
        fontFamily: 'genshin', fontSize: 15, marginHorizontal: 5, color: '#E5D5A4', textAlign : 'center', margin: 12
    },
    videoTitle: {
        fontSize: 17,
        color: '#F2DD7D',
        fontFamily: 'genshin',
        textAlign: 'left',
        margin: 12,
        marginHorizontal: 20
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

export default CreateMemo;