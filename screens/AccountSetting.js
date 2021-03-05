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
import { Button, Switch } from 'galio-framework';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';

import colors from '../utils/colors';
import { availables } from '../utils/characters';

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
    username: 'KazutoHori',
    email: 'kazutohori0714@icloud.com',
    show: false,
    password: 'Kazuto0714',
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
    const { loading, text, fontsLoaded, username, email, show, password } = this.state;
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
                  <Text style={[styles.letter,]}>
                    Username:     {user.displayName}
                  </Text>
                  <View style={{ position: 'absolute', right: 10, top: 0 }}>
                    <Avatar
                      rounded
                      title={initials}
                      size='small'
                      backgroundColor={'hsla('+num+',95%,55%, 1)'}
                    />
                  </View>
                </View>
                <TouchableOpacity style={{ flexDirection: 'column', marginTop: 25, marginLeft: 30,}}><Text style={[styles.letter, {fontSize: 15, color: colors.blue }]}>Change Username?</Text></TouchableOpacity>
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
  ttext: {
    alignItems: 'center',
  },
});


// <View style={styles.set_password}>
//   <TouchableOpacity><Text style={[styles.letter, {fontSize: 15, color: colors.blue }]}>Change Password?</Text></TouchableOpacity>
//   <Text>     or     </Text>
//   <TouchableOpacity><Text style={[styles.letter, {fontSize: 15, color: colors.blue}]}>Forgot Password?</Text></TouchableOpacity>
// </View>



{/* <View style={[styles.col]}>
<View style={styles.password}>
  <Text style={[styles.letter]}>
    Password:
  </Text>
  {!show && <Text style={styles.letter}>      *********</Text>}
  {show && <Text style={styles.letter}>      {user.password}</Text>}
  <Switch
    value={show}
    style={{position: 'absolute', right: 10, top: 0,}}
    onValueChange={() => this.setState({ show: !show })}
    onChange={() => {}}
  />
</View>
</View> */}

