import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Linking, ScrollView, SafeAreaView, TouchableOpacity
} from 'react-native';
import { DrawerItems, DrawerNavigatorItems } from "react-navigation-drawer";
import { Avatar } from 'react-native-elements';
import * as Font from 'expo-font'
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../utils/colors';


let customFonts  = {
  'BerkshireSwash-Regular': require('../assets/fonts/BerkshireSwash-Regular.ttf'),
  'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
}

export default class About extends React.Component {
  state = {
    username: 'KazutoHori',
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
    const {username, fontsLoaded } = this.state;
    const { navigation: { navigate }} = this.props;

    const initials=username.toUpperCase().slice(0,2);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let num=(alphabet.indexOf(initials[0])+1)*1000+alphabet.indexOf(initials[1])*100;

    if(fontsLoaded){
      return (
        <View style={styles.container}>
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
        </View>
      );
    }else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
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
