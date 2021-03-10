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
import { Tile } from 'react-native-elements';
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
    refreshing: false,
    screen: 'QuestionAnswered',
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
    navigate('QuestionDetail', { from_where: this.state.screen, question: the_question });
  }

  doRefresh = () => {
    this.setState({ refreshing: true });
    /// do refresh work here /////
    //////////////////////////////
    setTimeout( () => this.setState({refreshing: false}), 1500);
  }

  async componentDidMount() {
    this._loadFontsAsync();

    var user = firebase.auth().currentUser;
    // var ques;
    // if(user){
    //   db.collection("questions").where('users_answered', 'array-contains', user.uid).onSnapshot((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         ques.push(doc.data());
    //     });
    //   });
    // }
    // this.setState({ questions: ques });

    var ques = [];
    const { screen } = this.state;
    if(user){
      db.collection("users").doc(user.uid).onSnapshot((doc) => {
        ques = [];
        var questions_ = [];
        if(screen === 'QuestionAnswered') questions_ = doc.data().question_answered;
        else if(screen === 'QuestionCreated') questions_ = doc.data().question_created;
        else questions_ = doc.data().question_liked;

        // this.setState({ questions: ques });
        for(let i=0; i<questions_.length; i++){
          db.collection('questions').doc(questions_[i].question).get().then((doc) => {
            ques.unshift(doc.data())
            this.setState({ questions: ques });
          });
        }
      });
    }
  }

  onChange = idx => {
    this.setState({ screen: you_did[idx] });

    var user = firebase.auth().currentUser;
    var ques = [];
    if(user){
      db.collection("users").doc(user.uid).onSnapshot((doc) => {
        ques = [];
        var questions_ = [];
        if(you_did[idx] === 'QuestionAnswered') questions_ = doc.data().question_answered;
        else if(you_did[idx] === 'QuestionCreated') questions_ = doc.data().question_created;
        else questions_ = doc.data().question_liked;

        console.error(questions_);
        this.setState({ questions: ques });
        for(let i=0; i<questions_.length; i++){
          db.collection('questions').doc(questions_[i]).get().then((doc) => {
            ques.unshift(doc.data())
            this.setState({ questions: ques });
          });
        }
      });
    }
  }

  onContent = async the_slug => {
    const { navigation: { navigate }} = this.props;

    var the_question={};

    await db.collection('questions').doc(the_slug).get().then((doc) => {
      the_question = doc.data()
    });

    var user = firebase.auth().currentUser;

    if(user){
      await db.collection('users').doc(user.uid).get().then((doc) => {
        var goDetail = true;
        let i=0;
        for(i=0; i<doc.data().question_answered.length; i++){
          if(doc.data().question_answered[i].question === the_slug){
            goDetail=false;
            navigate('QuestionResult', { question: the_question, your_vote: doc.data().question_answered[i].answer})
          }
        }
        if(i===doc.data().question_answered.length && goDetail){
          navigate('QuestionDetail', { from_where: 'Top', question: the_question });
        }
      })
    }else{
      navigate('QuestionDetail', { from_where: 'Top', question: the_question });
    }
  }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  render() {
    const { screen, refreshing, questions, loading, text, fontsLoaded } = this.state;
    const { navigation: { openDrawer, navigate }} = this.props;

    var title='';
    if(screen === 'QuestionAnswered') title='Questions You Answered';
    else if(screen === 'QuestionCreated') title='Questions You Created';
    else title='Questions You Liked';

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
            <ModalDropdown style={{ position: 'absolute', right: 75, top: 15 }} onSelect={this.onChange} dropdownStyle={{ height: 3*40+5 }} dropdownTextStyle={{ fontWeight: '500', color: 'black', height: 40, width: 200, fontSize: 15, textAlign: 'center' }} showsVerticalScrollIndicator={false} options={['Questions You Answerd', 'Questions You Created', 'Questions You Liked']} >
              <Icon name={'archive'} size={30} style={{ color: colors.grey }} />
            </ModalDropdown>
            <TouchableOpacity onPress={() => openDrawer()} style={{ position: 'absolute', right: 25, top: 15}}>
              <Icon name={'cogs'} size={30} style={{ color: colors.grey }} />
            </TouchableOpacity>
          </View>
          <View style={styles.ttext}>
            <Text style={styles.text}>{title}</Text>
          </View>
          <View style={{ flex: 1}}>
            {questions.length === 0 && (
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 15, textAlign: 'center', fontFamily: 'PlayfairDisplay-Medium', marginBottom: 20 }}>You have not yet answered any questions.</Text>
              </View>
            )}
            <QuestionList
              onRefresh={this.doRefresh}
              refreshing={refreshing}
              questions={questions}
              onPress={this.onContent}
            />
          </View>

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
