import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';
import * as Font from 'expo-font'

let customFonts  = {
  'Sofia-Regular': require('../assets/fonts/Cookie-Regular.ttf'),
}

export default class Create extends React.Component {
  static navigationOptions = () => ({
    title: 'Let\'s Create A Question!',
    // headerStyle: {
    //   backgroundColor: 'red',
    // },
    headerTitleStyle: {
      // fontFamily: 'Sofia-Regular',
    },
  });

  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Let's Add Your own Questions!</Text>

        </View>
      );
    }else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1efef',
    // justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Sofia-Regular',
    fontWeight: '100',
    fontSize: 50,
  },
})
