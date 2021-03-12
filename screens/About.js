import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import * as Font from 'expo-font'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from "react-native";

import colors from '../utils/colors';

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
      text: '',
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
  }

  render() {
    const { loading, text, fontsLoaded } = this.state;
    const { navigation: { openDrawer, navigate }} = this.props;

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
              <Text style={styles.text}>About This App</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.letter}>
                <View style={{ paddingLeft: 20}} />
                <Text>ChooseOne's </Text><Text style={styles.stress}>MISSION</Text><Text> is to let you have access to general understandings through user-interactive questions. You can create your own questions and get to know what people think, which is one of the biggest features of ChooseOne.</Text>
              </Text>
              <Text style={styles.letter}>
                <View style={{ paddingLeft: 20}} />
                The <Text style={styles.stress}>HEART</Text> of ChooseOne is your votes. The more you vote, the more you can influence the results and ,in the long run, can be helpful to people in the world who want to know the results.
              </Text>
              <Text style={styles.letter}>
                <View style={{ paddingLeft: 20}} />
                I sincerely <Text style={styles.stress}>HOPE</Text> ChooseOne will be helpful and enjoyable to you all even a little. Nothing can be substituted with your pleasant experience with ChooseOne for me.
              </Text>
              <View style={styles.thankv}>
                <Text style={styles.thank}>
                  <Text>   </Text>Thank you for using ChooseOne!
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
  stress: {
    fontFamily: 'BerkshireSwash-Regular',
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  thankv: {
    alignItems: 'center',
    marginTop: 60,
    paddingLeft: 30,
    paddingRight: 30,
  },
  thank: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'BerkshireSwash-Regular',
  },
  content: {
    margin: 20,
    marginLeft: 30,
  },
  letter: {
    fontFamily: 'PlayfairDisplay-Regular',
    marginTop: 20,
    fontSize: 14,
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
  }
});
