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
import { Button as Button_c } from 'react-native-paper';

import colors from '../utils/colors';
import tabColors from '../utils/tabColors';
import Questions from '../utils/questions';
import LoginForm from './LoginForm';

import * as firebase from 'firebase';
import questions from '../utils/questions';
import slugify from '../utils/slugify.js';

var db = firebase.firestore();

let customFonts  = {
  'BerkshireSwash-Regular': require('../assets/fonts/BerkshireSwash-Regular.ttf'),
  'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
}

let all_cat = [
  'Top', 'Love', 'News', 'Sports', 'Entertainment', 'Health', 'Living', 'Career', 'Academics',
  'IT', 'Quiz',
];

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
    categories: [],
    add_choice: 0,

    title: '',
    choices: Array(10),
    error: '',
    s_modalVisible: false,
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
    var copy = choices.slice();
    copy[idx] = text;

    this.setState({ choices: copy });
  };

  onSubmit = async () => {
    const { fontsLoaded, loading, error, add_choice, title, choices, categories,
      } = this.state;
    const { navigation: { navigate }} = this.props;
    var user = firebase.auth().currentUser;
    if(user === null){
      this.setState({ s_modalVisible: true });
      return null;
    }
    var userId = user.uid;

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

    if(categories.length === 0){
      this.setState({ error: 'Category cannot be empty'});
      setTimeout(() => this.setState({ error: ''}),2500);
      return null;
    }

    var how_many=0;
    await db.collection('questions').get().then(snap => {
      how_many = snap.size
    });

    var rep=0;
    var new_slug=slugify(title);
    await db.collection('questions').where('slug', '==', new_slug).get().then(snap => {
      rep=snap.size
    });
    if(rep !== 0) {
      rep=rep+1;
      new_slug=new_slug.concat(rep.toString());
    }

    let current=new Date();
    current=current.toJSON();
    let new_question = {
      id: how_many+1,
      title: title,
      author: user.uid,
      category: categories,
      slug: new_slug,
      created: current.slice(0, 10)+current.slice(11, 19),
      choices: new_choices,
      comments: [],
      users_answered: [],
      all_votes: 0,
    }

    db.collection('questions').doc(new_slug).set(new_question);
    db.collection('users').doc(userId).update({
      question_created: firebase.firestore.FieldValue.arrayUnion(new_slug)
    });

    this.setState({
      add_choice: 0,
      title: '',
      choices: Array(10),
      error: '',
      categories: [],
    });
    navigate('QuestionDetail', { question: new_question});
  };

  onCategory = idx => {
    const { categories } = this.state;
    var copy=categories.slice();
    if(copy.includes(all_cat[idx])){
      copy=copy.filter(c => c !== all_cat[idx]);
    }else{
      copy.push(all_cat[idx]);
    }
    this.setState({ categories: copy });
  }

  render() {
    const { fontsLoaded, loading, categories, error, s_modalVisible,
      add_choice, title, choices, } = this.state;
    const { navigation: { navigate }} = this.props;

    var user = firebase.auth().currentUser;

    var added=[];
    for (let i=0; i<add_choice; i++){
      added.push(
        <View>
          <View style={styles.semiTitle} />
          <TextInput
            style={[styles.input, ]}
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

    if(!fontsLoaded) return null;
    return (
      <SafeAreaView>
        {s_modalVisible && (<LoginForm /> )}
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
                style={[styles.input, { fontFamily: 'PlayfairDisplay-Regular', }]}
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
                style={[styles.input, ]}
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
                style={[styles.input, ]}
                value={choices[1]}
                underlineColorAndroid="transparent"
                onChangeText={(text) => this.choiceChangeText(text, 1)}
                // onSubmitEditing={this.choice}
                placeholder={'Choice 2'}
              />
              {add_choice !== 0 && (
                [added]
              )}
              {add_choice < 8 && (
                <Button style={{ width: screenWidth*4/9, marginTop: 10,}} onPress={() => this.setState({ add_choice: add_choice+1 })} color={colors.blue}>Add New Choice</Button>
              )}
              {add_choice !==0 && (
                <Button style={{ width: screenWidth*4/9, marginTop: 10,}} onPress={() => this.setState({ add_choice: add_choice-1 })} color="theme">Remove Last Choice</Button>
              )}

              <Text style={styles.title}>Category</Text>
              <View style={{ marginTop: 10, width: screenWidth*4/5, alignItems: 'center'}} >
                <View style={[styles.block, {flexDirection: 'row'}]}>
                  {all_cat.map((cate, idx) => {
                    if(idx < 1 || idx >=4) return null;
                    const { categories } = this.state;
                    if(categories.includes(all_cat[idx])) { var m='contained'; var sselected={ color: 'white', }; }
                    else { var m='outlined'; var sselected=null; }
                    return (
                      <Button_c color={tabColors[idx]} labelStyle={[styles.l_choice, sselected]} mode={m} style={[styles.choice, { borderColor: tabColors[idx], marginRight: 3, marginLeft: 3}]} onPress={() => this.onCategory(idx) }>
                        {cate}
                      </Button_c>
                    );
                  })}
                </View>
                <View style={[styles.block, {flexDirection: 'row'}]}>
                  {all_cat.map((cate, idx) => {
                    if (idx <= 3 || idx>=7) return null;
                    const { categories } = this.state;
                    if(categories.includes(all_cat[idx])) { var m='contained'; var sselected={ color: 'white', }; }
                    else { var m='outlined'; var sselected=null; }
                    return (
                      <Button_c color={tabColors[idx]} labelStyle={[styles.l_choice, sselected]} mode={m} style={[styles.choice, { borderColor: tabColors[idx], marginRight: 3, marginLeft: 3}]} onPress={() => this.onCategory(idx) }>
                        {cate}
                      </Button_c>
                    );
                  })}
                </View>
                <View style={[styles.block, {flexDirection: 'row'}]}>
                  {all_cat.map((cate, idx) => {
                    if(idx < 7 ) return null;
                    const { categories } = this.state;
                    if(categories.includes(all_cat[idx])) { var m='contained'; var sselected={ color: 'white', }; }
                    else { var m='outlined'; var sselected=null; }
                    return (
                      <Button_c color={tabColors[idx]} labelStyle={[styles.l_choice, sselected]}  mode={m} style={[styles.choice, { borderColor: tabColors[idx], marginRight: 3, marginLeft: 3}]} onPress={() => this.onCategory(idx) }>
                        {cate}
                      </Button_c>
                    );
                  })}
                </View>
              </View>

              {error !== '' && (<View style={{ marginTop: 7 }}><Text style={{ color: 'red' }}>{error}</Text></View>)}
              {!error && (<Text style={{  marginTop: 7, fontSize: 9 }}>You can delete but cannot edit after you make one.</Text>)}
              <Button onPress={this.onSubmit} style={{ width: screenWidth*7/9, marginTop: 10,  }} color='success'>Add Question</Button>

            </View>
            <View style={{ height: 200 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  l_choice: {
    // fontFamily: 'PlayfairDisplay-Medium',
    fontSize: 10,
  },
  choice: {
    // alignItems: 'flex-start',
    fontFamily: 'PlayfairDisplay-Medium',
    marginBottom: 12,
    borderWidth: 0.7,
    borderRadius: 15,
    // buttonSize: 15,
  },
  block: {
    marginTop: 0,
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
    // fontFamily: 'PlayfairDisplay-Regular',
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
    textAlign: 'center',
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


// <View style={{ width: screenWidth*4/5, alignItems: 'center'}} >
//   <View style={[styles.block, {flexDirection: 'row'}]}>
//     <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={false} onChange={() => this.setState({onNews: !onNews})} color={tabColors[2]} label="News" />
//     <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={true} onChange={() => this.setState({onSports: !onSports})} color={tabColors[3]} label="Sports" />
//     <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onEntertainment} color={tabColors[4]} onChange={() => this.setState({onEntertainment: !onEntertainment})} label="Entertainment" />
//   </View>
//   <View style={[styles.block, {flexDirection: 'row'}]}>
//     <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onLove} color={tabColors[1]} onChange={() => this.setState({onLove: !onLove})} label="Love" />
//     <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onLiving} color={tabColors[6]} onChange={() => this.setState({onLiving: !onLiving})} label="Living" />
//     <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onQuiz} color={tabColors[10]} onChange={() => this.setState({onQuiz: !onQuiz})} label="Quiz" />
//     <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onAcademics} color={tabColors[8]} onChange={() => this.setState({onAcademics: !onAcademics})} label="Academics" />
//   </View>
//   <View style={[styles.block, {flexDirection: 'row'}]}>
//     <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onHealth} color={tabColors[5]} onChange={() => this.setState({onHealth: !onHealth})} label="Health" />
//     <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={onIT} color={tabColors[9]} onChange={() => this.setState({onIT: !onIT})} label="IT" />
//     <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox initialValue={false} color={tabColors[7]} onChange={() => this.setState({onCareer: !onCareer})} label="Career" />
//   </View>
// </View>


// <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox color={tabColors[11]} onChange={() => this.setState({onOther:!this.state.onOther})} label="Other" />
