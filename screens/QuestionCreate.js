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

export default class QuestionCreate extends React.Component {
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

  handleChangeText = text => {
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
    const { navigation: { navigate }} = this.props;

    if (fontsLoaded) {
      return (
        <SafeAreaView>
          <View style={styles.topbar}>
            {loading && (
              <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
            )}
            <TouchableWithoutFeedback onPress={() => navigate('QuestionCreate')}>
              <Image source={require('../assets/ChooseOne1.png')} onLoad={this.handleLoad} style={{ top: 16, left: 58,}}/>
            </TouchableWithoutFeedback>
            <TouchableOpacity style={{ position: 'absolute', right: 69, top: 13}}>
              <Icon name={'search'} size={30} style={{ color: colors.grey }} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.container}>
            <View style={styles.form}>
              <Text style={styles.text}>Let's Create Your Own Question!</Text>
              <Text style={styles.title}>Question</Text>
              <Text style={styles.semiTitle}>TItle</Text>
              <TextInput
                style={styles.input}
                value={text}
                underlineColorAndroid="transparent"
                onChangeText={this.handleChangeText}
                onSubmitEditing={this.handleSubmitEditing}
              />
              <Text style={styles.semiTitle}>Category</Text>
              <TextInput
                style={styles.input}
                value={text}
                underlineColorAndroid="transparent"
                onChangeText={this.handleChangeText}
                onSubmitEditing={this.handleSubmitEditing}
              />
              <Text style={styles.title}>Choices</Text>
              <Text style={styles.semiTitle}>Choice 1</Text>
              <TextInput
                style={styles.input}
                value={text}
                underlineColorAndroid="transparent"
                onChangeText={this.handleChangeText}
                onSubmitEditing={this.handleSubmitEditing}
              />
              <Text style={styles.semiTitle}>Choice 2</Text>
              <TextInput
                style={styles.input}
                value={text}
                underlineColorAndroid="transparent"
                onChangeText={this.handleChangeText}
                onSubmitEditing={this.handleSubmitEditing}
              />
              <Button style={{ width: screenWidth*2/3, marginTop: 20,}} color='info'>Add New Choice</Button>
              <Button style={{ width: screenWidth*2/3, marginTop: 10, marginBottom: 40,}} color="theme" disabled={true}>Remove Last Choice</Button>

              <Text>You can edit after you make one.</Text>
              <Button style={{ width: screenWidth*2/3, marginTop: 10, marginBottom: 70, }} color='success'>Add Question</Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  button: {

  },
  topbar: {
    width: screenWidth,
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'red',
    borderTopWidth: 0.3,
    borderColor: 'white',
    borderBottomWidth: 5,
    // marginBottom: 10,
  },
  input: {
    borderColor: colors.black,
    borderWidth: 2,
    borderColor: colors.darkGrey,
    height: 40,
    width: screenWidth*4/6,
    borderRadius: 5,
    marginTop: 7,
    // fontFamily: 'PlayfairDisplay-Regular',
  },
  form: {
    // marginTop: 10,
    padding: 20,
    backgroundColor: colors.white,
    width: screenWidth,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'BerkshireSwash-Regular',
    fontWeight: '100',
    fontSize: 40,
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  semiTitle: {
    marginTop: 20,
    fontFamily: 'PlayfairDisplay-Regular',
  }
})
