import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';


export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.row}>
        <View style={styles.boxOne}>
        <Text style={styles.text}>O</Text>
        </View>
        <View style={styles.boxTwo}>
        <Text style={styles.text}>O</Text>
        </View>
        <View style={styles.boxThree}>
        <Text style={styles.text}>X</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.boxOne}>
        <Text style={styles.text}>X</Text>
        </View>
        <View style={styles.boxTwo}>
        <Text style={styles.text}>O</Text>
        </View>
        <View style={styles.boxThree}>
        <Text style={styles.text}>O</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.lastBoxOne}>
        <Text style={styles.text}>X</Text>
        </View>
        <View style={styles.lastBoxTwo}>
        <Text style={styles.text}>X</Text>
        </View>
        <View style={styles.lastBoxThree}>
        <Text style={styles.text}>O</Text>
        </View>
      </View>
    <StatusBar style="auto" />
    </SafeAreaView>
    

  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    //backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0.0438 * Dimensions.get('window').height,
    padding: 0.0438 * Dimensions.get('window').height,
  },
  row: {
    flexDirection: 'row',
    //padding: 1,
  },
  boxOne: {
    flex: 1,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    textAlign: 'center',
    borderColor: 'paleturquoise',

  },
  boxTwo: {
    flex: 1,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'paleturquoise',
  },
  boxThree: {
    flex: 1,
    borderBottomWidth: 3,
    borderColor: 'paleturquoise',
  },
  lastBoxOne: {
    flex: 1,
    borderRightWidth: 3,
    borderColor: 'paleturquoise',

  },
  lastBoxTwo: {
    flex: 1,
    borderRightWidth: 3,
    borderColor: 'paleturquoise',

  },
  lastBoxThree: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 0.08 * Dimensions.get('window').height,
    //fontFamily: 'lucida grande',
    fontWeight: 'semibold',
    color: 'slategray'
  }
});
