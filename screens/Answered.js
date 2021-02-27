import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';


export default class Answered extends React.Component {
  static navigationOptions = ({ navigation: { openDrawer, navigate }}) => ({
    title: 'Questions You asked',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'red',
    },
    style: {
      paddingTop: 35,
    }
  });

  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
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
