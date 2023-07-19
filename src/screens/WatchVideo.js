import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList
} from 'react-native';
import { enableLayoutAnimations, getRelativeCoords } from "react-native-reanimated";
import YoutubePlayer from "react-native-youtube-iframe";
import { useSelector } from "react-redux";
import { userReturn } from "../store/store";
import { useNavigation } from "@react-navigation/native";


function WatchVideo() {
  //  const userInfo = useSelector(userReturn);
  // console.log("userinfo from info page: ",userInfo);
  const [videoData, setVideoData] = useState({});
  const [subtitleData, setSubtitleData] = useState({});
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [loadingSubtitle, setLoadingSubtitle] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const [elapsed, setElapsed] = useState(0);
  let trueIndex = 0;
  const playerRef = useRef();
  const flatlistRef = useRef();
  const navigation = useNavigation();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var rawVideo = JSON.stringify({
    "videoid": "1CpYVvT5T9U",
  });

  var requestVideoOptions = {
    method: 'POST',
    headers: myHeaders,
    body: rawVideo,
    redirect: 'follow'
  };

  const getVideo = () => {
    fetch("http://192.168.10.50:9000/video/get-video", requestVideoOptions)
      .then(response => {
        if (response.ok) {
          // Request was successful (status code 200-299)
          //console.log("from response: ",response);
          return response.json();
          // Parse response body as JSON
        } else {
          // Request failed (status code outside 200-299 range)
          //console.log('from respose: ', response);
          throw new Error('Request failed with status ' + response.status);
        }
      })
      .then(data => {
        // Handle the response data
        // console.log('from data: ', data);
        setVideoData(data);
        setLoadingVideo(false);
        // Additional logic based on the response data
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('from error: ', error);
        setLoadingVideo(false);

      });
  }

  var rawSubtitle = JSON.stringify({
    "videoid": "64b0f811db436b0be078e1fe",
  });

  var requestSubtitleOptions = {
    method: 'POST',
    headers: myHeaders,
    body: rawSubtitle,
    redirect: 'follow'
  };
  const getSubtitle = () => {
    fetch("http://192.168.10.50:9000/video/get-subtitle", requestSubtitleOptions)
      .then(response => {
        if (response.ok) {
          // Request was successful (status code 200-299)
          //console.log("from response: ",response);
          return response.json();
          // Parse response body as JSON
        } else {
          // Request failed (status code outside 200-299 range)
          //console.log('from respose: ', response);
          throw new Error('Request failed with status ' + response.status);
        }
      })
      .then(data => {
        // Handle the response data
        // console.log('from data: ', data);
        setSubtitleData(data);
        setLoadingSubtitle(false);
        //console.log(data.data.thai.caption);
        // Additional logic based on the response data
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('from error: ', error);
        setLoadingSubtitle(false);

      });
  }

  useEffect(() => {
    getVideo();
    getSubtitle();
    // console.log(subtitleData)
  }, []);

  // console.log(subtitleData.data.thai.caption);
  useEffect(() => {
    console.log('loadingSubtitle', loadingSubtitle);
    if (!loadingSubtitle) {

      const interval = setInterval(async () => {
        const elapsed_sec = await playerRef.current.getCurrentTime(); // this is a promise. dont forget to await
        // console.log("ibterval")
        subtitleData.data.thai.caption.forEach((current, index) => {
          if ((elapsed_sec >= Number(current.start)) && (elapsed_sec < (Number(current.start) + Number(current.duration)))) {
            if (trueIndex !== index) {
              console.log("selected index from interval", trueIndex);
              setSelectedIndex(index);
              trueIndex = index;
              flatlistRef.current.scrollToIndex({ index: index, animated: true, viewPosition: 0.05 });
            }

            //  console.log("current time aka elapsed: ", elapsed)
            // console.log("from setInterval", current.start, "selected: ", selectedIndex);
          };

        });


      }, 500); // 100 ms refresh. increase it if you don't require millisecond precision

      return () => {

        clearInterval(interval);
      };
    }
  }, [loadingSubtitle]);

  useEffect(() => {
    console.log("selectedIndex", selectedIndex);
  }
    , [selectedIndex]);



  if (loadingVideo || loadingSubtitle)
    return (
      <View>
        <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafuck</Text>
        <Text>i mean uh... loading</Text>

      </View>
    )
  if (Object.keys(videoData).length == 0 || Object.keys(subtitleData).length == 0) return (
    <View style={{ flex: 1, backgroundColor: 'pink' }}>
      <Text>something went wrong, please try again</Text>
    </View>
  )
  return (
    <View style={{ flex: 1, backgroundColor: '#407950' }}>
      <YoutubePlayer
        height={204}
        play={true}
        videoId={videoData.data.thai.videoid}
        ref={playerRef}
      />

      <View style={{ backgroundColor: '#407950', flex: 1 }}>
        <FlatList
          ref={flatlistRef}
          data={subtitleData.data.thai.caption}
          renderItem={({ item, index }) => {
            const backgroundColor = index === selectedIndex ? '#234B76' : '#153C43';
            const color = index === selectedIndex ? '#F1E4CA' : 'gray';
            const time = item.start;
            // console.log('index be like: ',index);
            //   console.log('selected index: ' ,selectedIndex);
            return (
              <Pressable
                onPress={() => {
                  setSelectedIndex(index);
                  playerRef.current?.seekTo(time);
                }}>
                <View style={{
                  flexDirection: 'row',
                  backgroundColor: backgroundColor,
                  padding: 10,
                }}>
                  <View style={{ flex: 1 }}><Text style={{ fontSize: 15, color: color, fontFamily: 'genshin' }}>{item.text}</Text></View>
                  <View style={{ width: 30, justifyContent: 'center', alignItems: 'flex-end' }}><Text style={{ color: '#5BB467', fontSize: 30 }}>...</Text></View>
                </View>
              </Pressable>
            );
          }}
          extraData={selectedIndex}
        />
      </View>
      <View style={{ height: 50, flexDirection: 'row' }}>
        <View style={{ flex: 2,}}>
          <Pressable
            onPress={() => {navigation.navigate('Home')}}
            android_ripple={{ color: 'white' }}
      
          >
            <Text style={{ color: '#5BB467', fontFamily: 'genshin', fontSize: 30, textAlign: 'center' }}>{'<'}</Text>
          </Pressable>
        </View>
        
          <View style = {{flex: 8}}>
        <Pressable
          onPress={() => { }}
          android_ripple={{ color: 'white' }}>
          <Text style={[styles.titleText, ]}>{videoData.data.thai.title}</Text>
        </Pressable>
        </View>

        <View style = {{flex: 2}}>
        <Pressable
          onPress={() => { }}
          android_ripple={{ color: 'white' }}>
            <View style = {{height: 50, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ color: '#5BB467', textAlign: "left",}}>save</Text>
            </View>
        </Pressable>
        </View>

      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    color: '#5BB467',
    fontFamily: 'genshin',
    textAlign: 'left',
    marginHorizontal: 10,
    marginBottom: 5
  }
})

export default WatchVideo;