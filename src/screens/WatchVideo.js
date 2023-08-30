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
  FlatList,
  Modal
} from 'react-native';
import { enableLayoutAnimations, getRelativeCoords } from "react-native-reanimated";
import YoutubePlayer from "react-native-youtube-iframe";
import { useSelector } from "react-redux";
import { userReturn } from "../store/store";
import { useNavigation } from "@react-navigation/native";
import serverAddress from "../global";
import Slider from '@react-native-community/slider';
import Toast from 'react-native-toast-message';
const axios = require('axios').default;



let interval, timeout;
var watchTime = 0;
var pauseTime = Date.now();
console.log('this is out side of the function to see if rerendering is gonna run the code out here')

function WatchVideo({ route }) {
  const userData = useSelector(userReturn);
  console.log('rerender');
  const { videoid, title, wordToFind } = route.params;
  let regexPattern = new RegExp(`(?<!\\w)${""}(?!\\w)`, 'gi');

  if(wordToFind){
    const trimmed = wordToFind.trim();
  const escapedSearchTerm = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '');
   regexPattern = new RegExp(`(?<!\\w)${escapedSearchTerm}(?!\\w)`, 'gi');
  }
  
  // console.log("this is word to find in watch video screen:", wordToFind);

 
  // let rated = false;
  const [subtitleData, setSubtitleData] = useState([]);
  const [loadingSubtitle, setLoadingSubtitle] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [event, setEvent] = useState({});
  const [playing, setPlaying] = useState(true);
  const [comprehension, setComprehension] = useState(0);
  const [matchedElements, setMatchedElements] = useState([])
  const [matchedIndex, setMatchedIndex] = useState(-1);
  const [indexElementMatch, setIndexElementMatch] = useState([]);
  var trueIndex = 0;
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
    fetch(`${serverAddress}/video/watch-video`, requestSubtitleOptions)

      .then(response => {
        if (response.ok) {
          // Request was successful (status code 200-299)
          // console.log("from response: ",response);
          return response.json();
          // Parse response body as JSON
        } else {
          // Request failed (status code outside 200-299 range)
          console.log('from respose: ', response);
          throw new Error('Request failed with status ' + response.status);
        }
      })
      .then(data => {
        // Handle the response data
        //console.log('from data: ', data.data.thai.caption[0]["-start"]);
        // console.log("dât frtom getSubtitle: ", data.data.caption);
        if (data == undefined) {
          setSubtitleData([{
            text: 'unfortunately we cannot find the english subtitle to this video',
            start: 1,
            dur: 1
          }]);
        } else {
          setSubtitleData(data.data.caption);
          if(wordToFind){
             const m = [];
            //  const mi = [];
             const NO_WIDTH_SPACE = '​'; // This is a special char you should copy and paste, not an empty string!
          data.data.caption.forEach((element, index) => {
            
            if(regexPattern.test(element.text)){
              // mi.push(index);
              m.push(element);
              element.text = element.text.split(' ').map((word, i) => {
                if (regexPattern.test(word)) {
                  console.log("this is regex matched:", word, i);
                  return <Text key={i} style={{color: 'yellow'}}>{word} </Text>

                }
                else {
                  console.log("this is not: ", word, i)
                  return <Text key={i}>{word} </Text>;
                } 
                })
              

              
              
            }
            setMatchedElements(m);
            // setIndexElementMatch(mi);
          });
          
        }
          }
      console.log(matchedElements);
         

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
    if (interval) clearInterval(interval);
    interval = setInterval(async () => {
      if (playerRef.current === null) return;
      const elapsed_sec = Math.round(await playerRef.current.getCurrentTime()); // this is a promise. dont forget to await
      //console.log("ibterval");
      for (let i = 0; i < subtitleData.length - 1; i++) {
        if ((elapsed_sec >= Number(subtitleData[i].start)) && (elapsed_sec < Number(subtitleData[i + 1].start))) {
          if (trueIndex != i) {
            //console.log(subtitleData[i-1].text)
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
      if (subtitleData[1]) {
        setTimeout(() => {
          navigation.addListener('beforeRemove', (e) => {
            console.log(e.data.action);
            e.preventDefault();
            setModalVisible(true);
            setEvent(e.data.action);
          })
        }, 11111)
      }

      return () => {

        clearInterval(interval);
      };

    }
  }, [loadingSubtitle]);

  useEffect(() => {
    if(!interval){
      runSub();
    }
    // console.log("selectedIndex", selectedIndex);
  }
    );

    function testConsoleLog(){
      console.log("this is function test console log let's goooooooooooooooooooo");
    }


  // if (loadingVideo || loadingSubtitle)
  if (loadingSubtitle)
    return (
      <View>
        <Text>yep duck</Text>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        hardwareAccelerated={true}
        onShow={() => {
          clearInterval(interval);
          setPlaying(false)
        }
        }
        // onDismiss={()=>{

        // }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          if (interval) clearInterval(interval);
          runSub();
          setPlaying(true);
        }}>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.4)'

          }}>
          <View
            style={{
              backgroundColor: '#407950',
              borderRadius: 20,
              padding: 20,
              height: 600,
              width: '90%',
              alignItems: 'center',
              shadowColor: 'white',
              shadowOffset: {
                width: 4,
                height: 8,
              },
              shadowOpacity: 0,
              shadowRadius: 10,
              elevation: 9,
            }}>
            {/* <Text style={styles.modalText}>Hello World!</Text>
           
             */}
            <Text style={[styles.titleText, { color: '#F1E4CA', fontSize: 20, textAlign: "center" }]}>RATE YOUR LEVEL OF COMPREHENSION</Text>
            <Text style={[styles.titleText, { color: '#F1E4CA', fontSize: 15, textAlign: "center", margin: 30, marginBottom: 30 }]}>How much did you understand this video?</Text>
            <Text style={[styles.titleText, { color: '#F1E4CA', fontSize: 15, textAlign: "center" }]}>About {Math.floor(comprehension)}%</Text>
            <Slider
              style={{ width: 270, height: 40, alignSelf: 'center' }}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={(v) => { setComprehension(v) }}
            />
            <Pressable
              style={[styles.modalButton, { marginBottom: 60 }]}
              android_ripple={{ color: 'white' }}
              onPress={() => {
                //call create history api
                axios.post(`${serverAddress}/video/create-history`, {
                  userid: userData.userId,
                  videoid: videoid,
                  comprehensionlevel: Math.floor(comprehension),
                  watchtime: watchTime
                })
                  .then((response) => {
                    // console.log(response);
                    Toast.show({
                      type: 'success',
                      text1: "Let's go!!!",
                      text2: 'Successfully recorded your activities👋',
                      visibilityTime: 5000
                    });
                    //  setTimeout(()=>{
                    navigation.dispatch(event);
                    //  }, 1000)
                  })
                  .catch((e) => {
                    Toast.show({
                      type: 'error',
                      text1: "uh oh",
                      text2: 'something went wrong omegalul',
                      visibilityTime: 5000
                    });
                  })

                console.log({
                  userid: userData.userId,
                  videoid: videoid,
                  comprehensionlevel: Math.floor(comprehension),
                  watchtime: watchTime
                })

              }}>
              <Text style={[styles.titleText, { color: 'yellow', fontSize: 15 }]}>Submit</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              android_ripple={{ color: 'white' }}

              onPress={() => {
                setModalVisible(!modalVisible)
                if (timeout) clearTimeout(timeout);
                timeout = runSub();
                setPlaying(true);
                console.log("watch time is now...", watchTime);
              }}>
              <Text style={[styles.titleText, { color: '#F1E4CA', fontSize: 15 }]}>Go back to video</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              android_ripple={{ color: 'white' }}

              onPress={() => navigation.dispatch(event)}>
              <Text style={[styles.titleText, { color: '#873a3a', fontSize: 13 }]}>Skip</Text>
            </Pressable>
            <Text style={[styles.titleText, { color: '#873a3a', fontSize: 13 }]}>If you skip, this video won't be recorded in your watch history and the statistic will not be saved</Text>

          </View>
        </View>
      </Modal>
      <YoutubePlayer
        height={204}
        play={playing}
        videoId={videoid}
        ref={playerRef}
        onChangeState={(s) => {
          console.log("player state", s);
          if (s == "unstarted") {
            console.log('set the values once when the screen load')
            watchTime = 0;
            pauseTime = Date.now();
          }
          if (s == "playing") {
            // setPlaying(true);
            console.log("yep, it's playing alright")
            pauseTime = Date.now();
            console.log("pauseTime is set to: ", pauseTime)
            console.log('watchtime is now set to: ', watchTime);
          }
          if (s == "paused" || s == "ended") {
            // setPlaying(false);
            console.log("yep, it's paused alright")
            watchTime = (Date.now() - pauseTime) + watchTime;
            // pauseTime = Date.now();
            console.log('watchtime is now set to: ', watchTime);
          }
        }}
      />

      {/* {(subtitleData == null)} */}
      <View style={{ backgroundColor: '#407950', flex: 1 }}>
        <FlatList
          ref={flatlistRef}
          data={subtitleData}
          getItemLayout={(data, index)=>({
            length: 80, 
            offset: 80 * index, 
            index
          })}
          onScrollToIndexFailed={() => { }}
          onScrollBeginDrag={() => {

            clearInterval(interval);
          }}
          onScrollEndDrag={() => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => { runSub(); }, 2000);
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
                  height: 80
                }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, color: color, fontFamily: 'genshin' }}>{item.text}</Text>
                    </View>
                    <Pressable
                    onPress={()=>{
                      clearInterval(interval);
                      navigation.navigate("CreateMemo", {
                        sub : item,
                        videoid : videoid
                      })
                    }}
                    >
                      <View style={{ width: 30, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={{ color: '#5BB467', fontSize: 30 }}>...</Text>
                      </View>
                    </Pressable>
                  
                </View>
              </Pressable>
            );
          }}
          extraData={selectedIndex}
        />
      </View>

      <View style ={{display: ((wordToFind)? "flex" : "none")}}>
      <View style={{ height: 50, width: "100%", flexDirection: 'row'}}>
          <Pressable 
          style={{ height: "100%", width: "50%", backgroundColor: 'green', flex: 1}}
          onPress={()=>{
            if(matchedElements.length>0){
              if(matchedIndex==0){
              playerRef.current?.seekTo(matchedElements[0].start-1);

            }
            else{
              playerRef.current?.seekTo(matchedElements[matchedIndex-1].start-1);
              setMatchedIndex(matchedIndex-1);
            }
            }
            
          }}
          android_ripple={{color: "white"}}
          >
            <View style = {{justifyContent: 'center', alignItems: 'center', height: "100%", flexDirection: 'row'}}>
              <Text style = {{fontSize: 30}}>{'<'}</Text>
              <Text style = {{fontSize: 17, fontWeight: 'bold'}}> Previous</Text>

            </View>
          </Pressable>

          <View style ={{flex: 2, justifyContent:'center', alignItems:'center'}}>
              <Text style = {[styles.titleText, {color: '#F1E4CA'}]}>{wordToFind}</Text>
          </View>

          <Pressable 
          style={{ height: "100%", width: "50%", backgroundColor: 'green', flex: 1}}
          onPress={()=>{
            if(matchedElements.length>0){
              if(matchedIndex==matchedElements.length-1){
              playerRef.current?.seekTo(matchedElements[matchedElements.length-1].start - 1);
            }
            else{
              playerRef.current?.seekTo(matchedElements[matchedIndex+1].start -1);
              setMatchedIndex(matchedIndex+1);
            }
            }
            
          }}
          android_ripple={{color: "white"}}
          >
            <View style = {{justifyContent: 'center', alignItems: 'center', height: "100%", flexDirection: 'row'}}>
              <Text style = {{fontSize: 17, fontWeight: 'bold'}}>Next </Text>
              <Text style={{fontSize: 30}}>{'>'}</Text>

            </View>
          </Pressable>
      </View>
      </View>
      


      <View style={{ height: 50, flexDirection: 'row', backgroundColor: '#31333B'}}>
        <View style={{ flex: 2, }}>
          <Pressable
            onPress={() => { navigation.goBack() }}
            android_ripple={{ color: 'white' }}

          >
            <Text style={{ color: '#5BB467', fontFamily: 'genshin', fontSize: 30, textAlign: 'center' }}>{'<'}</Text>
          </Pressable>
        </View>

        <View style={{ flex: 8 }}>
          <Pressable
            onPress={() => { }}
            android_ripple={{ color: 'white' }}
            style = {{height: "100%",justifyContent: 'center'}}>
            <Text style={[styles.titleText,]}>{title}</Text>
          </Pressable>
        </View>

        <View style={{ flex: 2 }}>
          <Pressable
            onPress={() => { }}
            android_ripple={{ color: 'white' }}>
            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#5BB467', textAlign: "left", }}>save</Text>
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
  },
  modalButton: {
    borderRadius: 2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    elevation: 2,
    backgroundColor: '#5BB467',
    borderRadius: 10,
    margin: 10,
    width: 270
  }
})

export default WatchVideo;

// {"dur": "5.281", "start": "18.359", "text": `tomorrow will be a <Text style = >dad</Text> I'm very nervous`}