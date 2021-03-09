import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator, SafeAreaView, TextInput, ScrollView,
  Linking, TouchableOpacity, TouchableWithoutFeedback, Image
} from 'react-native';
import * as Font from 'expo-font'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import { Button } from 'galio-framework';

import colors from '../utils/colors';

let customFonts  = {
  'BerkshireSwash-Regular': require('../assets/fonts/BerkshireSwash-Regular.ttf'),
  'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
}

export default class QuestionAnswered extends React.Component {
  static navigationOptions = () => ({
    // title: 'Let\'s Create A Question!',
    // headerTintColor: colors.white,
    // headerStyle: {
    //   backgroundColor: colors.blue,
    //   // marginTop: 40,
    //   // height: 30,
    // },
    // headerTitleStyle: {
    //   // fontFamily: 'BerkshireSwash-Regular',
    // },
    // headerTitleContainerStyle: {
    //   // marginTop: 100,
    // }
  });

  state = {
    fontsLoaded: false,
    loading: true,
    text: '',
  };

  handleLoad = () => {
    this.setState({
      loading: false,
    });
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    const { loading, text, fontsLoaded } = this.state;
    const { navigation: { openDrawer, navigate }} = this.props;

    if (fontsLoaded) {
      return (
        <SafeAreaView>
          <ScrollView style={styles.container}>
            <View style={styles.topbar}>
              {loading && (
                <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
              )}
              <TouchableWithoutFeedback onPress={() => navigate('QuestionAnswered')}>
                <Image source={require('../assets/ChooseOne1.png')} onLoad={this.handleLoad} style={{ top: 16, left: 20}}/>
              </TouchableWithoutFeedback>
              <TouchableOpacity onPress={() => openDrawer()} style={{ position: 'absolute', right: 75, top: 15}}>
                <Icon name={'archive'} size={30} style={{ color: colors.grey }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openDrawer()} style={{ position: 'absolute', right: 25, top: 15}}>
                <Icon name={'cogs'} size={30} style={{ color: colors.grey }} />
              </TouchableOpacity>
            </View>
            <View style={styles.ttext}>
              <Text style={styles.text}>Answered Questions</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
  button: {

  },
  topbar: {
    // marginTop: 40,
    width: screenWidth,
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'red',
    borderTopWidth: 0.3,
    borderColor: 'white',
    // marginBottom: 10,
  },
  text: {
    fontFamily: 'BerkshireSwash-Regular',
    fontWeight: '100',
    fontSize: 30,
    alignItems: 'center',
    paddingLeft: 20,
    textAlign: 'center',
  },
  ttext: {
    paddingTop: 30,
    alignItems: 'center',
  },
});
