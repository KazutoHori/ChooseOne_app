import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Linking,
  SafeAreaView,
} from 'react-native';

import {fetchQuestions} from '../utils/api';
import QuestionList from '../components/QuestionList';
import colors from '../utils/colors';
import * as Font from 'expo-font';

let customFonts  = {
  'PlayfairDisplay-Medium': require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
}

const options = {
  method: 'POST',
}

export default class Top extends React.Component {
  state = {
    questions: [
      {
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
      {
        id: 2,
        title: 'Where are you from?',
        author: 'Kazuto',
        created: "2021-02-23T07:51:42.275101Z",
        choices: [
          {
            choice_text: 'America',
            votes: 1515,
          },
          {
            choice_text: 'Europe',
            votes: 1515,
          },
          {
            choice_text: 'Japan' ,
            votes: 1414,
          },
          {
            choice_text: 'Africa',
            votes: 355,
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
      }
    ],
    loading: true,
    error: false,
  };

  // renderPushView () {
  //   const { navigation: { navigate } } = this.props;
  //
  //   const question = this.state.questions[0];
  //
  //   if(question) {
  //     navigate('QuestionDetail', { id });
  //   }
  // }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    // try {
    //   const questions = await fetch('http://192.168.1.75:8000/api/v1/?format=json', options)
    //     .then(res => res.json());
    //   // const questions = await response.json();
    //
    //   this.setState({
    //     loading: false,
    //     questions,
    //   });
    // } catch(e){
    //   this.setState({
    //     loading: false,
    //     error: true,
    //     questions: list(e),
    //   });
    //   console.log('akvankanln');
    //   console.log(e);
    // }
  }

  static navigationOptions = () => ({

  });

  render() {
    // const { style, commentsForItem, onPressComments } = this.props;
    const { loading, error, questions } = this.state;
    const { navigation: { navigate } } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <QuestionList
          questions={questions}
          onPress={() => navigate('QuestionResult', { id: 1 } )}
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
  container: {
    backgroundColor: colors.grey,
    justifyContent: 'center',
    flex: 1,
  },
})
