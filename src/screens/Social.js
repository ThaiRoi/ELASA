import React, { useState } from "react";
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
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

function Social() {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: '#153C43' }}>
            <Text style={[styles.title, { marginTop: 15 }]}>Social</Text>

            <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Image style={{ height: 45, width: 41, margin: 5 }} source={require('../../assets/icons/user.png')} />
                <View style = {{height: 43, width: 'auto', padding: 10, borderRadius: 3, backgroundColor: '#5BB467'}}>
                    
                <Text style={[styles.normalText, {color: '#153C43'}]}>Post with Memo</Text>
                </View>
                <Text style={styles.normalText}>!! Rules</Text>
            </View>




            {/* <View style={{ backgroundColor: 'green', width: 320, justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={styles.normalText}>Title       save</Text>
                <Text style={styles.normalText}>media</Text>
                <Text style={styles.normalText}>Captions</Text>
                <Text style={styles.normalText}>author</Text>
                <Text style={styles.normalText}>likes</Text>
                <Text style={styles.normalText}>comments</Text>
            </View> */}

            <FlatList
                data={postData}
                renderItem={({item}) => <View style={{ height: "auto", padding: 10, width: 320, backgroundColor: '#234B76', margin: 20}}>
                    <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 6 }}>
                            <Text style={[styles.title]}>{item.title}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end'}}>
                            <Menu>
                                <MenuTrigger text='...'/>
                                <MenuOptions>
                                    <MenuOption onSelect={() => alert(`Saved`)}>
                                        <Text style={{ color: 'black' }}>Save</Text>

                                    </MenuOption>
                                    <MenuOption onSelect={() => alert(`Reported`)} >
                                        <Text style={{ color: 'red' }}>Report</Text>
                                    </MenuOption>

                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>
                    <Pressable
                onPress={()=>{
                    navigation.navigate("ViewPost", {item: item});
                }}
                android_ripple={{color: "white"}}
                >
                    <Image
                        source={{ uri: item.imageURL }}
                        style={{ height: 200, width: 300, alignSelf: 'center' }}
                    />

                    <Text style={[styles.normalText,]} numberOfLines={6}>
                       {item.description}
                       </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderBottomColor: 'gray', borderBottomWidth: 2, paddingBottom: 4 }}>
                        <View style={{ flexDirection: 'row'}}>
                        <FontAwesome name="heart" size={25} color="gray" />    
                            <Text style={styles.normalText}>{item.likes}</Text>
                        </View>

                        <Text style={styles.normalText}>By: {item.author}</Text>
                    </View>
                    <View>
                        <Text style = {{fontSize: 16, fontWeight: 'bold', marginTop: 5, marginBottom: 0, marginHorizontal: 10}}>{item.comments[0].author}</Text>
                        <Text style = {{fontSize: 14,  marginTop: 5, marginBottom: 0, marginHorizontal: 10}}>{item.comments[0].content}</Text>
                        <Text style = {{fontSize: 16, fontWeight: 'bold', marginTop: 5, marginBottom: 0, marginHorizontal: 10}}>{item.comments[1].author}</Text>
                        <Text style = {{fontSize: 14,  marginTop: 5, marginBottom: 0, marginHorizontal: 10}}>{item.comments[1].content}</Text>
                       </View> 
                    </Pressable>
                </View>
                
                }
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

const postData = [
    {
        "title": "Sunset",
        "imageURL": "https://www.ambong-ambong.com/wp-content/uploads/2023/03/istockphoto-1172427455-612x612-1.jpeg",
        "description": "The time of day when the sun goes below the horizon. Sunsets are often colorful and beautiful to watch.",
        "likes": 92,
        "author": "DavidSmith",
         "comments": [
            {"author": "Lily", "content": "What a breathtaking sunset! The colors are amazing."},
            {"author": "John", "content": "I love watching sunsets, they bring such a sense of peace."},
            {"author": "Grace", "content": "Sunsets are the perfect way to end the day."},
            {"author": "Alex", "content": "Nature's artistry at its finest."},
            {"author": "Sophia", "content": "The hues in the sky during sunset are mesmerizing."}
          ]
      },
      {
        "title": "Apple",
        "imageURL": "https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w=",
        "description": "A round, red or green fruit that grows on a tree. It's often used to make juice and pies.",
        "likes": 67,
        "author": "EnglishLearner123",
        "comments": [
            {"author": "David", "content": "An apple a day keeps the doctor away!"},
            {"author": "Olivia", "content": "Apples are a healthy and delicious snack."},
            {"author": "Ethan", "content": "I enjoy both red and green apples."},
            {"author": "Emma", "content": "Apple pie is one of my favorite desserts."},
            {"author": "Daniel", "content": "Apples are a versatile fruit, perfect for both eating and cooking."}
          ]
          
      },
      {
        "title": "Run",
        "imageURL": "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/01/Runner-training-on-running-track-1296x728-header-1296x728.jpg?w=1155&h=1528",
        "description": "To move fast on your feet, quicker than walking. People run for exercise and in races.",
        "likes": 112,
        "author": "LanguageExplorer",
        "comments": [
            {"author": "Emily", "content": "Running in the morning is the best way to start the day."},
            {"author": "Michael", "content": "I like to run in the park to enjoy the fresh air."},
            {"author": "Ava", "content": "Running helps me clear my mind and relieve stress."},
            {"author": "Noah", "content": "Training for a marathon requires consistent running."},
            {"author": "Sofia", "content": "Running is a great way to stay fit and healthy."}
          ]
          
      },
      {
        "title": "Guitar",
        "imageURL": "https://nhaccutiendat.vn/upload/img/Dan-Guitar-Classic-Yamaha-C80.jpg",
        "description": "A musical instrument with six strings that you play by strumming or picking.",
        "likes": 45,
        "author": "WordAdventurer",
        "comments": [
            {"author": "Liam", "content": "Playing the guitar is my favorite way to unwind."},
            {"author": "Mia", "content": "I've been learning to play the guitar, and it's so rewarding."},
            {"author": "Ella", "content": "Guitar melodies have a soothing effect on me."},
            {"author": "Jackson", "content": "I've been practicing fingerpicking on my guitar."},
            {"author": "Charlotte", "content": "Strumming a guitar around a campfire is a wonderful experience."}
          ]
          
      },
      {
        "title": "Mountain",
        "imageURL": "https://geographical.co.uk/wp-content/uploads/Photographing-mountains-in-spring-1200x800.jpg",
        "description": "A large natural land formation that rises above the surrounding land. Mountains are often covered with snow at the top.",
        "likes": 89,
        "author": "LinguisticTraveler",
        "comments": [
            {"author": "William", "content": "Climbing mountains is a test of both physical and mental strength."},
            {"author": "Scarlett", "content": "I find the view from the top of a mountain incredibly inspiring."},
            {"author": "Henry", "content": "Hiking in the mountains allows me to connect with nature."},
            {"author": "Grace", "content": "The air feels so crisp and fresh in the mountains."},
            {"author": "Lucas", "content": "Mountains make me feel small in the grand scheme of things."}
          ]
          
      },
      {
        "title": "Communication",
        "imageURL": "https://atlassianblog.wpengine.com/wp-content/uploads/2018/11/in-their-own-words-pt-1_featured@3x-1560x760.png",
        "description": "The process of exchanging information, ideas, thoughts, or feelings between people using words, gestures, or signals.",
        "likes": 53,
        "author": "VocabEnthusiast",
        "comments": [
            {"author": "Aiden", "content": "Effective communication is the key to building strong relationships."},
            {"author": "Chloe", "content": "Clear communication prevents misunderstandings."},
            {"author": "Ethan", "content": "I've been learning to improve my communication skills."},
            {"author": "Zoe", "content": "Good communication involves both speaking and listening."},
            {"author": "Benjamin", "content": "Communication bridges the gap between people from different backgrounds."}
          ]
          
      },
      {
        "title": "Adventure",
        "imageURL": "https://wwwnc.cdc.gov/travel/images/mountain-biker.jpg",
        "description": "An exciting experience or journey, often involving new and unusual activities or exploring new places.",
        "likes": 78,
        "author": "WordsmithExplorer",
        "comments": [
            {"author": "Emma", "content": "Embarking on new adventures is what makes life exciting."},
            {"author": "James", "content": "Adventure fuels my curiosity and desire to explore."},
            {"author": "Lily", "content": "Traveling to unfamiliar places is my idea of a great adventure."},
            {"author": "Liam", "content": "Adventure stories inspire me to seek out new experiences."},
            {"author": "Mia", "content": "Every adventure teaches me something valuable."}
          ]
          
      },
      {
        "title": "Curious",
        "imageURL": "https://images.squarespace-cdn.com/content/v1/57c58e6d29687fa2d860a407/1571161713206-WWQWTO96F7GDBUPZ1J7D/curious-george2.jpg?format=2500w",
        "description": "Having a strong desire to know or learn something new. It's a feeling of wanting to explore and discover.",
        "likes": 34,
        "author": "LanguageLearner",
        "comments": [
            {"author": "Noah", "content": "I've always been a curious person, eager to learn and discover."},
            {"author": "Ava", "content": "Curiosity sparks my interest in the world around me."},
            {"author": "Ethan", "content": "Asking questions is a natural part of being curious."},
            {"author": "Isabella", "content": "I believe curiosity drives innovation and progress."},
            {"author": "Daniel", "content": "Curiosity is the foundation of lifelong learning."}
          ]
          
      },
      {
        "title": "Dance",
        "imageURL": "https://wordpress.wbur.org/wp-content/uploads/2023/01/20221011-DSC04611.jpg",
        "description": "A rhythmic movement of the body, often to music. Dancing is a form of expression and entertainment.",
        "likes": 91,
        "author": "EnglishEnthusiast",
        "comments": [
            {"author": "Olivia", "content": "Dancing is a universal language that brings people together."},
            {"author": "Jackson", "content": "I express myself best through dance movements."},
            {"author": "Sophia", "content": "Dance allows me to let loose and have fun."},
            {"author": "Elijah", "content": "I've been learning various dance styles and it's been an amazing journey."},
            {"author": "Avery", "content": "Watching professional dancers perform is truly mesmerizing."}
          ]
          
      },
      {
        "title": "Science",
        "imageURL": "https://images.theconversation.com/files/412084/original/file-20210720-23-17n7gzi.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip",
        "description": "The study of the natural world and how it works. It involves observing, experimenting, and discovering new knowledge.",
        "likes": 58,
        "author": "InquisitiveMind",
        "comments": [
            {"author": "Lucas", "content": "Science uncovers the mysteries of the universe."},
            {"author": "Aria", "content": "I find scientific discoveries awe-inspiring."},
            {"author": "Ethan", "content": "Studying science opens up new avenues of understanding."},
            {"author": "Mia", "content": "Science and innovation go hand in hand."},
            {"author": "Benjamin", "content": "Scientific advancements shape the course of human progress."}
          ]
          
      },
      {
        "title": "Inspiration",
        "imageURL": "https://www.workitdaily.com/media-library/man-feels-inspired-by-the-mountains.jpg?id=29764286&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0",
        "description": "A feeling of enthusiasm or motivation that encourages you to do something creative or meaningful.",
        "likes": 71,
        "author": "WordDiscoverer",
        "comments": [
            {"author": "Emma", "content": "I find inspiration in nature's beauty and complexity."},
            {"author": "Liam", "content": "Inspiration drives me to pursue my goals relentlessly."},
            {"author": "Ava", "content": "Art and music are constant sources of inspiration for me."},
            {"author": "William", "content": "Every challenge I overcome becomes a wellspring of inspiration."},
            {"author": "Sophia", "content": "Inspiration empowers me to create and innovate."}
          ]
          
      },
      {
        "title": "Family",
        "imageURL": "https://img.freepik.com/free-vector/hand-drawn-asian-family-illustration_52683-85260.jpg?w=2000",
        "description": "A group of people who are related by blood or marriage. Families often live together and support each other.",
        "likes": 128,
        "author": "EmilyJohnson",
        "comments": [
            {"author": "Daniel", "content": "Family is my anchor and my source of strength."},
            {"author": "Emily", "content": "Spending time with family is where I find the most joy."},
            {"author": "Ethan", "content": "Family provides a sense of belonging and unconditional love."},
            {"author": "Olivia", "content": "Family traditions create lasting memories."},
            {"author": "Noah", "content": "The support of my family motivates me to strive for excellence."}
          ]
          
      },
     
      {
        "title": "Friendship",
        "imageURL": "https://media.npr.org/assets/img/2020/02/20/friendship-1_custom-7ac296535e581ded256a9c640d8d44f194e39d7e-s1100-c50.jpg",
        "description": "A close relationship between people who trust and support each other. Friends spend time together and share experiences.",
        "likes": 105,
        "author": "DanielWilliams",
        "comments": [
            {"author": "Aiden", "content": "True friendship is built on trust and mutual understanding."},
            {"author": "Chloe", "content": "My friends are my chosen family."},
            {"author": "Ella", "content": "Friendship is a bond that enriches our lives."},
            {"author": "Liam", "content": "I'm grateful for the friends who have supported me through thick and thin."},
            {"author": "Mia", "content": "Friendship adds a touch of magic to life's journey."}
          ]
          
      },

      {
        "title": "Innovation",
        "imageURL": "https://s40424.pcdn.co/in/wp-content/uploads/2022/07/innovation.jpg.optimal.jpg",
        "description": "The creation of new ideas, methods, or products that improve existing ways of doing things or solve problems.",
        "likes": 64,
        "author": "LiamSmith",
        "comments": [
            {"author": "Elijah", "content": "Innovation transforms the way we live and work."},
            {"author": "Isabella", "content": "I'm fascinated by the innovative solutions that shape our world."},
            {"author": "James", "content": "Innovation drives progress and propels societies forward."},
            {"author": "Avery", "content": "Thinking outside the box is the first step toward innovation."},
            {"author": "Lucas", "content": "Innovation is a testament to human ingenuity and creativity."}
          ]
          
      },

]