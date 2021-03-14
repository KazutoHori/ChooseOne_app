import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import { Button } from 'galio-framework';
import * as firebase from 'firebase';

import QuestionList from '../components/QuestionList';
import colors from '../utils/colors';
import { categories } from '../utils/variables';
import tabColors from '../utils/tabColors';

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
var db = firebase.firestore();


export default class Academics extends React.Component {

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

  componentDidMount() {
    db.collection("questions").where('category', 'array-contains', 'Academics').onSnapshot((querySnapshot) => {
      var ques = [];
      querySnapshot.forEach((doc) => {
          ques.push(doc.data());
      });
      ques.sort(function(first, second){
        if (first.created > second.created){
          return -1;
        }else if (first.created < second.created){
          return 1;
        }else{
          return 0;
        }
      });
      this.setState({ questions: ques });
    });
  }

  handleLoad = () => {
    this.setState({
      loading: false,
    });
  };

  doRefresh = () => {
    this.setState({ refreshing: true });
    db.collection("questions").where('category', 'array-contains', 'Academics').get().then((queries) => {
      var ques = [];
      queries.forEach((doc) => {
          ques.push(doc.data());
      });
      ques.sort(function(first, second){
        if (first.created > second.created){
          return -1;
        }else if (first.created < second.created){
          return 1;
        }else{
          return 0;
        }
      });
      this.setState({ questions: ques });
    });
    setTimeout( () => this.setState({refreshing: false}), 800);
  }

  onContent = async the_slug => {
    const { navigation: { navigate }} = this.props;
    var the_question={};
    var user = firebase.auth().currentUser;

    await db.collection('questions').doc(the_slug).get().then((doc) => {
      the_question = doc.data()
    });

    if(user){
      await db.collection('users').doc(user.uid).get().then((doc) => {
        var goDetail = true;
        let i=0;
        for(i=0; i<doc.data().question_answered.length; i++){
          if(doc.data().question_answered[i].question === the_slug){
            goDetail=false;
            navigate('QuestionResult', { from_where: 'Academics', question: the_question, your_vote: doc.data().question_answered[i].answer})
          }
        }
        if(i===doc.data().question_answered.length && goDetail){
          navigate('QuestionDetail', { from_where: 'Academics', question: the_question });
        }
      })
    }else{
      navigate('QuestionDetail', { from_where: 'Academics', question: the_question });
    }
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

  render() {
    const { search_results, query, searching, loading, questions, refreshing } = this.state;
    const { navigation: { navigate } } = this.props;

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
            onRefresh={this.doRefresh}
            refreshing={refreshing}
            onPress={this.onContent}
            style={{ zIndex: 2 }}
          />
        )}

        {searching && (
          <QuestionList
            questions={search_results}
            passRef={this.scrollRef}
            onRefresh={this.doRefresh}
            refreshing={refreshing}
            onPress={this.onContent}
            style={{ zIndex: 2}}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: tabColors[8],
    borderTopWidth: 0,
    borderColor: 'white',
  },
  container: {
    backgroundColor: colors.grey,
    justifyContent: 'center',
    flex: 1,
  },
})
