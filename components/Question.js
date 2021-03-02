import { Image, StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import * as Font from 'expo-font'

import colors from '../utils/colors';

let customFonts  = {
  'PlayfairDisplay-Medium': require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
}

export default class Question extends React.Component {

  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    const { author, id, title, created, choices, onPress } = this.props;

    if(this.state.fontsLoaded){
      return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>Created: {created.slice(0,10)}</Text>
            <View style={styles.choices}>
              {choices.map(choice => (
                <Text style={styles.choice}>○　{choice.choice_text}</Text>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      );
    }else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    marginBottom: 10,
    backgroundColor: colors.white,
    padding: 10,
  },
  title: {
    fontSize:25,
    fontFamily: 'PlayfairDisplay-Medium',
  },
  date: {
    fontFamily: 'PlayfairDisplay-Medium',
    fontSize: 9,
    marginLeft: 10,
    color: colors.blue,
  },
  choice: {
    fontFamily: 'PlayfairDisplay-Medium',
    fontSize: 15,
    paddingTop: 5,
    paddingLeft: 40,
  }
});
