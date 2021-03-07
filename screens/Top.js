import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Linking, StatusBar,
  SafeAreaView, TouchableWithoutFeedback, Image, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';

import {fetchQuestions} from '../utils/api';
import QuestionList from '../components/QuestionList';
import colors from '../utils/colors';
import Questions from '../utils/questions';


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

// Required for side-effects
require("firebase/firestore");
var db = firebase.firestore();

const options = {
  method: 'POST',
}

export default class Top extends React.Component {

  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: colors.red,
      },
      tabBarOptions: {
        tabStyle: {
          width: 100,
          backgroundColor: colors.red,
        },
      },
    };
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    
    db.collection("questions").onSnapshot((querySnapshot) => {
      var ques = [];
      querySnapshot.forEach((doc) => {
          ques.push(doc.data());
      });
      ques.sort(function(a, b) {
        if (a.created > b.created) {
          return -1;
        } else {
          return 1;
        }
      })
      this.setState({ questions: ques });
    });
  }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  static navigationOptions = () => ({

  });

  constructor(props){
    super(props);
    this.state = {
      questions: [],
      loading: true,
      error: false,
      refreshing: false,
    };
    this.scrollRef = React.createRef();
  }

  handleLoad = () => {
    this.setState({
      loading: false,
    });
  };

  doRefresh = () => {
    this.setState({ refreshing: true });
    /// do refresh work here /////
    //////////////////////////////
    setTimeout( () => this.setState({refreshing: false}), 5000);
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

  render() {
    // const { style, commentsForItem, onPressComments } = this.props;
    const { loading, error, questions, refreshing } = this.state;
    const { navigation: { navigate } } = this.props;
    

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topbar}>
          {loading && (
            <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
          )}
          <TouchableWithoutFeedback onPress={() => {this.scrollRef.current.scrollToOffset({ animated: true, offset: 0}); this.setState({refreshing: true}, () => this.doRefresh); }}>
            <Image source={require('../assets/ChooseOne1.png')} onLoad={this.handleLoad} style={{ top: 10, left: 20}}/>
          </TouchableWithoutFeedback>
          <TouchableOpacity style={{ position: 'absolute', right: 30, top: 7}}>
            <Icon name={'search'} size={30} style={{ color: colors.grey }} />
          </TouchableOpacity>
        </View>
        <QuestionList
          questions={questions}
          passRef={this.scrollRef}
          doRefresh={this.doRefresh}
          refresh={refreshing}
          onPress={this.onContent}
        />
      </SafeAreaView>
      // <View style={styles.test}>
      //   <Text style={{ fontSize: 50}}>test</Text>
      //   {loading && (
      //     <ActivityIndicator size='large'/>
      //   )}
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'red',
    borderTopWidth: 0,
    borderColor: 'white',
  },
  container: {
    backgroundColor: colors.grey,
    justifyContent: 'center',
    flex: 1,
  },
})
