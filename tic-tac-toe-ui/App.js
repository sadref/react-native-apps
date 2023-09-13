import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, useWindowDimensions } from 'react-native';


export default function App() {
  const { styles } = useStyle();
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

const useStyle = () => {
  const dimensions = useWindowDimensions();
  const borderWith = 0.003 * dimensions.width;
  const padding = 0.002 * dimensions.width;
  const boxWidth = 0.142 * dimensions.width;
  const boxHeight = 0.142 * dimensions.height;
  const borderColor = 'paleturquoise';
  console.log('Logging dimensions', dimensions)

  const styles = StyleSheet.create({
  
    root: {
      flex: 1,
      //backgroundColor: 'cyan',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0.0438 * dimensions.height,
      padding: 0.0438 * dimensions.height,
    },
    row: {
      flexDirection: 'row',
    },
    boxOne: {
      flex: 1,
      height: boxHeight,
      width: boxWidth,
      borderRightWidth: borderWith,
      borderBottomWidth: borderWith,
      borderColor: borderColor,
      padding: padding,
      justifyContent: 'center',
      alignItems: 'center',
  
    },
    boxTwo: {
      flex: 1,
      height: boxHeight,
      width: boxWidth,
      borderRightWidth: borderWith,
      borderBottomWidth: borderWith,
      borderColor: borderColor,
      padding: padding,
      justifyContent: 'center',
      alignItems: 'center',
    },
    boxThree: {
      flex: 1,
      height: boxHeight,
      width: boxWidth,      
      borderBottomWidth: borderWith,
      borderColor: borderColor,
      padding: padding,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lastBoxOne: {
      flex: 1,
      height: boxHeight,
      width: boxWidth,
      borderRightWidth: borderWith,
      borderColor: borderColor,
      padding: padding,
      justifyContent: 'center',
      alignItems: 'center',
  
    },
    lastBoxTwo: {
      flex: 1,
      height: boxHeight,
      width: boxWidth,
      borderRightWidth: borderWith,
      borderColor: borderColor,
      padding: padding,
      justifyContent: 'center',
      alignItems: 'center',
  
    },
    lastBoxThree: {
      flex: 1,
      height: boxHeight,
      width: boxWidth,      
      borderBottomWidth: borderWith,
      borderColor: 'white',
      padding: padding,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    text: {
      fontSize: 0.08 * dimensions.height,
      //fontFamily: 'lucida grande',
      fontWeight: 'semibold',
      color: 'slategray',
      padding: padding,
    },
  })

  return { styles }
}

export { App }
