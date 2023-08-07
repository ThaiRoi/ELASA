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

function Social () {
    return (
        <View  style = {{flex: 1, backgroundColor: '#153C43'}}>
            <Text style = {[styles.title, {marginTop: 15}]}>Social</Text>
             <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center'}}>
                    <Image style={{ height: 45, width: 41, margin: 5 }} source={require('../../assets/icons/user.png')} />
                    <Text style= {styles.normalText}>Post with Memo</Text>
                    <Text style= {styles.normalText}>!! Rules</Text>
                </View>
            
            

            <Text style= {styles.normalText}>profile</Text>

            {/* <View style={{ backgroundColor: 'green', width: 320, justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={styles.normalText}>Title       save</Text>
                <Text style={styles.normalText}>media</Text>
                <Text style={styles.normalText}>Captions</Text>
                <Text style={styles.normalText}>author</Text>
                <Text style={styles.normalText}>likes</Text>
                <Text style={styles.normalText}>comments</Text>
            </View> */}

            <FlatList
            data={DATA}
            renderItem={(item)=> <View style={{ height: 400, width: 320, backgroundColor: '#234B76', margin: 20, marginBottom: 50 }}>
                <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 6 }}>
                        <Text style={[styles.title]}>Filthy Frank</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.normalText]}>...</Text>
                    </View>
                </View>
                <Image
                    source={{ uri: 'https://i1.sndcdn.com/artworks-000118768405-0t6s1f-t500x500.jpg' }}
                    style={{ height: 200, width: 300, alignSelf: 'center' }}
                />

                <Text style={[styles.normalText,]} numberOfLines={6}>
                    The tiers are shifting. The omniverses are under attack. And only one man has the chromosomes to make things right. Or does he? Filthy Frank begins life as the harmless creator of extinction level radioactive weapons, but is taken far into the deepest recesses of the omniverses to learn how everything came to be and how everything will be. </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.normalText}>meter</Text>
                        <Text style={styles.normalText}>60%</Text>
                    </View>

                    <Text style={styles.normalText}>author</Text>
                </View>


            </View>}
            />
             

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
