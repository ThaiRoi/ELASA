import React, {useState} from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    Image
} from 'react-native';
import { withTiming } from "react-native-reanimated";
import FontAwesome from 'react-native-vector-icons/FontAwesome';


function SubSearch () {
const [searched, setSearched] = useState(false);

    return (
        <View  style = {{flex: 1, backgroundColor: '#153C43'}}>
            <Text style = {styles.title}>Search by subtitles</Text>
            <View style={{ height: 60, width: "100%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 15 }}>
                <View style={{ width: "90%", flexDirection: 'row' }} >
                    <View style={{ width: 'auto', justifyContent: 'center', paddingLeft: 8, borderTopLeftRadius: 50, borderBottomLeftRadius: 50, backgroundColor: '#F1E4CA', paddingRight: 5 }}><FontAwesome name="search" size={25} /></View>
                    <TextInput style={{ width: '90%', backgroundColor: '#F1E4CA', borderTopRightRadius: 50, borderBottomRightRadius: 50 }}
                        placeholder="subtitle search"
                    />
                </View>
               
            </View>
            <View></View>
            <Pressable
            onPress={()=>{}}
            android_ripple={{color: 'white'}}
            >
                    <View style = {{height: 40, width: 150, backgroundColor: 'yellow', alignSelf: 'center', margin: 20}}>
                        <Text>Search</Text>
                    </View>
                </Pressable>
           

            <View style= {{}}>
                <Text style = {styles.normalText}>Searching for specific words and phrases in a video allows you to have exposure to the targeted words in their natural context, enabling deliberate acquisition practice.</Text>
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: '#F1E4CA',
        fontFamily: 'genshin',
        textAlign: 'center',
        margin: 10
    },
    normalText: {
        fontFamily: 'genshin', fontSize: 12, marginHorizontal: 5, color: '#E5D5A4'
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
export default SubSearch;