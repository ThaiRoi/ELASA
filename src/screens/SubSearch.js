import React, {useState} from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    FlatList
} from 'react-native';
import { withTiming } from "react-native-reanimated";
import FontAwesome from 'react-native-vector-icons/FontAwesome';


function SubSearch () {
const [searched, setSearched] = useState(false);

    return (
        <View  style = {{flex: 1, backgroundColor: '#153C43'}}>
            <Text style = {[styles.title, {marginTop: 15}]}>Search by Subtitles</Text>
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
            onPress={()=>{setSearched(!searched)}}
            >
                    <View style = {{height: 50, width: 200, backgroundColor: 'green', alignSelf: 'center', margin: 20, justifyContent: 'center', borderRadius: 10}}>
                        <Text style = {[styles.normalText, {fontSize: 15, textAlign: 'center', color: '#F1E4CA'}]}>Search</Text>
                    </View>
                </Pressable>
           

            {!searched ? 
            <View style= {{margin: 20}}>
                <Text style = {[styles.normalText, {textAlign: 'center'}]}>Searching for specific words and phrases in a video allows you to have exposure to the targeted words in their natural context, enabling deliberate acquisition practice.</Text>
            
                <Image style={{height: 200, width: 200, alignSelf: 'flex-end', margin: 20}} source={require('../../assets/icons/tighnariTeaching.png')} />

            </View>
            
            :
            <View style = {{flex: 1}}>
                <FlatList
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