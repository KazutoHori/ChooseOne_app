import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList, KeyboardAvoidingView,
  ActivityIndicator, SafeAreaView, TextInput, ScrollView,
  Linking, TouchableOpacity, TouchableWithoutFeedback, Image
} from 'react-native';
import * as Font from 'expo-font'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import { Button, Checkbox,  } from 'galio-framework';

import colors from '../utils/colors';
import tabColors from '../utils/tabColors';
import Questions from '../utils/questions';

let customFonts  = {
  'BerkshireSwash-Regular': require('../assets/fonts/BerkshireSwash-Regular.ttf'),
  'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
}

export default class QuestionCreate extends React.Component {
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
    onNews: false,
    onSports: false,
    onEntertainment: false,
    onHealth: false,
    onQuiz: false,
    onCareer: false,
    onLiving: false,
    onLove: false,
    onAcademics: false,
    onOther: false,
    onIT: false,
    add_choice: 0,

    title: '',
    choices: Array(10),
    error: '',
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

  componentDidMount() {
    this._loadFontsAsync();
  }

  titleChangeText = title => {
    this.setState({ title });
  };

  choiceChangeText = (text, idx) => {
    const { choices } = this.state;
    const　copy = choices.slice();
    copy[idx] = text;

    this.setState({ choices: copy });
  };

  onSubmit = () => {
    const { fontsLoaded, loading, onNews, onSports, onEntertainment,
      onHealth, onQuiz, onCareer, onLiving, onLove, onAcademics, onOther, error,
      onIT, add_choice, title, choices, } = this.state;
    const { navigation: { navigate }} = this.props;

    const new_choices = [];
    for(var i=0; i<add_choice+2; i++){
      if(choices[i] !== undefined && choices[i] !== ''){
        new_choices.push({
          choice_text: choices[i],
          votes: 0,
        });
      }
    }

    if(title === ''){
      this.setState({ error: 'Title cannot be empty'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }

    if(new_choices.length<2) {
      this.setState({ error: 'Choices must be more than two'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }

    var S = new Set(new_choices);
    if(new_choices.length !== S.size) {
      this.setState({ error: 'There are same choices'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }

    if(!onNews && !onSports && !onEntertainment && !onHealth && !onQuiz && !onCareer && !onLiving && !onLove && !onAcademics && !onIT){
      this.setState({ error: 'Category cannot be empty'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }

    let current=new Date();
    let new_question = {
        id: toString(Questions.length+1),
        id: 1,
        title: title,
        author: 'Kazuto',
        created: current.getFullYear()+'-'+('0'+current.getMonth()).slice(-2)+'-'+('0'+current.getDate()).slice(-2),
        choices: new_choices,
        comments: [],
    }

    if(onNews) this.setState({ onNews: !onNews });
    if(onEntertainment) this.setState({ onEntertainment: !onEntertainment });
    if(onHealth) this.setState({ onHealth: !onHealth });
    if(onQuiz) this.setState({ onQuiz: !onQuiz });
    if(onCareer) this.setState({ onCareer: !onCareer });
    if(onLiving) this.setState({ onLiving: !onLiving });
    if(onLove) this.setState({ onLove: !onLove });
    if(onAcademics) this.setState({ onAcademics: !onAcademics });
    if(onIT) this.setState({ onIT: !onIT });

    questions.push(new_question);
    this.setState({
      add_choice: 0,
      title: '',
      choices: Array(10),
      error: '',
    });
    navigate('QuestionDetail', { question: new_question});
  };

  render() {
    const { fontsLoaded, loading, onNews, onSports, onEntertainment,
      onHealth, onQuiz, onCareer, onLiving, onLove, onAcademics, onOther, error,
      onIT, add_choice, title, choices, } = this.state;
    const { navigation: { navigate }} = this.props;

    var added=[];
    for (let i=0; i<add_choice; i++){
      added.push(
        <View>
          <View style={styles.semiTitle} />
          <TextInput
            style={[styles.input]}
            autoCorrect={false}
            value={choices[2+i]}
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.choiceChangeText(text, (i+2))}
            placeholder={'Choice '+(3+i)}
          />
        </View>
      );
    }
    if(added.length > add_choice) {
      added.pop();
    }

    if (fontsLoaded) {
      return (
        <SafeAreaView>
          <KeyboardAvoidingView behavior='padding'>
            <View style={styles.topbar}>
              {loading && (
                <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
              )}
              <TouchableWithoutFeedback onPress={() => navigate('QuestionCreate')}>
                <Image source={require('../assets/ChooseOne1.png')} onLoad={this.handleLoad} />
              </TouchableWithoutFeedback>
            </View>
            <ScrollView style={styles.container}>
              <View style={styles.form}>
                <Text style={styles.text}>Let's Create Your {'\n'}  Own Question!</Text>
                <Text style={styles.title}>Question</Text>
                <View style={styles.semiTitle} />
                <TextInput
                  style={styles.input}
                  autoCorrect={false}
                  value={title}
                  underlineColorAndroid="transparent"
                  onChangeText={this.titleChangeText}
                  // onSubmitEditing={this.handleSubmitEditing}
                  placeholder={'Title'}
                />

                <Text style={styles.title}>Choices</Text>
                <View style={styles.semiTitle} />
                <TextInput
                  style={styles.input}
                  value={choices[0]}
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.choiceChangeText(text, 0)}
                  // onSubmitEditing={this.choiceSubmitEditing}
                  placeholder={'Choice 1'}
                />
                <View style={styles.semiTitle} />
                <TextInput
                  autoCorrect={false}
                  style={styles.input}
                  value={choices[1]}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.choiceChangeText(text, 1)}
                  // onSubmitEditing={this.choice}
                  placeholder={'Choice 2'}
                />
                {add_choice !== 0 && (
                  [added]
                )}
                {add_choice < 6 && (
                  <Button style={{ width: screenWidth*4/9, marginTop: 20,}} onPress={() => this.setState({ add_choice: add_choice+1 })} color={colors.blue}>Add New Choice</Button>
                )}
                {add_choice !==0 && (
                  <Button style={{ width: screenWidth*4/9, marginTop: 10,}} onPress={() => this.setState({ add_choice: add_choice-1 })} color="theme">Remove Last Choice</Button>
                )}

                <Text style={styles.title}>Category</Text>
                <View style={{ width: screenWidth*4/5, alignItems: 'center'}} >
                  <View style={[styles.block, {flexDirection: 'row'}]}>
                    <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={false} onChange={() => this.setState({onNews: !onNews})} color={tabColors[2]} label="News" />
                    <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={true} onChange={() => this.setState({onSports: !onSports})} color={tabColors[3]} label="Sports" />
                    <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onEntertainment} color={tabColors[4]} onChange={() => this.setState({onEntertainment: !onEntertainment})} label="Entertainment" />
                  </View>
                  <View style={[styles.block, {flexDirection: 'row'}]}>
                    <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onLove} color={tabColors[1]} onChange={() => this.setState({onLove: !onLove})} label="Love" />
                    <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onLiving} color={tabColors[6]} onChange={() => this.setState({onLiving: !onLiving})} label="Living" />
                    <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onQuiz} color={tabColors[10]} onChange={() => this.setState({onQuiz: !onQuiz})} label="Quiz" />
                    <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onAcademics} color={tabColors[8]} onChange={() => this.setState({onAcademics: !onAcademics})} label="Academics" />
                  </View>
                  <View style={[styles.block, {flexDirection: 'row'}]}>
                    <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onHealth} color={tabColors[5]} onChange={() => this.setState({onHealth: !onHealth})} label="Health" />
                    <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onIT} color={tabColors[9]} onChange={() => this.setState({onIT: !onIT})} label="IT" />
                    <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={false} color={tabColors[7]} onChange={() => this.setState({onCareer: !onCareer})} label="Career" />
                  </View>
                </View>

                {error !== '' && (<View style={{ marginTop: 40 }}><Text style={{ color: 'red' }}>{error}</Text></View>)}
                {!error && (<Text style={{  marginTop: 40, fontSize: 9 }}>You can delete but cannot edit after you make one.</Text>)}
                <Button onPress={this.onSubmit} style={{ width: screenWidth*7/9, marginTop: 10,  }} color='success'>Add Question</Button>

              </View>
              <View style={{ height: 200 }} />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  block: {
    marginTop: 20,
  },
  button: {

  },
  topbar: {
    width: screenWidth,
    height: 60,
    backgroundColor: 'red',
    borderTopWidth: 0.3,
    borderColor: 'white',
    borderBottomWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 10,
  },
  input: {
    borderColor: colors.black,
    borderWidth: 2,
    borderColor: colors.darkGrey,
    height: 40,
    width: screenWidth*7/9,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 0,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  form: {
    // marginTop: 10,
    padding: 20,
    backgroundColor: colors.white,
    width: screenWidth,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'BerkshireSwash-Regular',
    fontWeight: '100',
    fontSize: 40,
    alignItems: 'center',
  },
  title: {
    marginTop: 15,
    fontSize: 30,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  semiTitle: {
    marginTop: 5,
    fontFamily: 'PlayfairDisplay-Regular',
  }
})


// <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox color={tabColors[11]} onChange={() => this.setState({onOther:!this.state.onOther})} label="Other" />
