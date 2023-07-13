import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    FlatList,
    ScrollView,
    Pressable,
    
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


function Home() {
    const [page, setPage] = useState(1);
    return (
        <View style={{ flex: 1, backgroundColor: "#153C43" }}>
            <View style={{ height: 60, width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15 }}>
                <View style={{ height: 50, justifyContent: 'center' }}>
                    <Image style={{ height: 45, width: 41, margin: 5 }} source={require('../../assets/icons/user.png')} />
                </View>
                <View style={{ width: "70%", flexDirection: 'row' }} >
                    <View style={{ width: 'auto', justifyContent: 'center', paddingLeft: 8, borderTopLeftRadius: 50, borderBottomLeftRadius: 50, backgroundColor: '#F1E4CA', paddingRight: 5 }}><FontAwesome name="search" size={25} /></View>
                    <TextInput style={{ width: '90%', backgroundColor: '#F1E4CA', borderTopRightRadius: 50, borderBottomRightRadius: 50 }}
                        placeholder="video search"
                    />
                </View>
                <View style={{ marginHorizontal: 15 }}>
                    <FontAwesome name="cog" color={'#5BB467'} size={45} />
                </View>
            </View>

            <View style={{ margin: 10, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>

                <View style={[(page == 1) ? styles.activeTitleView : styles.inactiveTitleView, { flex: 1 }]}>
                    <Pressable onPress={() => setPage(1)}>
                        <Text style={styles.title}>Main</Text>
                    </Pressable>
                </View>



                <View style={[(page == 2) ? styles.activeTitleView : styles.inactiveTitleView, { flex: 1.5 }]}>
                    <Pressable onPress={() => setPage(2)}>
                        <Text style={styles.title}>From your Youtube</Text>
                    </Pressable>
                </View>



                <View style={[(page == 3) ? styles.activeTitleView : styles.inactiveTitleView, , { flex: 1 }]}>
                    <Pressable onPress={() => setPage(3)}>
                        <Text style={styles.title}>Original content</Text>
                    </Pressable>
                </View>

            </View>

            <View style={{ flex: 1 }}>
                <View style={{ display: ((page == 1) ? 'flex' : 'none') }} >
                    <ContentMain/>
                </View>

                <View style={{ display: ((page == 2) ? 'flex' : 'none') }} >
                    <ContentFromYourYoutube/>
                </View>

                <View style={{ display: ((page == 3) ? 'flex' : 'none') }}>
                    <OriginalContent />
                </View>

            </View>
        </View>
    )
}
const OriginalContent = () => {
    return (
        <ScrollView>
            <Text style={styles.titleView}>About English learning</Text>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <EnglishLearningVideo title={item.title} />}
                horizontal={true}
            />
            <Text style={styles.titleView}>About the app</Text>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <AboutAppVideo title={item.title} />}
                horizontal={true}
            />
            <Text style={styles.titleView}>Random English content</Text>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <RandomContentVideo title={item.title} />}
                horizontal={true}
            />
        </ScrollView>
    )
}

const ContentFromYourYoutube = () => {
    return (
        <View>
            {/* prompt user to login to their youtube account */}
            <FlatList
                data={DATA}
                ListHeaderComponent={(
                    <View>
                        <Text style={[styles.titleView]}>Channels</Text>
                        <FlatList
                            data={DATA}
                            renderItem={({ item }) => <Channel title={item.title} />}
                            horizontal={true}
                        />
                        <Text style={styles.titleView}>Videos from the channel:</Text>
                    </View>
                )}
                renderItem={({ item }) => <Video title={item.title} />}
            />

        </View>
    )
}

const ContentMain = () => {
    return (
        <ScrollView>
            <Text style={styles.titleView}>Creator's recommendations:</Text>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Recommend title={item.title} />}
                horizontal={true}
            />
            <Text style={styles.titleView}>Spaced Repetition Zone:</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ height: 160, width: 160, backgroundColor: 'yellow', borderRadius: 10 }}>
                    <Text>Videos</Text>
                </View>
                <View style={{ height: 160, width: 160, backgroundColor: 'green', borderRadius: 10 }}>
                    <Text>Memo</Text>
                </View>
            </View>
            <Text style={styles.titleView}>Analysis/Statistic:</Text>
            <View style={{ height: 500, width: 300, backgroundColor: 'green', alignSelf: 'center' }}>
                <Text>Statictic</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: '#F1E4CA',
        fontFamily: 'genshin',
        textAlign: 'center'
    },
    videoTitle: {
        fontSize: 15,
        color: '#153C43',
        fontFamily: 'genshin',
        textAlign: 'left',
        marginHorizontal: 10
    },
    activeTitleView: {
        height: 80, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 4, borderBottomColor: '#5BB467'
    },
    inactiveTitleView: {
        height: 80, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#5BB467'
    },
    titleView: {
        fontSize: 15,
        color: '#F1E4CA',
        fontFamily: 'genshin',
        textAlign: 'left',
        margin: 15,
    },
})
export default Home;

const Recommend = ({ title }) => (
    <View style={{ height: 200, width: 260, backgroundColor: '#5BB467', margin: 10, borderRadius: 10 }}>
        <Image
        style = {{height: 140, width: 180, alignSelf: 'center', marginTop: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8}}
        source={{uri : 'https://variety.com/wp-content/uploads/2019/12/pewdiepie.png?w=1024'}}
        />
        <Text style={styles.videoTitle} numberOfLines={2}>{title}</Text>
    </View>
);

const Channel = ({ title }) => (
    <View style={{ height: 'auto' }}>
        <View style={{ height: 80, width: 80, backgroundColor: 'green', margin: 5, borderRadius: 50, justifyContent: 'center' }}>
            <Text style={styles.title}>{title}</Text>
        </View>
    </View>
);
const Video = ({ title }) => (
    <View style={{ height: 300, width: '95%', backgroundColor: 'green', margin: 10, borderRadius: 10, justifyContent: 'center' }}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const EnglishLearningVideo = ({ title }) => (
    <View style={{ height: 200, width: 200, backgroundColor: 'green', margin: 5, borderRadius: 10, justifyContent: 'center' }}>
        <Text style={styles.title}>{title}</Text>
    </View>
);
const AboutAppVideo = ({ title }) => (
    <View style={{ height: 200, width: 200, backgroundColor: 'green', margin: 5, borderRadius: 10, justifyContent: 'center' }}>
        <Text style={styles.title}>{title}</Text>
    </View>
);
const RandomContentVideo = ({ title }) => (
    <View style={{ height: 200, width: 200, backgroundColor: 'green', margin: 5, borderRadius: 10, justifyContent: 'center' }}>
        <Text style={styles.title}>{title}</Text>
    </View>
);






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
