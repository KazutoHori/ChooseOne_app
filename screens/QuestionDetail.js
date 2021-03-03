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
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('window').height;

import colors from '../utils/colors';

let customFonts  = {
  'PlayfairDisplay-Medium': require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
};

export default class QuestionDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answered: true,
      madeit: true,
      question: {
        id: 1,
        title: 'What sports do you like?',
        author: 'Kazuto',
        created: "2021-02-23T07:51:42.275101Z",
        choices: [
          {
            choice_text: 'basketball',
            votes: 19551,
          },
          {
            choice_text: 'soccer',
            votes: 1857,
          },
          {
            choice_text: 'hockey' ,
            votes: 1591,
          },
          {
            choice_text: 'tennis',
            votes: 660,
          }
        ],
        comments: [
          {
            author: 'Kazuto',
            comment: 'This is so true!!',
            created: "2021-02-23T07:51:42.275101Z",
          },
          {
            author: 'Kazuto',
            comment: 'That is no true!',
            created: "2021-02-23T07:51:42.275101Z",
          }
        ],
      },
      value: 0,
      value3Index: null,
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

  onVote = () => {
    const { error, value3Index } = this.state;
    const { navigation: { state: { params }, navigate }} = this.props;
    const { question, question: { id, choices} , } = params;
    if(value3Index === null){
      this.setState({ error: 'You have not chosen yet'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }

    var copy=choices;
    copy[value3Index].votes=copy[value3Index].votes+1;
    this.setState({ choices: copy });
    setTimeout(() => this.setState({ error: ''}),2500);

    navigate('QuestionResult', { question: question })
  }

  render() {
    const { fontsLoaded, modalVisible } = this.state;
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
        <TouchableOpacity style={[styles.back,]} onPress={() => navigate('Top')}>
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
                <Button style={{width: 100,}} color='theme' onPress={() => this.setState({ modalVisible: false})}>
                  Delete
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        <View>
          <View>
            {choices.map((obj, i) => {
                const { value3Index } = this.state;
                if(value3Index === i) var m='contained';
                else var m='outlined';
                return (
                  <Button_c color={colors.blue} mode={m} style={styles.choice} onPress={() => this.setState({ value3Index: i }) }>
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
          <View style={styles.delete}>
            <Button color='theme' onPress={() => this.setState({ modalVisible: true})}>
              Delete
            </Button>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    fontSize: 30,
    fontFamily: 'PlayfairDisplay-Medium',
  },
  date: {
    fontFamily: 'PlayfairDisplay-Medium',
    fontSize: 10,
    marginLeft: 10,
    color: '#457AFB',
  },
  choice: {
    // alignItems: 'flex-start',
    fontFamily: 'PlayfairDisplay-Medium',
    fontSize: 15,
    marginBottom: 15,
    borderWidth: 0.7,
    borderColor: colors.blue,
    // buttonSize: 15,
  },
  vote: {
    // alignItems: 'flex-start',
    // marginLeft: 100,
    marginTop: 10,
  },
});

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
