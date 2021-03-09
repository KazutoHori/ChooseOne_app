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
import { Button } from 'galio-framework';
import ModalDropdown from 'react-native-modal-dropdown';

import colors from '../utils/colors';
import QuestionList from '../components/QuestionList';

let customFonts  = {
  'BerkshireSwash-Regular': require('../assets/fonts/BerkshireSwash-Regular.ttf'),
  'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
}

import * as firebase from 'firebase';
var db = firebase.firestore();

const you_did = ['QuestionAnswered', 'QuestionCreated', 'QuestionLiked'];

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
    questions: [],
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

  onContent = async the_slug => {
    const { navigation: { navigate }} = this.props;

    var the_question={};
    the_question = await db.collection('questions').doc(the_slug);

    await the_question.get().then((doc) => {
      if (doc.exists) {
        the_question = doc.data();
      } else {
        console.error("No such document!");
      }
    }).catch((error) => {
        console.error("Error getting document:", error);
    });
    navigate('QuestionDetail', { question: the_question });
  }

  componentDidMount() {
    this._loadFontsAsync();

    var user = firebase.auth().currentUser;
    var ques = [];
    this.unsubscribe = db.collection("questions").where('users_answered', 'array-contains', user.uid).onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            ques.push(doc.data());
        });
        this.setState({ questions: ques });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { questions, loading, text, fontsLoaded } = this.state;
    const { navigation: { openDrawer, navigate }} = this.props;
    console.error(questions);

    if (fontsLoaded) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topbar}>
            {loading && (
              <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
            )}
            <TouchableWithoutFeedback onPress={() => navigate('QuestionAnswered')}>
              <Image source={require('../assets/ChooseOne1.png')} onLoad={this.handleLoad} style={{ top: 16, left: 20}}/>
            </TouchableWithoutFeedback>
            <ModalDropdown style={{ position: 'absolute', right: 75, top: 15 }} onSelect={(idx) => navigate(you_did[idx]) } dropdownStyle={{ height: 3*50+5 }} dropdownTextStyle={{ alignItems: 'center', fontWeight: '500', color: 'black', height: 50, width: 200, fontSize: 15, textAlign: 'center' }} showsVerticalScrollIndicator={false} options={['Questions you answerd', 'Questions you created', 'Questions you liked']} >
              <Icon name={'archive'} size={30} style={{ color: colors.grey }} />
            </ModalDropdown>
            <TouchableOpacity onPress={() => openDrawer()} style={{ position: 'absolute', right: 25, top: 15}}>
              <Icon name={'cogs'} size={30} style={{ color: colors.grey }} />
            </TouchableOpacity>
          </View>
          <View style={styles.ttext}>
            <Text style={styles.text}>Questions You Answered</Text>
          </View>

          {questions && (
            <QuestionList
              questions={questions}
              onPress={this.onContent}
            />
          )}
          {!questions && (
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'PlayfairDisplay-Medium', marginBottom: 20 }}>You have not yet answered any questions</Text>
            </View>
          )}
        </SafeAreaView>
      );
    }else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
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
    // marginBottom: 10,
  },
  text: {
    fontFamily: 'BerkshireSwash-Regular',
    fontWeight: '100',
    fontSize: 25,
    alignItems: 'center',
    paddingLeft: 20,
    textAlign: 'center',
  },
  ttext: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.grey,
    justifyContent: 'center',
    flex: 1,
  },
});
