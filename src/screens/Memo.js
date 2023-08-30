import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
    ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-animatable";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';

function Memo() {
    const navigation = useNavigation();
    const [showExplore, setShowExplore] = useState(true);
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#153C43' }}>
            <Text style={[styles.title, { margin: 15 }]}>MEMO flashcards</Text>

            <View style={{ marginBottom: 20 }}>
                <Pressable
                    onPress={() => { navigation.navigate('DailyTest') }}
                >
                    <ImageBackground
                        source={require('../../assets/icons/test.png')}
                        style={{ height: 130, marginHorizontal: 15, borderRadius: 10 }}
                    >
                        <Text style={{ fontFamily: 'genshin', fontSize: 35, color: '#153C43' }}>  Daily</Text>
                        <Text style={{ fontFamily: 'genshin', fontSize: 35, color: '#153C43' }}>  Test</Text>
                        <Text>        Press to start!</Text>

                    </ImageBackground>
                </Pressable>
            </View>

            <View style={{ height: 80, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Pressable
                    onPress={() => { 
                        navigation.navigate('CreateMemo',{
                        sub: null,
                    }) 
                }}
                    style={{ width: '43.5%', }}
                >
                    <View style={{ height: 60, width: '100%', backgroundColor: '#5BB467', borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <FontAwesome name="plus" color="#153C43" size={20} />
                        <Text style={[styles.normalText, { textAlign: 'center', color: '#153C43' }]}>Create New</Text>
                    </View>
                </Pressable>

                <Pressable
                    onPress={() => { navigation.navigate('SearchMemo') }}
                    style={{ width: '43.5%', }}
                >
                    <View style={{ height: 60, width: '100%', backgroundColor: '#5BB467', borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <FontAwesome name="search" color="#153C43" size={20} />
                        <Text style={[styles.normalText, { textAlign: 'center', color: '#153C43' }]}>See All</Text>
                    </View>
                </Pressable>


            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20 }}>
                <Pressable
                    onPress={() => { navigation.navigate('SeeMemo', { type: 1 }) }}
                >
                    <View style={{ width: 100, backgroundColor: '#E5D5A4', paddingVertical: 10, alignContent: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <View style={{ alignSelf: 'center' }}><FontAwesome name="circle" color="red" size={20} /></View>
                        <Text style={[styles.normalText, { color: '#153C43' }]}>New</Text>
                        <Text style={[styles.normalText, { fontSize: 25, color: '#153C43' }]}>12</Text>
                    </View>
                </Pressable>

                <Pressable
                    onPress={() => { navigation.navigate('SeeMemo', { type: 2 }) }}
                >
                    <View style={{ width: 100, backgroundColor: '#E5D5A4', paddingVertical: 10, alignContent: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <View style={{ alignSelf: 'center' }}><FontAwesome name="circle" color="yellow" size={20} /></View>
                        <Text style={[styles.normalText, { color: '#153C43' }]}>Learning</Text>
                        <Text style={[styles.normalText, { fontSize: 25, color: '#153C43' }]}>30</Text>
                    </View>
                </Pressable>

                <Pressable
                    onPress={() => { navigation.navigate('SeeMemo', { type: 3 }) }}
                >
                    <View style={{ width: 100, backgroundColor: '#E5D5A4', paddingVertical: 10, alignContent: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <View style={{ alignSelf: 'center' }}><FontAwesome name="circle" color="#66ff00" size={20} /></View>
                        <Text style={[styles.normalText, { color: '#153C43' }]}>Mastered</Text>
                        <Text style={[styles.normalText, { fontSize: 25, color: '#153C43' }]}>9</Text>
                    </View>
                </Pressable>

            </View>



            <Text style={[styles.title, { textAlign: 'left', marginHorizontal: 15, marginVertical: 10, fontSize: 23 }]}>Explore:</Text>

{
    showExplore
    ?
    <View style={{ height: 400, width: 320, backgroundColor: '#234B76', margin: 20, marginBottom: 50, borderRadius: 10 }}>
    <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 6 }}>
            <Text style={[styles.title]}>Filthy Frank</Text>
        </View>
        <View style={{ flex: 1 }}>
        <Menu>
            <MenuTrigger text='...' />
                <MenuOptions>
                <MenuOption onSelect={() => alert(`Save`)}>
                        <Text style={{color: 'black'}}>Save</Text>

                 </MenuOption>
                <MenuOption onSelect={() => setShowExplore(false)} >
                <Text style={{color: 'red'}}>Hide</Text>
                </MenuOption>

</MenuOptions>
</Menu>
        </View>
    </View>
    <Image
        source={{ uri: 'https://i1.sndcdn.com/artworks-000118768405-0t6s1f-t500x500.jpg' }}
        style={{ height: 200, width: 300, alignSelf: 'center' }}
    />

    <Text style={[styles.normalText,]} numberOfLines={6}>
        The tiers are shifting. The omniverses are under attack. And only one man has the chromosomes to make things right. Or does he? Filthy Frank begins life as the harmless creator of extinction level radioactive weapons, but is taken far into the deepest recesses of the omniverses to learn how everything came to be and how everything will be. </Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
        
        <Text style={[styles.normalText, {fontSize: 12}]}>Topic: Internet Figure</Text>
       <View style={{ flexDirection: 'row' }}>
            <Text style={styles.normalText}>author</Text>
        </View>
    </View>


</View>
    : 
    <View>
        <Text style = {styles.videoTitle}>No more recommendations for today. Come back tomorrow for new memo recommended just for you</Text>

    </View>
}
           

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    activeTitle: {
        fontSize: 25,
        color: '#F1E4CA',
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
        fontFamily: 'genshin', fontSize: 15, marginHorizontal: 5, color: '#E5D5A4', textAlign: 'center'
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
export default Memo;