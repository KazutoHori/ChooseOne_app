import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';
import { Button } from 'galio-framework';
import { Button as Button_c } from 'react-native-paper';
import { Dimensions } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import { showMessage } from 'react-native-flash-message';
import { firestore } from 'firebase';
import * as firebase from 'firebase';

import colors from '../utils/colors';

require("firebase/firestore");
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
var db = firestore();
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('window').height;
const you_did = ['QuestionAnswered', 'QuestionCreated', 'QuestionLiked'];
let customFonts  = {
  'PlayfairDisplay-Medium': require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
};


export default class QuestionDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answered: true,
      madeit: false,
      likedit: false,
      value: 0,
      value3Index: null,
      s_modalVisible: false,
      modalVisible: false,
      error: '',
			justDid: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();

    const { navigation: { state: { params }, navigate }} = this.props;
    const { question: { slug } } = params;

    var user = firebase.auth().currentUser;
    if(user && user.uid){
      db.collection('users').doc(user.uid).get().then((doc) => {
        if(doc.data().question_created.includes(slug)){
          this.setState({ madeit: true  });
        }
      });
      db.collection('users').doc(user.uid).get().then((doc) => {
        if(doc.data().question_liked.includes(slug)){
          this.setState({ likedit: true  });
        }
      });
    }
  }

  onVote = async () => {
    const { value3Index } = this.state;
    const { navigation: { state: { params }, navigate }} = this.props;
    const { question, question: { slug, choices} , } = params;
    if(value3Index === null){
      this.setState({ error: 'You have not chosen yet'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }

    var user = firebase.auth().currentUser;
    if(!user){
      this.setState({ s_modalVisible: true });
      return null;
    }
    var userId = user.uid;

    var your_vote = choices[value3Index].choice_text;

    await db.collection('questions').doc(slug).get().then((doc) => {
      var copy=Array.from(doc.data().choices);

      var remove_data = Object.assign({}, copy[value3Index]);
      var add_data = {
        choice_text: copy[value3Index].choice_text,
        votes: parseInt(copy[value3Index].votes, 10)+1,
      };
      copy[value3Index].votes=parseInt(copy[value3Index].votes, 10)+1;
      question.choices=copy;

      db.collection('questions').doc(slug).update({
        choices: firestore.FieldValue.arrayRemove(remove_data)
      });
      db.collection('questions').doc(slug).update({
        choices: firestore.FieldValue.arrayUnion(add_data)
      });
      db.collection('questions').doc(slug).update({
        all_votes: firestore.FieldValue.increment(1)
      })
    })

    await db.collection('users').doc(userId).set({
      question_answered: firestore.FieldValue.arrayUnion({ question: slug, answer: your_vote}) },
      { merge: true}
    );

    await db.collection('questions').doc(slug).set({
      users_answered: firestore.FieldValue.arrayUnion(userId) },
      { merge: true }
    );

    navigate('UserQuestionResult', { from_where: 'QuestionAnswered', question: question, your_vote: your_vote })
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

        this.setState({ questions: ques });
        for(let i=0; i<questions_.length; i++){
          if(you_did[idx] === 'QuestionAnswered'){
            db.collection('questions').doc(questions_[i].question).get().then((doc) => {
              if(doc.exists){
                ques.unshift(doc.data())
                this.setState({ questions: ques });
              }
            });
          }else{
            db.collection('questions').doc(questions_[i]).get().then((doc) => {
              if(doc.exists){
                ques.unshift(doc.data())
                this.setState({ questions: ques });
              }
            });
          }
        }
      });
    }
  }

  onLikeit = () => {
    const { navigation: { state: { params } }} = this.props;
    const { question: { slug } } = params;

    showMessage({
      message: "You like this question!",
      type: "info",
      icon: 'success',
    });

    var user = firebase.auth().currentUser;
    if(user && user.uid){
      db.collection("users").doc(user.uid).update({
        question_liked: firestore.FieldValue.arrayUnion(slug)
      })
    }
  }

  onDelete = () => {
    const { navigation: { state: { params }, navigate }} = this.props;
    const { question: { slug } } = params;
    this.setState({ modalVisible: false });

    showMessage({
      message: "You have successfully deleted!",
      type: "warning",
      icon: 'success',
    });

    var user = firebase.auth().currentUser;
    db.collection("questions").doc(slug).delete();
    db.collection("users").doc(user.uid).update({
      question_created: firestore.FieldValue.arrayRemove(slug)
    })

    navigate('QuestionAnswered');
  }

  render() {
    const { fontsLoaded, modalVisible } = this.state;
    const { navigation: { state: { params }, openDrawer, navigate }} = this.props;
    const { from_where, question: { title, created, choices } } = params;
    const { likedit, error, answered, madeit } = this.state;

    for(let i=0; i<choices.length; i++){
      choices[i]['label']=choices[i]['choice_text'];
      choices[i]['value']=i;
    }
		var top;
		if(from_where === 'QuestionAnswered') top='Questions You Answered';
		else if(from_where === 'QuestionCreated') top='Questions You Created';
		else top='Questions You Liked';

    if(!fontsLoaded) return null;
    return (
      <SafeAreaView style={styles.container}>
				<View style={styles.topbar}>
          <TouchableWithoutFeedback onPress={() => navigate('QuestionAnswerd')}>
            <Image source={require('../assets/ChooseOne1.png')} onLoad={this.handleLoad} style={{ top: 16, left: 20}}/>
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={() => openDrawer()} style={{ position: 'absolute', right: 25, top: 15}}>
            <Icon name={'cogs'} size={30} style={{ color: colors.grey }} />
          </TouchableOpacity>
        </View>
        <View style={[styles.ttext, { backgroundColor: colors.grey }]}>
          <Text style={styles.text}>{top}</Text>
        </View>
        <TouchableOpacity style={styles.back} onPress={() => navigate('QuestionAnswered')}>
          <Icon name={'chevron-down'} size={30} style={{ color: colors.blue }} />
        </TouchableOpacity>
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>created: {created.slice(0,10)}</Text>
        </View>
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
              <Text style={styles.modalText}>Are you sure you want to delete this question?</Text>
              <View style={{ flexDirection: 'row'}}>
                <Button style={{ width: 100 }} color={colors.blue} onPress={() => this.setState({ modalVisible: false })}>
                  No
                </Button>
                <Button style={{ width: 100 }} color='theme' onPress={this.onDelete}>
                  Delete
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        <View>
          <View style={{ marginBottom: 10, }}>
            {choices.map((obj, i) => {
                const { value3Index } = this.state;
                if(value3Index === i) var m='contained';
                else var m='outlined';
                return (
                  <Button_c labelStyle={styles.l_choice} color={colors.blue} mode={m} style={styles.choice} onPress={() => this.setState({ value3Index: i }) }>
                    {obj.choice_text}
                  </Button_c>
                );
              })
            }
          </View>
          {error !== '' && (<View style={{ marginLeft: 16 }}><Text style={{ color: 'red' }}>{error}</Text></View>)}
          {answered && (
            <Button color={'success'} style={styles.vote} onPress={this.onVote}>
              Vote!
            </Button>
          )}
        </View>
        <View style={styles.buttons}>
          {likedit && (
            <View>
              <Button color={colors.blue} onPress={this.onLikeit}>
                <Icon name={'thumbs-up'} size={25} style={{ color: 'white' }} />
                <Text style={{ color: 'white' }}>You Like this question!</Text>
              </Button>
            </View>
          )}
          {!likedit && (
            <View>
              <Button color={colors.blue} onPress={this.onLikeit}>
                <Icon name={'thumbs-up'} size={25} style={{ color: 'white' }} />
                <Text style={{ color: 'white' }}>Like it!</Text>
              </Button>
            </View>
          )}
          {madeit && (
            <View>
              <Button color='theme' onPress={() => this.setState({modalVisible:true})}>
                Delete
              </Button>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    position: 'absolute',
    bottom: 30,
  },
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
  edit: {
    marginLeft: 90,
  },
  delete: {
    position: 'absolute',
    bottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    alignItems: 'center',
    height: screenHeight,
  },
  back: {
    padding: 10,
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Medium',
  },
  date: {
    fontFamily: 'PlayfairDisplay-Medium',
    fontSize: 10,
    marginLeft: 10,
    color: '#457AFB',
  },
  choice: {
    fontFamily: 'PlayfairDisplay-Medium',
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 0.7,
    borderColor: colors.blue,
    borderRadius: 15,
  },
  vote: {
    marginTop: 10,
  },
	topbar: {
    width: screenWidth,
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'red',
    borderTopWidth: 0.3,
    borderColor: 'white',
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
});
