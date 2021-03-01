import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator, SafeAreaView, TextInput, ScrollView,
  Linking, TouchableOpacity, TouchableWithoutFeedback, Image
} from 'react-native';
import * as Font from 'expo-font'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import { Button, Checkbox,  } from 'galio-framework';

import colors from '../utils/colors';

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
    text: '',
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

  handleChangeText = text => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    // const { onSubmit } = this.props;
    const { text } = this.state;

    // onSubmit(text);
    this.setState({ text: '' });
  };

  render() {
    const { loading, text, fontsLoaded, add_choice } = this.state;
    const { navigation: { navigate }} = this.props;

    var added=[];
    for (let i=0; i<add_choice; i++){
      added.push(
        <View>
          <View style={styles.semiTitle} />
          <TextInput
            style={[styles.input]}
            value={text}
            underlineColorAndroid="transparent"
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmitEditing}
            placeholder={'Choice '+(3+i)}
          />
        </View>
      );
    }

    if (fontsLoaded) {
      return (
        <SafeAreaView>
          <View style={styles.topbar}>
            {loading && (
              <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
            )}
            <TouchableWithoutFeedback onPress={() => navigate('QuestionCreate')}>
              <Image source={require('../assets/ChooseOne1.png')} onLoad={this.handleLoad} style={{ top: 16, left: 58,}}/>
            </TouchableWithoutFeedback>
            <TouchableOpacity style={{ position: 'absolute', right: 69, top: 13}}>
              <Icon name={'search'} size={30} style={{ color: colors.grey }} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.container}>
            <View style={styles.form}>
              <Text style={styles.text}>Let's Create Your {'\n'}  Own Question!</Text>
              <Text style={styles.title}>Question</Text>
              <View style={styles.semiTitle} />
              <TextInput
                style={styles.input}
                value={text}
                underlineColorAndroid="transparent"
                onChangeText={this.handleChangeText}
                onSubmitEditing={this.handleSubmitEditing}
                placeholder={'Title'}
              />
              <Text style={styles.title}>Category</Text>
              <View style={{ width: screenWidth*4/5, alignItems: 'center'}} >
                <View style={[styles.block, {flexDirection: 'row'}]}>
                  <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox onChange={() => this.setState({onNews:!this.state.onNews})} color={colors.blue} label="News" />
                  <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox onChange={() => this.setState({onSports:!this.state.onSports})} color="success" label="Sports" />
                  <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox color="primary" onChange={() => this.setState({onEntertainment:!this.state.onEntertainment})} label="Entertainment" />
                </View>
                <View style={[styles.block, {flexDirection: 'row'}]}>
                  <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox color="info" onChange={() => this.setState({onHealth:!this.state.onHealth})} label="Health" />
                  <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox color="success" onChange={() => this.setState({onLiving:!this.state.onLiving})} label="Living" />
                  <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox color="primary" onChange={() => this.setState({onCareer:!this.state.Career})} label="Career" />
                  <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox color="success" onChange={() => this.setState({onIT:!this.state.onIT})} label="IT" />
                </View>
                <View style={[styles.block, {flexDirection: 'row'}]}>
                  <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox color="info" onChange={() => this.setState({onAcademics:!this.state.onAcademics})} label="Academics" />
                  <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox color="primary" onChange={() => this.setState({onLove:!this.state.onLove})} label="Love" />
                  <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox color="primary" onChange={() => this.setState({onQuiz:!this.state.onQuiz})} label="Quiz" />
                  <View style={{ marginRight: 10, marginLeft: 10}} /><Checkbox color="info" onChange={() => this.setState({onOther:!this.state.onOther})} label="Other" />
                </View>
              </View>

              <Text style={styles.title}>Choices</Text>
              <View style={styles.semiTitle} />
              <TextInput
                style={styles.input}
                value={text}
                underlineColorAndroid="transparent"
                onChangeText={this.handleChangeText}
                onSubmitEditing={this.handleSubmitEditing}
                placeholder={'Choice 1'}
              />
              <View style={styles.semiTitle} />
              <TextInput
                style={styles.input}
                value={text}
                underlineColorAndroid="transparent"
                onChangeText={this.handleChangeText}
                onSubmitEditing={this.handleSubmitEditing}
                placeholder={'Choice 2'}
              />
              {add_choice !== 0 && (
                [added]
              )}
              <Button style={{ width: screenWidth*3/4, marginTop: 20,}} onPress={() => this.setState({ add_choice: add_choice+1 })} color='info'>Add New Choice</Button>
              {add_choice !==0 && (
                <Button style={{ width: screenWidth*3/4, marginTop: 10, marginBottom: 40,}} onPress={() => this.setState({ add_choice: add_choice-1 })} color="theme" disabled={true}>Remove Last Choice</Button>
              )}

              <Text>You can edit after you make one.</Text>
              <Button style={{ width: screenWidth*3/4, marginTop: 10, marginBottom: 70, }} color='success'>Add Question</Button>
            </View>
          </ScrollView>
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
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'red',
    borderTopWidth: 0.3,
    borderColor: 'white',
    borderBottomWidth: 5,
    // marginBottom: 10,
  },
  input: {
    borderColor: colors.black,
    borderWidth: 2,
    borderColor: colors.darkGrey,
    height: 40,
    width: screenWidth*6/8,
    borderRadius: 5,
    marginTop: 7,
    paddingLeft: 10,
    paddingRight: 0,
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
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  semiTitle: {
    marginTop: 20,
    fontFamily: 'PlayfairDisplay-Regular',
  }
})
