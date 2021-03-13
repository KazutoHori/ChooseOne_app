import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import * as Font from 'expo-font'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from "react-native";
import email from 'react-native-email'
import * as firebase from 'firebase';

import colors from '../utils/colors';
import { Button } from 'galio-framework';
import { sub } from 'react-native-reanimated';

const firebaseConfig = {
  apiKey: "AIzaSyArjDv3hS4_rw1YyNz-JFXDX1ufF72bqr8",
  authDomain: "chooseone-105a9.firebaseapp.com",
  databaseURL: "https://chooseone-default-rtdb.firebaseio.com",
  projectId: "chooseone",
  storageBucket: "chooseone.appspot.com",
  messagingSenderId: "722704825746",
  appId: "1:722704825746:web:73f11551b9e59f4bc2d54b",
  measurementId: "G-YJ97DZH6V5"
};
if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
const screenWidth = Dimensions.get("window").width;
let customFonts  = {
  'BerkshireSwash-Regular': require('../assets/fonts/BerkshireSwash-Regular.ttf'),
  'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
}

export default class QuestionAnswered extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fontsLoaded: false,
      loading: true,
      subject: '',
      body: '',
      name: '',
    };
  }

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

    var user = firebase.auth().currentUser;
    if(user){
      this.setState({
        name: user.displayName,
      })
    }
  }

  onSend = () => {
    const { name, subject, body } = this.state;
    const to = ['admin@chooseone.app']
    email(to, {
        subject: subject+'  by '+name,
        body: body,
    })
  }

  render() {
    const { name, subject, body, loading, fontsLoaded } = this.state;
    const { navigation: { openDrawer, navigate }} = this.props;

    if(!fontsLoaded) return null;
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
          <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
              <View style={{ alignItems: 'center'}}>
                <Text style={styles.text}>Contact Us</Text>
                <Text style={{ padding: 30, fontSize: 15,}}>If you have any questions or comments {'\n'}    about this app, please e-mail us!!!</Text>
              </View>
              <View style={styles.form}>
                <TextInput
                  style={[styles.input, {textAlign: 'center'}]}
                  value={name}
                  autoCorrect={false}
                  placeholder='Name'
                  underlineColorAndroid="transparent"
                  onChangeText={text => this.setState({ name: text  })}
                  onSubmitEditing={this.handleSubmitEditing}
                />
                <TextInput
                  style={[styles.input, { textAlign: 'center' } ]}
                  value={subject}
                  autoCorrect={false}
                  placeholder='Subject'
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({ subject: text })}
                  onSubmitEditing={this.handleSubmitEditing}
                />
                <TextInput
                  style={[styles.input, { height: 170, padding: 20, paddingTop: 15, alignSel: 'center' }]}
                  multiline={true}
                  value={body}
                  autoCorrect={false}
                  placeholder='Type here!'
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({ body: text })}
                  onSubmitEditing={this.handleSubmitEditing}
                />
                <Button onPress={this.onSend} color='success'>Send</Button>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  form: {
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
    borderRadius: 20,
    marginTop: 7,
    fontSize: 17,
    fontFamily: 'PlayfairDisplay-Regular',
  },
});
