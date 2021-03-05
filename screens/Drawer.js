import React from 'react';
import {
  StyleSheet,
  Text,
  View, Modal,
  FlatList,
  ActivityIndicator,
  Linking, ScrollView, SafeAreaView, TouchableOpacity
} from 'react-native';
import { DrawerItems, DrawerNavigatorItems } from "react-navigation-drawer";
import { Avatar } from 'react-native-elements';
import * as Font from 'expo-font'
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Checkbox,  } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';

import LoginForm from './LoginForm';
import { availables } from '../utils/characters';
import colors from '../utils/colors';
import SignupModal from '../components/SignupModal';
// import { Button } from 'native-base';




let customFonts  = {
  'BerkshireSwash-Regular': require('../assets/fonts/BerkshireSwash-Regular.ttf'),
  'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
}

export default class About extends React.Component {
  state = {
    username: 'KazutoHori',
    fontsLoaded: false,
    modalVisible: false,
    loggedIn: false,
    s_modalVisible: false,
    l_modalVisible: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;

    if(user){
      this.setState({ loggedIn: true });
    }
    this._loadFontsAsync();
  }
  

  onLogout = () => {
    this.setState({ 
      loggedIn: false,
      modalVisible: false,
    });
    firebase.auth().signOut();
  }

  onSignup = () => {
    var user = firebase.auth().currentUser;

    if(user){
      this.setState({ loggedIn: true });
      return null;
    }

    this.setState({ s_modalVisible: true });
    return null;
  }

  render() {
    const {l_modalVisible, s_modalVisible, username, fontsLoaded, modalVisible, loggedIn } = this.state;
    const { navigation: { closeDrawer, navigate }} = this.props;

    const initials=username.toUpperCase().slice(0,2);
    let num=(availables.indexOf(initials[0])+1)*1000+availables.indexOf(initials[1])*100;

    if(!fontsLoaded) return null;
    return (
      <View style={styles.container}>
        {s_modalVisible && (<LoginForm closeDrawer={closeDrawer} />)}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure you want to log out?</Text>
              <View style={{ flexDirection: 'row'}}>
                <Button style={{width: 100,}} color={colors.blue} onPress={() => this.setState({ modalVisible: false })}>
                  No
                </Button>
                <Button style={{width: 100,}} color='theme' onPress={this.onLogout}>
                  Log out
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => navigate('AccountSetting')} style={styles.avatar}>
          <Avatar
            rounded
            title={initials}
            size='medium'
            backgroundColor={'hsla('+num+',95%,55%, 1)'}
          />
        </TouchableOpacity>
        <View style={styles.second}>
          <TouchableOpacity onPress={() => navigate('AccountSetting') } style={styles.user}>
            <Text style={styles.username}>{username}</Text>
            <Icon name={'chevron-right'} size={'12'} style={styles.arrow} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('About')} style={styles.settings}>
            <Text style={styles.text}>About This App</Text>
            <Icon name={'chevron-right'} size={'12'} style={styles.arrow} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('ContactUs')} style={styles.settings}>
            <Text style={styles.text}>Contact Us</Text>
            <Icon name={'chevron-right'} size={'12'} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.third}>
          <TouchableOpacity style={{marginTop: 10 }} onPress={() => navigate('AccountSetting') }>
            <Text style={styles.text}>Liked Questions</Text>
            <Icon name={'chevron-right'} size={'12'} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.logout}>
          {loggedIn && (<Button color='theme' onPress={() => this.setState({ modalVisible: true })}>Log Out</Button>)}
          {!loggedIn && (<Button color={colors.blue} onPress={this.onSignup}>Sign Up</Button>)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Medium',
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: 200,
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  logout: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  fourth: {
    paddingTop: 10,
    paddingBottom: 20,
    borderColor: colors.darkGrey,
    borderBottomWidth: 1,
  },
  third: {
    paddingTop: 10,
    paddingBottom: 20,
    borderColor: colors.darkGrey,
    borderBottomWidth: 1,
  },
  second: {
    paddingBottom: 20,
    borderColor: colors.darkGrey,
    borderBottomWidth: 1,
  },
  settings: {
    marginTop: 20,
  },
  text: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 22,
  },
  arrow: {
    position: 'absolute',
    top: 8,
    right: 0,
  },
  user: {
    flexDirection: 'row',
    marginTop: 10,
    borderColor: colors.darkGrey,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor:  colors.white,
    flex: 1,
  },
  avatar: {
    marginTop: 20,
  },
  username: {
    fontSize: 25,
    fontFamily: 'BerkshireSwash-Regular',
  }
})


