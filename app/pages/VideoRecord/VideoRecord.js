import React from 'react';
'use strict';
import {
  AppRegistry,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  View,
  Icon
} from 'react-native';
import Camera from 'react-native-camera';
export default class VideoRecord extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      cameraType: Camera.constants.Type.back ,
      stage:0,
      isRecording:false,
      captureBtnText:'RECORD',
      time:{sec:50,mili:0}
    }
  }

 
  render = () => {
    
    return(
      <View style={styles.container}>
        <Camera
          ref='camera'
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          type={this.state.cameraType}
          captureMode={Camera.constants.CaptureMode.video}
          captureAudio={false}
          target={Camera.constants.CaptureTarget.cameraRoll}>
        </Camera>
        {
          (this.state.stage==0) &&
              <View style={styles.wrapper}>
                <Text style={styles.titleText} >Remaining Time</Text>
                <Text style={styles.timeText}>{this.state.time.sec>9?this.state.time.sec:'0'+this.state.time.sec}:{this.state.time.mili>9?this.state.time.mili:'0'+this.state.time.mili} sec </Text>
                <TouchableHighlight style={{marginTop:10}} onPress={(e)=>this.onPressIn()}>
                  <Text style={styles.recordBtn}>{this.state.captureBtnText}</Text>
                </TouchableHighlight>
                  <Text style={styles.description}> After hitting record you will be redirecting to camera and after it's done you can see the preview in the top box </Text>
              </View>
        }

        {
          (this.state.stage==1) &&
              <View style={styles.wrapper}>
                <Text style={styles.titleText} >Recording Time</Text>
                <Text style={styles.timeText}>{this.state.recordTime.sec>9?this.state.recordTime.sec:'0'+this.state.recordTime.sec}:{this.state.recordTime.mili>9?this.state.recordTime.mili:'0'+this.state.recordTime.mili} sec </Text>
                <View style={styles.btnWrapper}>
                  <TouchableHighlight style={{flex:1,alignItems:'flex-start'}} onPress={(e)=>this.onClickBtn(0)}>
                    <Text style={{marginLeft:20,textAlign:'center',color:'gray', fontSize:20,fontWeight:'bold'}}>CANCEL</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={{marginRight:20,flex:1,alignItems:'flex-end'}} onPress={(e)=>this.onClickBtn(1)}>
                    <Text style={{textAlign:'center',color:'gray', fontSize:20,fontWeight:'bold'}}>SAVE</Text>
                  </TouchableHighlight>
                </View>
                  <Text style={styles.description}> By hitting save we're uploading and creating your video. After the loading finished you can movie to another page. You'll be notified the moment you're video is built </Text>
              </View>
        }
       </View>
    )

  }
  onPressIn = () => {
    this.state.isRecording = !this.state.isRecording;
    this.setState({
      captureBtnText:this.state.isRecording?'STOP':'RECORD',
    });    
    
    if(this.state.isRecording){
      this.timeCounter = setInterval(()=>{
        var sec = this.state.time.sec;
        var mili = this.state.time.mili-1;
        if(mili<0){
          mili = 59;
          sec = sec -1 ;
        }
        this.setState({time:{sec:sec,mili:mili}});
        if(this.state.time.sec == 0 && this.state.time.mili == 0) this.stopVideo();
      },10)
      setTimeout(() => {this.takeVideo()},100)
    }
    else{
      
      this.stopVideo();
    }
  }

  takeVideo = () => {
    
     this.refs.camera.capture({
      audio: true,
      mode: Camera.constants.CaptureMode.video,
      target: Camera.constants.CaptureTarget.cameraRoll
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => alert(err));
  }

  stopVideo = () => {
    this.state.isRecording = false;
    var sec = 49-this.state.time.sec;
    var mili = 60-this.state.time.mili;
    if(mili == 60){
      sec = sec + 1;
      mili = 0;
    } 
    
    this.setState({
      captureBtnText:this.state.isRecording?'STOP':'RECORD',
      stage:1,
      recordTime:{sec:sec, mili:mili}
    });    
    clearInterval(this.timeCounter)
    this.refs.camera.stopCapture();
  }

  onClickBtn = (res) =>{
    this.setState({stage:0,time:{sec:50,mili:0}});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    padding:20
  },
  preview: {
    height:'50%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  
  wrapper:{
    marginTop:10,
    justifyContent:'center',
    alignItems:'center'
  },
  titleText:{textAlign:'center',color:'#a3a3a3'},
  timeText:{textAlign:'center',color:'#a3a3a3',fontSize:30,fontWeight:'bold'},
  recordBtn:{textAlign:'center',color:'gray',fontSize:20,fontWeight:'bold'},
  description:{textAlign:'center',color:'#a3a3a3',marginTop:40, marginLeft:20,marginRight:20},
  btnWrapper:{flexDirection:'row',justifyContent: 'center', width:'100%',marginTop:10}
});
AppRegistry.registerComponent('VideoRecord', () => VideoRecord);

