
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
  import { availables } from '../utils/characters';
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get('window').height;
  
  import colors from '../utils/colors';
  
  let customFonts  = {
    'PlayfairDisplay-Medium': require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
    'BerkshireSwash-Regular': require('../assets/fonts/BerkshireSwash-Regular.ttf'),
  };
  
  import * as firebase from 'firebase';
  
  export default class SignupModal extends React.Component {
  
    componentDidMount() {
      const { visibility } = this.props;
      this.setState({ s_modalVisible: visibility });
      this._loadFontsAsync();
    }
  
    async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }
  
    constructor(props){
      super(props);
  
      this.state = {
        s_modalVisible: true,
        l_modalVisible: true,
        fontsLoaded: false,
        username: '',
        email: '',
        password: '',
        not_show: true,
        error: '',
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
  
  
  
    onSignup = () => {
      const { error, username, email, password} = this.state;
  
      var u_valid=true;
      for(let i=0; i<username.length; i++){
        if(!availables.includes(username[i])){ 
          u_valid=false;
        }
      }
      if(!u_valid){
        this.setState({ error: 'Your username must consist of only alphabets, numbers, _ and -'});
        setTimeout(() => this.setState({ error: ''}),2500);
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
      if( email.length<5 || !email.includes('.') || !email.includes('@')){
        this.setState({ error: 'The email is not a valid email address'});
        setTimeout(() => this.setState({ error: ''}),2500);
        return null;
      }
      var p_valid=true;
      for(let i=0; i<password.length; i++){
        if(!availables.includes(password[i])) p_valid=false;
      }
      if(!p_valid){
        this.setState({ error: 'Your password must consist of only alphabets, numbers, _ and -'});
        setTimeout(() => this.setState({ error: ''}),2500);
        return null;
      }
      if(password.length < 6) {
        this.setState({ error: 'Password must be at least 6 characters'});
        setTimeout(() => this.setState({ error: ''}),2500);
        return null;
      }
      
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
        this.setState({ error: user });
      });
      if(error === ''){
        this.setState({ s_modalVisible: false });
      }else{
        return null;
      }
    }
  
    onLogin = () => {
      const { email, password } = this.state;
  
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user) {
          console.error(user)
        });
        this.setState({ l_modalVisible: false });
    }
  
    render() {
      const { error, s_modalVisible, l_modalVisible, not_show, fontsLoaded, username, email, password } = this.state;
  
      if (!fontsLoaded) return null;
  
      return (
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
    // paddingTop: 100,
    marginTop: 22,
    backgroundColor: 'hsla(180, 75%, 55%, 0.2)',       // 90
  },
  modalView: {
    margin: 10,
    height: 550,
    width: 350,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: colors.blue,                          // #89de47
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
  