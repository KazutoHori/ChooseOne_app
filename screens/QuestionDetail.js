import { Image, StyleSheet, View, Text, ActivityIndicator,
    TouchableOpacity, Alert, Modal, }
  from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';
import { Button, Radio } from 'galio-framework';
import { Button as Button_c } from 'react-native-paper';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel}
  from 'react-native-simple-radio-button';
import { Dimensions } from "react-native";


import slugify from '../utils/slugify.js';
import LoginForm from './LoginForm';

import * as firebase from 'firebase';
var db = firebase.firestore();
var user = firebase.auth().currentUser;

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('window').height;

import colors from '../utils/colors';
import { firestore } from 'firebase';

let customFonts  = {
  'PlayfairDisplay-Medium': require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
};

export default class QuestionDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answered: true,
      madeit: true,
      value: 0,
      value3Index: null,
      s_modalVisible: false,
      modalVisible: false,
      error: '',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  static navigationOptions = () => ({

  });

  onVote = async () => {
    const { error, value3Index } = this.state;
    const { navigation: { state: { params }, navigate }} = this.props;
    const { question, question: { id, slug, choices} , } = params;
    if(value3Index === null){
      this.setState({ error: 'You have not chosen yet'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }

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
        choices: firebase.firestore.FieldValue.arrayRemove(remove_data)
      });
      db.collection('questions').doc(slug).update({
        choices: firebase.firestore.FieldValue.arrayUnion(add_data)
      });
      db.collection('questions').doc(slug).update({
        all_votes: firebase.firestore.FieldValue.increment(1)
      })
    })

    db.collection('users').doc(userId).set({
      question_answered: firebase.firestore.FieldValue.arrayUnion({ question: slug, answer: your_vote}) },
      { merge: true}
    );

    db.collection('questions').doc(slug).set({
      users_answered: firebase.firestore.FieldValue.arrayUnion(userId) },
      { merge: true }
    );

    navigate('QuestionResult', { question: question, your_vote: your_vote })
  }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  render() {
    const { s_modalVisible, fontsLoaded, modalVisible } = this.state;
    const { navigation: { state: { params }, navigate }} = this.props;
    const { question, question: {id, author, title, created, choices } } = params;
    const { error, answered, madeit } = this.state;

    for(let i=0; i<choices.length; i++){
      choices[i]['label']=choices[i]['choice_text'];
      choices[i]['value']=i;
    }

    if(!fontsLoaded) return null;
    return (
      <View style={styles.container}>
        {s_modalVisible && (<LoginForm />)}
        <TouchableOpacity style={styles.back} onPress={() => navigate('Top')}>
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
                <Button style={{width: 100,}} color={colors.blue} onPress={() => this.setState({ modalVisible: false })}>
                  No
                </Button>
                <Button style={{width: 100,}} color='theme' onPress={() => { this.setState({ modalVisible: false}); navigate('Top') }}>
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
        {madeit && (
          <View style={styles.buttons}>
            <View>
              <Button color={colors.blue} onPress={() => this.setState({ modalVisible: true})}>
                <Icon name={'thumbs-up'} size={25} style={{ color: 'white' }} />
                <Text style={{ color: 'white' }}>Interesting!</Text>
              </Button>
            </View>
            <View>
              <Button color='theme' onPress={() => this.setState({modalVisible:true})}>
                Delete
              </Button>
            </View>
          </View>
        )}
      </View>
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
    // marginTop: 40,
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
  l_choice: {
    // fontFamily: 'PlayfairDisplay-Medium',
  },
  choice: {
    // alignItems: 'flex-start',
    fontFamily: 'PlayfairDisplay-Medium',
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 0.7,
    borderColor: colors.blue,
    borderRadius: 15,
    // buttonSize: 15,
  },
  vote: {
    // alignItems: 'flex-start',
    // marginLeft: 100,
    marginTop: 10,
  },
});

// {madeit && (
//   <View style={styles.delete}>
//     <Button color='theme' onPress={() => this.setState({ modalVisible: true})}>
//       Delete
//     </Button>
//   </View>
// )}


// <RadioForm>
//   {choices.map((obj, i) => (
//       <RadioButton　key={i}>
//         <RadioButtonInput
//           obj={obj}
//           index={i}
//           isSelected={this.state.value3Index === i}
//           onPress={((value) => this.setState({ value3Index: value }))}
//           borderWidth={2}
//           // buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
//           buttonSize={15}
//           buttonWrapStyle={styles.choice}
//         />
//         <RadioButtonLabel
//           obj={obj}
//           index={i}
//           labelHorizontal={true}
//           onPress={((value) => this.setState({ value3Index: value }))}
//           labelStyle={styles.choice}
//           labelWrapStyle={{}}
//         />
//       </RadioButton>
//     ))
//   }
// </RadioForm>

  // <View style={styles.edit}>
  //   <Button color='success' onPress={() => navigate('QuestionResult')}>
  //     Edit
  //   </Button>
  // </View>
