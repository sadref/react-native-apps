import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.view}>
        <View style={styles.sep}>
        </View>
        <View style={styles.sepa}>
          <FlatList
            data={['O', 'X', 'X', 'X', 'O', 'O', 'X', 'X', 'O']}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View style={[index%3 === 0  ? {borderLeftWidth:0} : {borderLeftWidth:3},
                            index !== 2 && (index === 6 || index === 7 || index === 8)  ? {borderBottomWidth: 0} : {borderBottomWidth: 3},
                            styles.item]}>
              <Text style={styles.text}>{item}</Text>
              </View>
            )}
          />
        </View> 
        <View style={styles.sep}>
        </View>        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 80,
    fontWeight: 'semibold',
    color: 'slategray',
    padding: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'paleturquoise',
    padding: 10,
  },
  sep: {
    flex: 1,
  },
  sepa: {
    flex: 2,
  }, 
});
