import { Image, StyleSheet, View, Text, ActivityIndicator, KeyboardAvoidingView,
    TouchableOpacity, Alert, Modal, TextInput, }
  from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';
import { Button, Radio, Checkbox } from 'galio-framework';
import { Button as Button_c } from 'react-native-paper';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel}
  from 'react-native-simple-radio-button';
import { Dimensions } from "react-native";
import PasswordInputText from 'react-native-hide-show-password-input';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('window').height;

import colors from '../utils/colors';

let customFonts  = {
  'PlayfairDisplay-Medium': require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
  'BerkshireSwash-Regular': require('../assets/fonts/BerkshireSwash-Regular.ttf'),
};

import * as firebase from 'firebase';

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

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


export default class Love extends React.Component {

  componentDidMount() {
    this._loadFontsAsync();
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  constructor(props){
    super(props);

    this.state = {
      modalVisible: true,
      fontsLoaded: false,
      username: '',
      email: '',
      password: '',
      not_show: true,
    }
  }

  usernameChangeText = username => {
    this.setState({ username });
  };

  emailChangeText = email => {
    this.setState({ email });
  };

  passwordChangeText = password => {
    this.setState({ password });
  };

  render() {
    const { modalVisible, not_show, fontsLoaded, username, email, password } = this.state;

    if (!fontsLoaded) return null;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <KeyboardAvoidingView behavior='padding' style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Log in</Text>
              <Text style={{ fontSize: 10}}>You need to log in to both answer and create questions!</Text>
              <Text style={styles.title}>Username</Text>
              <View style={styles.semiTitle} />
              <TextInput
                style={styles.input}
                autoCorrect={false}
                value={username}
                underlineColorAndroid="transparent"
                onChangeText={this.usernameChangeText}
                placeholder={'Anything is OK!'}
              />

              <Text style={styles.title}>Email</Text>
              <View style={styles.semiTitle} />
              <TextInput
                style={styles.input}
                value={email}
                autoCorrect={false}
                underlineColorAndroid="transparent"
                onChangeText={this.emailChangeText}
                placeholder={'Email'}
              />
              <Text style={styles.title}>Password</Text>
              <View style={styles.semiTitle} />
              <TextInput
                style={styles.input}
                value={password}
                autoCorrect={false}
                secureTextEntry={not_show}
                underlineColorAndroid="transparent"
                onChangeText={this.passwordChangeText}
                placeholder={'Password'}
              />
              <View style={{ marginTop: 10 }} />
              <Checkbox initialValue={false} onChange={() => this.setState({not_show: !not_show})} color='success' label="Show password" />
              <View style={{ marginTop: 20,flexDirection: 'row'}}>
                <Button style={{width: 100,}} color='theme' onPress={() => this.setState({ modalVisible: false })}>
                  Later
                </Button>
                <Button style={{width: 100,}} color='success' onPress={() => { this.setState({ modalVisible: false}); }}>
                  Log in
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <View>
          <Button color='theme' onPress={() => this.setState({ modalVisible: true})}>
            Delete
          </Button>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    fontSize: 60,
    fontFamily: 'BerkshireSwash-Regular',
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 100,
    marginTop: 22,
    backgroundColor: 'hsla(90, 75%, 75%, 0.2)',
  },
  modalView: {
    margin: 10,
    height: 550,
    width: 350,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: '#89de47',
    borderWidth: 2,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    borderColor: colors.black,
    borderWidth: 2,
    borderColor: colors.darkGrey,
    height: 40,
    width: screenWidth*7/9,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 0,
    textAlign: 'center',
    fontSize: 17,
    // fontFamily: 'PlayfairDisplay-Medium',
  },
  title: {
    marginTop: 15,
    fontSize: 20,
    // fontFamily: 'PlayfairDisplay-Medium',
  },
  semiTitle: {
    marginTop: 5,
    // fontFamily: 'PlayfairDisplay-Medium',
  }
});
