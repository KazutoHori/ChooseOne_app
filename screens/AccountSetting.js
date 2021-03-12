import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import * as Font from 'expo-font'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from "react-native";
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';

import colors from '../utils/colors';
import { availables } from '../utils/variables';

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
      username: '',
      changing: false,
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
    this.setState({
      username: user.displayName,
      email: user.email,
    });
  }

  usernameChange = text => {
    this.setState({ username: text });
  }

  finishChange = () => {
    this.setState({ changing: false });
    const { navigation: { state: {params} }} = this.props;
    const { changeUsername } = params;
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: this.state.username
    });
    changeUsername(this.state.username);
  }

  render() {
    const { changing, loading, text, fontsLoaded, username, email, show, password } = this.state;
    const { navigation: { openDrawer, navigate }} = this.props;

    const initials=username.toUpperCase().slice(0,2);
    let num=(availables.indexOf(initials[0])+1)*1000+availables.indexOf(initials[1])*100;

    var user = firebase.auth().currentUser;

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
            <View style={styles.ttext}>
              <Text style={styles.text}>Acount Settings</Text>
            </View>
            <View style={styles.content}>
              <View style={[styles.col, ]}>
                <View style={{ flexDirection: 'row'}}>
                  {!changing && (
                    <Text style={[styles.letter,]}>
                      Username:     {username}
                    </Text>
                  )}
                  {changing && (
                    <View style={{ flexDirection: 'row'}}>
                      <Text style={[styles.letter,]}>Username:     </Text>
                      <TextInput
                        autoCorrect={false}
                        autoFocus={true}
                        clearButtonMode='always'
                        width='1'
                        style={[styles.letter,{ width: 160 }]}
                        value={username}
                        onChangeText={this.usernameChange}
                        onSubmitEditing={this.finishChange}
                      />
                    </View>
                  )}
                  <View style={{ position: 'absolute', right: 10, top: 0 }}>
                    <Avatar
                      rounded
                      title={initials}
                      size='small'
                      backgroundColor={'hsla('+num+',95%,55%, 1)'}
                    />
                  </View>
                </View>
                <TouchableOpacity onPress={() => this.setState({ changing: true })} style={{ flexDirection: 'column', marginTop: 25, marginLeft: 30,}}><Text style={[styles.letter, {fontSize: 15, color: colors.blue }]}>Change Username?</Text></TouchableOpacity>
              </View>
              <View style={[styles.col]}>
                <Text style={[styles.letter]}>
                  Email:             {user.email}
                </Text>
              </View>
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
  set_password: {
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 30,
  },
  col: {
    borderColor: colors.darkGrey,
    borderBottomWidth: 0.3,
    paddingBottom: 23,
    paddingTop: 23,
  },
  letter: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 17,
  },
  password: {
    flexDirection: 'row',
  },
  content: {
    padding: 30,
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
  ttext: {
    alignItems: 'center',
  },
});
