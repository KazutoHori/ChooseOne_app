import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Constants,
} from 'react-native';
import React from 'react';
import * as Font from 'expo-font';
import { Button, Checkbox } from 'galio-framework';
import { Dimensions } from "react-native";
import * as Notifications from 'expo-notifications';
import { showMessage } from 'react-native-flash-message';
import * as firebase from 'firebase';

import { availables } from '../utils/variables';
import colors from '../utils/colors';

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
require("firebase/firestore");
var db = firebase.firestore();
const screenWidth = Dimensions.get("window").width;
let customFonts  = {
  'PlayfairDisplay-Medium': require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
  'BerkshireSwash-Regular': require('../assets/fonts/BerkshireSwash-Regular.ttf'),
};


export default class LoginForm extends React.Component {

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  constructor(props){
    super(props);

    this.state = {
      s_modalVisible: true,
      l_modalVisible: false,
      fontsLoaded: false,
      username: '',
      email: '',
      password: '',
      not_show: true,
      error: '',
    }
  }

  componentDidMount(){
    this._loadFontsAsync();
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

  registerForPushNotificationsAsync = async (user) => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    db.collection('users').doc(user.uid).update({
      'expoToken': token
    })

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  onSignup = async () => {
    const { error, username, email, password} = this.state;

    var u_valid=true;
    for(let i=0; i<username.length; i++){
      if(!availables.includes(username[i])){
        u_valid=false;
      }
    }
    if(!u_valid){
      this.setState({ error: "Your username must consist of only A-Z, a-z, 0-9, _ and -, ., /, ), (, &, =, |, @, ¥, :, ', ! " });
      setTimeout(() => this.setState({ error: ''}),10000);
      return null;
    }
    if( username.length > 19){
      this.setState({ error: 'Username must be less than 20 characters'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }
    if( username.length < 2){
      this.setState({ error: 'Username must be at two characters'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }
    if( email.length<5 || !this.validateEmail(email)){
      this.setState({ error: 'The email is not valid'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }
    var p_valid=true;
    for(let i=0; i<password.length; i++){
      if(!availables.includes(password[i])) p_valid=false;
    }
    if(!p_valid){
      this.setState({ error: 'Your password must consist of only alphabets, numbers, ".", _ and -'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }
    if(password.length < 6) {
      this.setState({ error: 'Password must be at least 6 characters'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }

    await firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      const { signedIn } = this.props;
      let current=new Date();
      current=current.toJSON();
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          showMessage({
            message: "You have now logged in!",
            type: "success",
            icon: 'success',
          });
          user.updateProfile({
            displayName: username,
          });
          signedIn();
          db.collection('users').doc(user.uid).set({
            email: user.email,
            uid: user.uid,
            created: current.slice(0, 10)+current.slice(11, 19),
            question_answered: [],
            question_created: [],
            question_liked: [],
            username: username,
          }).then(() => {
            this.registerForPushNotificationsAsync(user);
          })
        }
      })

      if(error === ''){
        this.setState({ s_modalVisible: false });
        if('closeDrawer' in this.props ){
          const { closeDrawer } = this.props;
          closeDrawer();
        }
      }else{
        return null;
      }
    }).catch((e) => {
      var errorMessage = e.message;
      this.setState({ error: errorMessage });
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    });
  }

  onLogin = () => {
    const { email, password } = this.state;

    if( email.length<5 || !this.validateEmail(email)){
      this.setState({ error: 'The email is not valid'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }
    var p_valid=true;
    for(let i=0; i<password.length; i++){
      if(!availables.includes(password[i])) p_valid=false;
    }
    if(!p_valid){
      this.setState({ error: 'Your password must consist of only alphabets, numbers, ".", _ and -'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }
    if(password.length < 6) {
      this.setState({ error: 'Password must be at least 6 characters'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          showMessage({
            message: "You have now logged in!",
            type: "success",
            icon: 'success',
          });
          this.registerForPushNotificationsAsync(user);
          const { signedIn } = this.props;
          signedIn();
        }
      })

      this.setState({ l_modalVisible: false });

      if('closeDrawer' in this.props){
        const { closeDrawer } = this.props;
        closeDrawer();
      }
    }).catch((e) => {
      var errorMessage = e.message;
      this.setState({ error: errorMessage });
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    });
  }

  render() {
    const { error, s_modalVisible, l_modalVisible, not_show, fontsLoaded, username, email, password,
      } = this.state;

    if (!fontsLoaded) return null;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={s_modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!s_modalVisible);
          }}
        >
          <KeyboardAvoidingView behavior='padding' style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Sign Up</Text>
              <Text style={{ fontSize: 9}}>You need to sign up to both answer and create questions!</Text>
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
              {error !== '' && (<View style={{ marginTop: 10 }}><Text style={{ color: 'red' }}>{error}</Text></View>)}
              {error === '' && (<TouchableOpacity onPress={() => { this.setState({ s_modalVisible: false, l_modalVisible: true})}} style={{ marginTop: 10, }}><Text style={{ color: colors.blue, }}>You already have an account?</Text></TouchableOpacity>)}
              <View style={{ marginTop: 20,flexDirection: 'row'}}>
                <Button style={{width: 100,}} color='theme' onPress={() => this.setState({ s_modalVisible: false })}>
                  Later
                </Button>
                <Button style={{width: 100,}} color='success' onPress={this.onSignup}>
                  Sign Up
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={l_modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!l_modalVisible);
          }}
        >
          <KeyboardAvoidingView behavior='padding' style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Log In</Text>
              <Text style={styles.welcome}>Welcome back!</Text>
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
              <View style={{ marginTop: 20 }} />
              <Checkbox initialValue={false} onChange={() => this.setState({not_show: !not_show})} color='success' label="Show password" />
              {error !== '' && (<View style={{ marginTop: 20 }}><Text style={{ color: 'red' }}>{error}</Text></View>)}
              {error === '' && (<TouchableOpacity onPress={() => { this.setState({ s_modalVisible: true, l_modalVisible: false})}} style={{ marginTop: 20, }}><Text style={{ color: colors.blue, }}>You do not have an account?</Text></TouchableOpacity>)}
              <View style={{ marginTop: 30,flexDirection: 'row'}}>
                <Button style={{width: 100,}} color='theme' onPress={() => this.setState({ l_modalVisible: false })}>
                  Later
                </Button>
                <Button style={{width: 100,}} color='success' onPress={this.onLogin}>
                  Log in
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
welcome: {
  fontFamily: 'PlayfairDisplay-Medium',
  fontSize: 20,
  marginBottom: 10,
},
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
  marginTop: 22,
  backgroundColor: 'hsla(180, 75%, 55%, 0.2)',
  backgroundColor: 'hsla(440, 55%, 1%, 0.2)'
},
modalView: {
  margin: 10,
  height: 550,
  width: 350,
  backgroundColor: "white",
  borderRadius: 30,
  borderColor: colors.white,                          // #89de47
  borderWidth: 2,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 10,
    height: 30,
  },
  shadowOpacity: 0.6,
  shadowRadius: 4,
  elevation: 100
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
},
title: {
  marginTop: 15,
  fontSize: 20,
},
semiTitle: {
  marginTop: 5,
}
});
