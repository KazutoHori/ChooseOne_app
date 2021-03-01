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

import {fetchQuestions} from '../utils/api';
import QuestionList from '../components/QuestionList';
import colors from '../utils/colors';
import Questions from '../utils/questions';

const options = {
  method: 'POST',
}

export default class Top extends React.Component {

  // renderPushView () {
  //   const { navigation: { navigate } } = this.props;
  //
  //   const question = this.state.questions[0];
  //
  //   if(question) {
  //     navigate('QuestionDetail', { id });
  //   }
  // }

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

  state = {
    questions: Questions,
    loading: true,
    error: false,
  };

  handleLoad = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    // const { style, commentsForItem, onPressComments } = this.props;
    const { loading, error, questions } = this.state;
    const { navigation: { navigate } } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topbar}>
          {loading && (
            <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
          )}
          <TouchableWithoutFeedback onPress={() => navigate('Top')}>
            <Image source={require('../assets/ChooseOne1.png')} onLoad={this.handleLoad} style={{ top: 10, left: 20}}/>
          </TouchableWithoutFeedback>
          <TouchableOpacity style={{ position: 'absolute', right: 30, top: 7}}>
            <Icon name={'search'} size={30} style={{ color: colors.grey }} />
          </TouchableOpacity>
        </View>
        <QuestionList
          questions={questions}
          onPress={() => navigate('QuestionDetail', { id: 1 } )}
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
    borderTopWidth: 0.3,
    borderColor: 'white',
  },
  container: {
    backgroundColor: colors.grey,
    justifyContent: 'center',
    flex: 1,
  },
})
