// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './routes';

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

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
