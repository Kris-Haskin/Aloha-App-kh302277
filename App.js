import React, { Component } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS} from 'expo-av';
import { Feather } from '@expo/vector-icons';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ukulelePic from './assets/ukulele.png';
import drumPic from './assets/drums.png';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

export default class App extends Component {
  state = {
    volume: 1.0,
    isBuffering: false,
  }

	async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playThroughEarpieceAndroid: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
    interruptionModeAndroid:InterruptionModeAndroid.DoNotMix,
    });
    this.loadAudio();
  }

  async loadAudio() {
    const playbackInstance = new Audio.Sound();
    const source = require('./music/ukulele.mp3');
		const status = {
			volume: this.state.volume,
    };
    playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
    await playbackInstance.loadAsync(source, status, false);
    this.setState({
      playbackInstance
    });
  } 

  handleUkuleleTrack = async () => {
    let {isUkulelePlaying, playbackInstance} = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
////////////////
playbackInstance = new Audio.Sound();
const source = require('./music/ukulele.mp3')
		const status = {
			shouldPlay: this.state.isUkulelePlaying,
			volume: this.state.volume,
    };
    playbackInstance
      .setOnPlaybackStatusUpdate(
        this.onPlaybackStatusUpdate
      );
    await playbackInstance.loadAsync(source, status, false);
   isUkulelePlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
//////////////
      this.setState({
        playbackInstance,
        isUkulelePlaying: !isUkulelePlaying,
       // isDrumsPlaying: !isDrumsPlaying
      });
    }
  }

  handleDrumsTrack = async () => {
    let { isDrumsPlaying, playbackInstance} = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
    playbackInstance = new Audio.Sound();
      const source = require('./music/drums.mp3')
		const status = {
			shouldPlay: this.state.isDrumsPlaying,
			volume: this.state.volume,
    };
    playbackInstance
      .setOnPlaybackStatusUpdate(
        this.onPlaybackStatusUpdate
      );
      await playbackInstance.loadAsync(source, status, false);
     isDrumsPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
     this.setState({
      playbackInstance,
      isDrumsPlaying: !isDrumsPlaying,
      //isUkulelePlaying: !isUkulelePlaying
    });
    }
  }

  onPlaybackStatusUpdate = (status) => {
    this.setState({
      isBuffering: status.isBuffering
    });
  }


  render() {
    return (
      <View style={styles.container}>
       <Text style={styles.heading}>Aloha Music</Text> 
        <Text style={[styles.largeText, styles.buffer]}>
          {this.state.isBuffering && this.state.isPlaying ? 'Buffering...' : null}
        </Text>
           <Image source={ukulelePic} style={styles.picture} />

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handleUkuleleTrack}
          >   
            {this.state.isUkulelePlaying  ?
              <Feather name="pause" size={32} color="#000"/> :
              <Feather name="play" size={32} color="#000"/> 
            }
            
          </TouchableOpacity>

        </View>

        <Text style={[styles.largeText, styles.buffer]}>
          {this.state.isBuffering || this.state.isPlaying ? 'Buffering...' : null}
        </Text>
        <Image source={drumPic} style={styles.picture} />

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handleDrumsTrack}
          >
            {this.state.isDrumsPlaying ?
              <Feather name="pause" size={32} color="#000"/> :
              <Feather name="play" size={32} color="#000"/> 
            }
          </TouchableOpacity>
        </View>
        
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f4e3cf',
    foregroundColor: '#563822',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buffer: {
    color: '#000'
  },

  heading: {
   // marginTop: 30,
    fontSize: 30,
   // fontWeight: 'bold',
    textAlign: 'center',
    width: 350,
    backgroundColor: '#da9547'
  },
  largeText: {
    fontSize: 22
  },
  smallText: {
    fontSize: 16
  },
  control: {
    marginTop: 20
  },
  picture: {
    width: 350, 
    height: 210,
  },
  controls: {
    flexDirection: 'row'
  }
});
