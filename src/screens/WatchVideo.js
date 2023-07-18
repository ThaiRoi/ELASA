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


function WatchVideo() {
  const [videoData, setVideoData] = useState({});
  const [subtitleData, setSubtitleData] = useState({});
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [loadingSubtitle, setLoadingSubtitle] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const playerRef = useRef();

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
    fetch("http://192.168.10.15:9000/video/get-video", requestVideoOptions)
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
    fetch("http://192.168.10.15:9000/video/get-subtitle", requestSubtitleOptions)
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
  useEffect(() => {
    const interval = setInterval(async () => {
      const elapsed_sec = await playerRef.current.getCurrentTime(); // this is a promise. dont forget to await

      // calculations
      const elapsed_ms = Math.floor(elapsed_sec * 1000);
      //const ms = elapsed_ms % 1000;
      const min = Math.floor(elapsed_ms / 60000);
      const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);

      setElapsed(seconds);

      //if(elapsed>=subtitleData.data.thai.caption.start && elapsed<(subtitleData.data.thai.caption.start+subtitleData.data.thai.caption.duration)) {setSelectedIndex(index)};

     
    }, 500); // 100 ms refresh. increase it if you don't require millisecond precision

    return () => {
      clearInterval(interval);
    };
  }, []);

 




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
    <View style={{ flex: 1, backgroundColor: 'yellow' }}>
      <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>

      <YoutubePlayer
        height={210}
        play={true}
        videoId={videoData.data.thai.videoid}
        ref={playerRef}
      />
      <Text>{videoData.data.thai.title}</Text>
      <Text style={{}}>{'elapsed time'}</Text>
      <Text style={{color: 'green'}}>{elapsed}</Text>

      <FlatList
        data={subtitleData.data.thai.caption}
        renderItem={({ item, index }) => {
          const backgroundColor = index === selectedIndex ? '#6e3b6e' : '#f9c2ff';
          const color = index === selectedIndex ? 'white' : 'black';
          // console.log('index be like: ',index);
          //   console.log('selected index: ' ,selectedIndex);
          return (
            <Pressable 
            onPress={() => setSelectedIndex(index)}>
              <View style={{
                flex: 1, 
                backgroundColor: backgroundColor,
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
              }}>
                <Text style={{ fontSize: 20, color: color}}>{item.text}</Text>
                </View>
            </Pressable>
          );
        }}
        extraData={selectedIndex}
      />

    </View>
  )
}
export default WatchVideo;