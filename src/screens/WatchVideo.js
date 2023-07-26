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
import serverAddress from "../global";

 let interval, timeout;

function WatchVideo({route}) { 
  const {videoid, title} = route.params;
  //console.log("passing video id between sscreens: ",videoid, title);
  //  const userInfo = useSelector(userReturn);
  // console.log("userinfo from info page: ",userInfo);
  //const [videoData, setVideoData] = useState({});
  const [subtitleData, setSubtitleData] = useState([]);
  // const [loadingVideo, setLoadingVideo] = useState(true);
  const [loadingSubtitle, setLoadingSubtitle] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
// var isScrolling = false;
const [isScrolling, setScrolling] = useState(false);
  var trueIndex = 0;
  // const [elapsed, setElapsed] = useState(0);
 
  const playerRef = useRef();
  const flatlistRef = useRef();
  const navigation = useNavigation();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // var rawVideo = JSON.stringify({
  //   "videoid": "03263_ieRZk",
  // });

  // var requestVideoOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: rawVideo,
  //   redirect: 'follow'
  // };

  // const getVideo = () => {
  //   fetch(`${serverAddress}/video/get-video`, requestVideoOptions)
  //     .then(response => {
  //       if (response.ok) {
  //         // Request was successful (status code 200-299)
  //         //console.log("from response: ",response);
  //         return response.json();
  //         // Parse response body as JSON
  //       } else {
  //         // Request failed (status code outside 200-299 range)
  //         //console.log('from respose: ', response);
  //         throw new Error('Request failed with status ' + response.status);
  //       }
  //     })
  //     .then(data => {
  //       // Handle the response data
  //       // console.log('from data: ', data);
  //       setVideoData(data);
  //       setLoadingVideo(false);
  //       // Additional logic based on the response data
  //     })
  //     .catch(error => {
  //       // Handle any errors that occurred during the request
  //       console.error('from error: ', error);
  //       //setLoadingVideo(false);

  //     });
  // }

  var rawSubtitle = JSON.stringify({
    "videoid": videoid,
  });

  var requestSubtitleOptions = {
    method: 'POST',
    headers: myHeaders,
    body: rawSubtitle,
    redirect: 'follow'
  };
  const getSubtitle = () => {
    // fetch(`${serverAddress}/video/get-subtitle`, requestSubtitleOptions)
    fetch(`${serverAddress}/video/get-subtitle`, requestSubtitleOptions)

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
        //console.log('from data: ', data.data.thai.caption[0]["-start"]);
       // console.log("frtom getSubtitle: ", data.data.captions);
        setSubtitleData(data.data.captions);
        setLoadingSubtitle(false);
        //console.log(data.data.thai.caption);
        // Additional logic based on the response data
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('from error: ', error);
        //setLoadingSubtitle(false);

      });
  }

  useEffect(() => {
    // getVideo();
    getSubtitle();
    // console.log(subtitleData)
  }, []);



  function runSub() {
    interval = setInterval(async () => {
      const elapsed_sec = Math.round(await playerRef.current.getCurrentTime()); // this is a promise. dont forget to await
    //console.log("ibterval");
      for (let i=0;i<subtitleData.length;i++){
        if ((elapsed_sec >= Number(subtitleData[i].start)) && (elapsed_sec < Number(subtitleData[i+1].start))) {
          if(trueIndex != i) {
            trueIndex = i;
            setSelectedIndex(i);
            // if(!isScrolling){
              flatlistRef.current.scrollToIndex({ index: i, animated: true, viewPosition: 0.08 });
            // } 
            continue;
          }
        }
      } 
    }, 500);
  }
  // console.log(subtitleData.data.thai.caption);
  useEffect(() => {
    //console.log('loadingSubtitle', loadingSubtitle);
    if (!loadingSubtitle) {
      //console.log("subtitleData is it correct? :", subtitleData);
      if (interval) clearInterval(interval);
      runSub();
      // interval = setInterval(async () => {
      //   const elapsed_sec = Math.round(await playerRef.current.getCurrentTime()); // this is a promise. dont forget to await
      // //console.log("ibterval");
      //   for (let i=0;i<subtitleData.length;i++){
      //     if ((elapsed_sec >= Number(subtitleData[i].start)) && (elapsed_sec < Number(subtitleData[i+1].start))) {
      //       if(trueIndex != i) {
      //         trueIndex = i;
      //         setSelectedIndex(i);
      //         if(!isScrolling){flatlistRef.current.scrollToIndex({ index: i, animated: true, viewPosition: 0.12 });} 
      //         continue;
      //       }
      //       // setSelectedIndex((oldindex) => {
      //       //   console.log("from setselectedindex: ",oldindex, i);
      //       //   if(oldindex < i) return i;
      //       // });
      //     }
      //   }
      //   // subtitleData.forEach((current, index) => { 
      //   //   //console.log(current);
      //   //   //console.log("type start ",  typeof elapsed_sec,"type dur ",  Number(current.dur));

      //   //   if ((Math.round(elapsed_sec) >= Math.floor(Number(current.start))) && (Math.round(elapsed_sec) < Math.round(Number(current.start) + Number(current.dur)))) {
      //   //     //console.log("start: ", current.start);
      //   //     // if (trueIndex !== index) {
      //   //       //console.log("selected index from interval", selectedIndex);
      //   //       setSelectedIndex((oldindex) => {console.log("from setselectedindex: ",oldindex, index);
      //   //                                     if(oldindex < index) return index});
      //   //       // trueIndex = index;
      //   //        flatlistRef.current.scrollToIndex({ index: index, animated: true, viewPosition: 0.12 });
      //   //     // }
              
      //   //    //console.log("current time aka elapsed: ", elapsed)
      //   //     //console.log("from setInterval", Math.round(current["-start"]), "selected: ", selectedIndex);
      //   //   };

      //   // }
      //   // );



      // }, 500); // 100 ms refresh. increase it if you don't require millisecond precision

      return () => {

        clearInterval(interval);
      };
    }
  }, [loadingSubtitle]);

  useEffect(() => {
    console.log("selectedIndex", selectedIndex);
  }
    , [selectedIndex]);



  // if (loadingVideo || loadingSubtitle)
  if (loadingSubtitle)
    return (
      <View>
        <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafuck</Text>
        <Text>i mean uh... loading</Text>

      </View>
    )

  // if (Object.keys(videoData).length == 0 || Object.keys(subtitleData).length == 0) 
  if (Object.keys(subtitleData).length == 0) 
  return (
    <View style={{ flex: 1, backgroundColor: 'pink' }}>
      <Text>something went wrong, please try again</Text>
    </View>
  )
  return (
    <View style={{ flex: 1, backgroundColor: '#407950' }}>
      <YoutubePlayer
        height={204}
        play={true}
        videoId={videoid}
        ref={playerRef}
      />

{/* {(subtitleData == null)} */}
      <View style={{ backgroundColor: '#407950', flex: 1 }}>
        <FlatList
          ref={flatlistRef}
          data={subtitleData}
          onScrollToIndexFailed={()=>{}}
          onScrollBeginDrag={() => {
            
            clearInterval(interval);
          }}
          onScrollEndDrag={() => {
              if(timeout) clearTimeout(timeout);
              timeout = setTimeout(()=> {runSub();}, 2000);
            }
          }
          renderItem={({ item, index }) => {
            const backgroundColor = index === selectedIndex ? '#234B76' : '#153C43';
            const color = index === selectedIndex ? '#F1E4CA' : 'gray';
            const time = Math.floor(Number(item.start));
             //console.log('index be like: ',index);
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
          <Text style={[styles.titleText, ]}>{title}</Text>
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