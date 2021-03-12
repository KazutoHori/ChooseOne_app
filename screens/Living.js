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

import QuestionList from '../components/QuestionList';
import colors from '../utils/colors';
import tabColors from '../utils/tabColors';
import Questions from '../utils/questions';

const options = {
  method: 'POST',
}

export default class Living extends React.Component {

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
  }

  static navigationOptions = () => ({

  });

  constructor(props){
    super(props);
    this.state = {
      questions: Questions,
      loading: true,
      error: false,
    };
    this.scrollRef = React.createRef();
  }

  handleLoad = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    const { loading, error, questions } = this.state;
    const { navigation: { navigate } } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topbar}>
          {loading && (
            <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
          )}
          <TouchableWithoutFeedback onPress={() => this.scrollRef.current.scrollToOffset({ animated: true, offset: 0}) }>
            <Image source={require('../assets/ChooseOne1.png')} onLoad={this.handleLoad} style={{ top: 10, left: 20}}/>
          </TouchableWithoutFeedback>
          <TouchableOpacity style={{ position: 'absolute', right: 30, top: 7}}>
            <Icon name={'search'} size={30} style={{ color: colors.grey }} />
          </TouchableOpacity>
        </View>
        <QuestionList
          questions={questions}
          passRef={this.scrollRef}
          onPress={() => navigate('QuestionDetail', { id: 1 } )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: tabColors[6],
    borderTopWidth: 0,
    borderColor: 'white',
  },
  container: {
    backgroundColor: colors.grey,
    justifyContent: 'center',
    flex: 1,
  },
})
