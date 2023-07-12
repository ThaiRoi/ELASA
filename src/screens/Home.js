import React, {useState} from "react";
import {
    View,
    Text,
    Image,
    TextInput
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


function Home () {
    return (
        <View style = {{flex: 1, backgroundColor: "#153C43"}}>
            <View style = {{height: "8%", width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15}}>
                <View style = {{ height: 50, justifyContent: 'center'}}>
                    <Image style={{ height: 45, width: 41, margin: 5}} source={require('../../assets/icons/user.png')} />
                </View>
                <View style = {{ width: "70%", flexDirection: 'row'}} >
                    <View style = {{width: 'auto', justifyContent: 'center', paddingLeft: 8, borderTopLeftRadius: 50, borderBottomLeftRadius: 50, backgroundColor: '#F1E4CA', paddingRight: 5}}><FontAwesome name = "search" size = {25}/></View>
                    <TextInput style = {{width: '90%', backgroundColor: '#F1E4CA', borderTopRightRadius: 50, borderBottomRightRadius: 50}}
                                placeholder="video search"
                    />
                </View>
                <View style = {{marginHorizontal: 15}}>
                    <FontAwesome name="cog" color = {'#5BB467'} size = {45}/>
                </View>




            </View>
            

        </View>
    )
}
export default Home;