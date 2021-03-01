import { Image, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';
import { Button, Radio } from 'galio-framework';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel}
  from 'react-native-simple-radio-button';

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

  render() {
    const { question: {author, id, title, created, choices} } = this.state;
    const { navigation: { navigate }} = this.props;
    const { answered, madeit } = this.state;

    for(let i=0; i<choices.length; i++){
      choices[i]['label']=choices[i]['choice_text'];
      choices[i]['value']=i;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => navigate('Top')}>
          <Icon name={'chevron-down'} size={30} style={{ color: colors.blue }} />
        </TouchableOpacity>
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>created: {created.slice(0,10)}</Text>
        </View>
        <View style={styles.choices}>
          <View>
            <RadioForm>
              {choices.map((obj, i) => (
                  <RadioButton　key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={this.state.value3Index === i}
                      onPress={((value) => this.setState({ value3Index: value }))}
                      borderWidth={2}
                      // buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                      buttonSize={15}
                      buttonWrapStyle={styles.choice}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={((value) => this.setState({ value3Index: value }))}
                      labelStyle={styles.choice}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))
              }
            </RadioForm>
          </View>
          {answered && (
            <TouchableOpacity style={styles.vote} onPress={() => navigate('QuestionResult')}>
              <Text style={styles.vote_text}>
                Vote!
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {madeit && (
          <View style={styles.choice}>
            <TouchableOpacity style={styles.edit}>
              <Text style={styles.edit_text}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.delete}>
              <Text style={styles.delete_text}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // buttons: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   marginTop: 10,
  // },
  edit: {
    padding: 8,
    width: 70,
    height: 45,
    backgroundColor: colors.green,
    borderRadius: 6,
    marginRight: 30,
    marginTop: 100,
  },
  delete: {
    padding: 8,
    width: 85,
    height: 45,
    backgroundColor: colors.red,
    borderRadius: 6,
    marginTop: 15,
  },
  delete_text: {
    paddingLeft: 6,
    fontSize: 20,
    color: colors.white,
    fontFamily: 'PlayfairDisplay-Medium',
  },
  edit_text: {
    paddingLeft: 9,
    fontSize: 20,
    color: colors.white,
    fontFamily: 'PlayfairDisplay-Medium',
  },
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    // justifyContent: 'center',
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
    fontFamily: 'PlayfairDisplay-Medium',
    fontSize: 15,
    marginBottom: 15,
    left: 100,
    alignItems: 'flex-start',
  },
  vote: {
    alignItems: 'flex-start',
    left: 100,
    marginTop: 10,
    padding: 8,
    width: 70,
    height: 45,
    backgroundColor: colors.green,
    borderRadius: 6,
  },
  vote_text: {
    paddingLeft: 6,
    fontSize: 20,
    color: colors.white,
    fontFamily: 'PlayfairDisplay-Medium',
  },
});
