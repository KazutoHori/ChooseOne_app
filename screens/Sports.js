import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';


export default class Sports extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Questions You Answered</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1efef',
    justifyContent: 'center',
    flex: 1,
  }
})
