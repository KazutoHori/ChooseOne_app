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

  nameChangeText = text => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    // const { onSubmit } = this.props;
    const { text } = this.state;

    // onSubmit(text);
    this.setState({ text: '' });
  };

  render() {
    const { loading, text, fontsLoaded } = this.state;
    const { navigation: { openDrawer, navigate }} = this.props;

    if (fontsLoaded) {
      return (
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.topbar}>
              {loading && (
                <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
              )}
              <TouchableWithoutFeedback onPress={() => navigate('QuestionAnswered')}>
                <Image source={require('../assets/ChooseOne1.png')} onLoad={this.handleLoad} style={{ top: 16, left: 20}}/>
              </TouchableWithoutFeedback>
              <TouchableOpacity onPress={() => openDrawer()} style={{ position: 'absolute', right: 25, top: 15}}>
                <Icon name={'cogs'} size={30} style={{ color: colors.grey }} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.back} onPress={() => navigate('QuestionAnswered')}>
              <Icon name={'chevron-down'} size={30} style={{ color: colors.blue }} />
            </TouchableOpacity>
            <View style={{ alignItems: 'center'}}>
              <Text style={styles.text}>Contact Us</Text>
              <Text style={{ padding: 30, fontSize: 15,}}>If you have any questions or comments {'\n'}    about this app, please e-mail us!!!</Text>
            </View>
            <View style={styles.form}>
              <Text>Name</Text>
              <TextInput
                style={[styles.input, {textAlign: 'center'}]}
                value={text}
                autoCorrect={false}
                underlineColorAndroid="transparent"
                onChangeText={this.handleChangeText}
                onSubmitEditing={this.handleSubmitEditing}
              />
              <Text>Comments</Text>
              <TextInput
                style={[styles.input, { height: 300 }]}
                multiline={true}
                value={text}
                autoCorrect={false}
                underlineColorAndroid="transparent"
                onChangeText={this.handleChangeText}
                onSubmitEditing={this.handleSubmitEditing}
              />
            </View>
          </View>
        </SafeAreaView>
      );
    }else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
  form: {
    // marginTop: 10,
    padding: 10,
    backgroundColor: colors.white,
    width: screenWidth,
    alignItems: 'center',
  },
  back: {
    padding: 10,
    alignItems: 'center',
  },
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
    marginBottom: 10,
  },
  text: {
    fontFamily: 'BerkshireSwash-Regular',
    fontWeight: '100',
    fontSize: 40,
    alignItems: 'center',
    paddingLeft: 20,
  },
  input: {
    borderColor: colors.black,
    borderWidth: 2,
    borderColor: colors.darkGrey,
    height: 40,
    width: screenWidth*5/7,
    borderRadius: 5,
    marginTop: 7,
    fontSize: 12,
    fontFamily: 'PlayfairDisplay-Regular',
  },
});
