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

function Social () {
    return (
        <View  style = {{flex: 1, backgroundColor: '#153C43'}}>
            <Text style = {[styles.title, {marginTop: 15}]}>Social</Text>
             <View style={{ height: 50, flexDirection: 'row'}}>
                    <Image style={{ height: 45, width: 41, margin: 5 }} source={require('../../assets/icons/user.png')} />
                    <Text style= {styles.normalText}>Post with Memo</Text>
                </View>
            
            <Text style= {styles.normalText}>?</Text>

            <Text style= {styles.normalText}>profile</Text>

            <View style = {{backgroundColor: 'green'}}>
            <Text style= {styles.normalText}>Title</Text>
            <Text style= {styles.normalText}>Captions</Text>
            <Text style= {styles.normalText}>media</Text>
            <Text style= {styles.normalText}>author</Text>
            <Text style= {styles.normalText}>likes</Text>
            <Text style= {styles.normalText}>comments
            </Text>




                

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
        fontSize: 15,
        color: '#F1E4CA',
        fontFamily: 'genshin',
        textAlign: 'left',
        margin: 15,
    },
})
export default Social;