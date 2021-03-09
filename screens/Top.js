import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Linking, StatusBar, TextInput, InteractionManager,
  SafeAreaView, TouchableWithoutFeedback, Image, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import filter from 'lodash.filter'
import { Button, Checkbox,  } from 'galio-framework';

import {fetchQuestions} from '../utils/api';
import QuestionList from '../components/QuestionList';
import colors from '../utils/colors';
import Questions from '../utils/questions';

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

const categories = ['Top', 'Love', 'News', 'Sports', 'Entertainment', 'Health', 'Living', 'Career', 'Academics', 'IT', 'Quiz'];

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
require("firebase/firestore");
var user = firebase.auth().currentUser;
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

    this.unsubscribe = db.collection("questions").onSnapshot((querySnapshot) => {
      var ques = [];
      querySnapshot.forEach((doc) => {
          ques.push(doc.data());
      });
      db.collection('questions').orderBy('all_votes').limit(20);
      // ques.sort(function(a, b) {
      //   if (a.created > b.created) {
      //     return -1;
      //   } else {
      //     return 1;
      //   }
      // })
      this.setState({ questions: ques });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  static navigationOptions = () => ({

  });

  constructor(props){
    super(props);
    this.state = {
      questions: [],
      loading: true,
      error: false,
      refreshing: false,
      searching: false,
      query: '',
      search_results: [],
      noResults: false,
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

    await db.collection('questions').doc(the_slug).get().then((doc) => {
      the_question = doc.data()
    });

    var goDetail = true;
    if(user){
      await db.collection('users').doc(user.uid).get().then((doc) => {
        for(let i=0; i<doc.data().question_answered.length; i++){
          if(doc.data().question_answered[i].question === the_slug){
            navigate('QuestionResult', { question: the_question, your_vote: doc.data().question_answered[i].answer})
            goResult=false;
          }
        }
      })
    }
    if(goDetail) navigate('QuestionDetail', { question: the_question });
  }

  titleContains = ({ title }, query) => {
    if (title.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  }

  choicesContains = ({ choices }, query, data) =>{
    for(let i=0; i<choices.length; i++){
      if(choices[i].choice_text.toLowerCase().includes(query)){
        return true;
      }
    }
    return false;
  }

  searchTextChange =  text => {
    const query = text.toLowerCase();
    var data = this.state.questions.filter( question => {
      return this.titleContains(question, query)
    })
    data = data.concat(this.state.questions.filter(question => {
      if(data.includes(question)) return false;
      return this.choicesContains(question, query, data)
    }))

    this.setState({ search_results: data, query: text });
  };

  onSearch = () => {
    this.setState({ searching: true });
  }

  render() {
    // const { style, commentsForItem, onPressComments } = this.props;
    const { noResults, search_results, query, searching, loading, error, questions, refreshing } = this.state;
    const { navigation: { navigate } } = this.props;

    // if(searching) this.setState({ questions: search_results });

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topbar}>
          {loading && (
            <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
          )}
          {!searching && (
            <View style={{ flex: 1}}>
              <TouchableWithoutFeedback onPress={() => {this.scrollRef.current.scrollToOffset({ animated: true, offset: 0}); this.setState({refreshing: true}, () => this.doRefresh); }}>
                <Image source={require('../assets/ChooseOne1.png')} onLoad={this.handleLoad} style={{ top: 10, left: 20}}/>
              </TouchableWithoutFeedback>
              <View style={{ position: 'absolute', top: 9, right: 80 }}>
                <ModalDropdown onSelect={(idx) => navigate(categories[idx]) } dropdownStyle={{ height: 11*40+5 }} dropdownTextStyle={{ backgroundColor: colors.white, fontWeight: '500', color: 'black', height: 40, width: 110, fontSize: 15, textAlign: 'center' }} showsVerticalScrollIndicator={false} options={categories} >
                  <Icon name={'list-ul'} size={30} style={{ color: colors.grey }} />
                </ModalDropdown>
              </View>
              <TouchableOpacity onPress={() => this.setState({ searching: true })} style={{ position: 'absolute', right: 30, top: 7}}>
                <Icon name={'search'} size={30} style={{ color: colors.grey }} />
              </TouchableOpacity>
            </View>
          )}
          {searching && (
            <View style={{ flex: 1, }}>
              <View style={{ borderRadius: 39 }}>
                <Searchbar
                  style={{ margin: 5, marginLeft: 12, height: '80%', width: '80%' }}
                  autoFocus={true}
                  onChangeText={this.searchTextChange}
                  value={query}
                  placeholder={'Search'}
                  autoCorrect={false}
                  // clearButtonMode='always'
                />
              </View>
              <TouchableOpacity onPress={() => this.setState({ searching: false })} style={{ padding: 8, position: 'absolute', right: 20, top: 5}}>
                <Icon name={'chevron-down'} size={20} style={{ color: colors.grey }} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {(searching && query.length !== 0) && search_results.length === 0 && (
          <View style={{ padding: 30, alignItems: 'center',  }}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'PlayfairDisplay-Medium', marginBottom: 20 }}>
              Your search - {query} - did not match any question.
            </Text>
            <Button color='success' style={{ padding: 5 }} onPress={() => navigate('QuestionCreate') }>You should create one!</Button>
          </View>
        )}

        {!searching && (
          <QuestionList
            questions={questions}
            passRef={this.scrollRef}
            doRefresh={this.doRefresh}
            refresh={refreshing}
            onPress={this.onContent}
            style={{ zIndex: 2 }}
          />
        )}

        {searching && (
          <QuestionList
            questions={search_results}
            passRef={this.scrollRef}
            doRefresh={this.doRefresh}
            refresh={refreshing}
            onPress={this.onContent}
            style={{ zIndex: 2}}
          />
        )}

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
