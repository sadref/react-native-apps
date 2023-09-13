import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, DeviceEventEmitter} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';


export default class App extends React.Component {
  render() {
    const eventEmitter = DeviceEventEmitter.addListener("event.test", (event)=>{alert("event:test")})
    eventEmitter.remove();
    setTimeout(()=>{
      DeviceEventEmitter.emit('event.test', {});
    },2000);
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  return (
    <SafeAreaView style={styles.areaview}>
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hello</Text>
      <Text style={styles.subtitleText}>My name is</Text>
      <StatusBar style="auto" />
      <View style={styles.box}>
        <Text style={styles.mynameText}>First App 😃💪
        </Text>
      </View>
    </View>
    </SafeAreaView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
     fontSize: 90,
     textTransform: 'uppercase',
     fontWeight: 'bold',
     color: 'white',
     textAlign: 'center'
  },
  subtitleText: {
    fontSize: 30,
     textTransform: 'uppercase',
     fontWeight: 'bold',
     color: 'white',
     marginBottom: 20,
     textAlign: 'center'
  },
  box: {
    width: '100%',
    height: '55%',
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center'
  },
  mynameText: {
    fontSize: 60,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  areaview: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});
