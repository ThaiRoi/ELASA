import React, {useState} from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList
} from 'react-native';

function History () {
    return (
        <View  style = {{flex: 1, backgroundColor: '#153C43'}}>

            <Text style={styles.title}>History</Text>

            <FlatList
                    data={DATA}
                    renderItem={({ item, index }) => <Pressable
                        android_ripple={{ color: 'white' }}
                        onPress={() => {
                            // navigation.navigate('WatchVideo', {
                            //     videoid: item.videoid,
                            //     title: item.title,
                            // });

                        }}>
                        <View style={{ height: 200, width: 260, backgroundColor: '#234B76', margin: 10, borderRadius: 10 }}>
                            {/* <Image
                                style={{ height: 140, width: 240, alignSelf: 'center', marginTop: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                source={{ uri: item.thumbnailurl.default.url}}
                            /> */}
                            <Text style={[styles.videoTitle]} numberOfLines={2}>{item.title}</Text>
                        </View>
                    </Pressable>
                    }
                    horizontal={false}
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