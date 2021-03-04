import { Image, StyleSheet, View, Text, ActivityIndicator,
    TouchableOpacity, Alert, Modal, }
  from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';
import { Button, Radio } from 'galio-framework';
import { Button as Button_c } from 'react-native-paper';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel}
  from 'react-native-simple-radio-button';
import { Dimensions } from "react-native";
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


export default class LoginForm extends React.Component {
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  constructor(props){
    super(props);

    this.state = {
      modalVisible: true,
    }
  }

  render() {
    const { modalVisible } = this.state;

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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Log in</Text>
              <View style={{ flexDirection: 'row'}}>
                <Button style={{width: 100,}} color={colors.blue} onPress={() => this.setState({ modalVisible: false })}>
                  No
                </Button>
                <Button style={{width: 100,}} color='theme' onPress={() => { this.setState({ modalVisible: false}); navigate('Top') }}>
                  Delete
                </Button>
              </View>
            </View>
          </View>
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
    fontSize: 30,
    fontFamily: 'BerkshireSwash-Regular',
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
});
