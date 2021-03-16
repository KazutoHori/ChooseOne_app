import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Button } from 'galio-framework';
import { showMessage } from 'react-native-flash-message';
import * as firebase from 'firebase';

import colors from '../utils/colors';

require("firebase/firestore");
const screenWidth = Dimensions.get("window").width;
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
let customFonts  = {
  'PlayfairDisplay-Medium': require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
  'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
}

export default class QuestionDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answered: true,
      madeit: false,
      likedit: false,
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

    const { navigation: { state: { params } }} = this.props;
    const { your_vote, question: {id, slug, author, title, created, choices } } = params;

    var copy=choices;
    copy.sort(function(first, second){
      if (first.votes > second.votes){
        return -1;
      }else if (first.votes < second.votes){
        return 1;
      }else{
        return 0;
      }
    });

    var user = firebase.auth().currentUser;
    if(user){
      db.collection('users').doc(user.uid).get().then((doc) => {
        if(doc.data().question_created.includes(slug)){
          this.setState({ madeit: true  });
        }
      });
      db.collection('users').doc(user.uid).get().then((doc) => {
        if(doc.data().question_liked.includes(slug)){
          this.setState({ likedit: true  });
        }
      });
    }

    this.setState({ id, author, title, created, copy });
    this.setState({ error: 'You have voted for '+your_vote+'!' });
  }

  onLikeit = () => {
    const { navigation: { state: { params } }} = this.props;
    const { question: { slug } } = params;

    showMessage({
      message: "You like this question!",
      type: "info",
      icon: 'success',
    });

    var user = firebase.auth().currentUser;
    if(user && user.uid){
      db.collection("users").doc(user.uid).update({
        question_liked: firebase.firestore.FieldValue.arrayUnion(slug)
      })
    }
  }

  onDelete = () => {
    const { navigation: { state: { params }, navigate }} = this.props;
    const { from_where, question: { slug } } = params;
    this.setState({ modalVisible: false });

    showMessage({
      message: "You have successfully deleted!",
      type: "warning",
      icon: 'success',
    });

    var user = firebase.auth().currentUser;
    db.collection("questions").doc(slug).delete();
    db.collection("users").doc(user.uid).update({
      question_created: firebase.firestore.FieldValue.arrayRemove(slug)
    })

    navigate(from_where);
  }

  render() {
    const { navigation: { state: { params }, navigate }} = this.props;
    const { from_where, question: { title, created, choices } } = params;
    const { likedit, error, fontsLoaded, modalVisible, madeit } = this.state;

    var pie_data = Array.from(choices);
    const aaa = created.slice(-2);

    let bar_data = {
      labels: [],
      colors: [],
      datasets: [
        {
          data: [],
          colors: [],
        },
      ]
    };

    for(var i=0; i<choices.length; i++){
      pie_data[i]['name']=pie_data[i].choice_text;
      pie_data[i]['legendFontSize']=12;
      pie_data[i]['color']='hsla('+((i+aaa)*70)+',75%,75%, 1)';
      pie_data[i]['legendFontColor']='hsla('+((i+aaa)*70)+', 75%, 75%, 1)';
      bar_data.labels.push(pie_data[i].choice_text);
      bar_data.datasets[0].data.push(pie_data[i].votes);
    }

    const table = (index) => ({
      backgroundColor: 'hsla('+((index+aaa)*70)+',75%,75%,1)',
      height: 50,
      flexDirection: 'row',
      borderTopColor: 'white',
      borderTopWidth: 0.4,
    });

    if (!fontsLoaded) return null;
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => navigate(from_where)}>
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
                <Button style={{width: 100,}} color='theme' onPress={this.onDelete}>
                  Delete
                </Button>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{alignItems: 'center'}}><Text style={{ fontSize: 18, color: 'hsla(800, 65%, 45%, 1)', fontFamily: 'PlayfairDisplay-Medium', }}>{error}</Text></View>
        <View style={styles.first}>
          <Text style={styles.c_text}>Choice</Text>
          <Text style={styles.v_text}>Votes</Text>
        </View>

        {choices.map((choice, index) => {
          return (
            <View style={table(index)}>
              <Text style={styles.index}>{index+1}</Text>
              <Text style={styles.cc}>{choice['name']}</Text>
              <Text style={styles.vv}>{choice['votes']}</Text>
            </View>
          );
        })}

        <PieChart
          style={{
            marginTop: 10,
          }}
          data={pie_data}
          width={screenWidth}
          height={300}
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: colors.white,
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(${opacity*0}, 122, 205, 1)`,
            useShadowColorFromDataset: false
          }}
          accessor={"votes"}
          backgroundColor={colors.white}
          paddingLeft={10}
          center={[10, 0]}
          bgColor={'transparent'}
          avoidFalseZero
        />

        <BarChart
          style={styles.barchart}
          data={bar_data}
          width={screenWidth}
          height={300}
          yAxisLabel=""
          fromZero
          verticalLabelRotation={30}
          backgroundColor={colors.white}
          withInnerLines={true}
          segments={3}
          showBarTops={false}
          verticalLabelRotation={0}
          showValuesOnTopOfBars
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: colors.white,
            backgroundGradientToOpacity: 0,
            fillShadowGradientOpacity: 100,
            color: (opacity = 1) => `rgba(${opacity*0}, 122, 205, 1)`,
            labelColor: (index) => colors.black,
            propsForBackgroundLines: {
              strokeWidth: 0.8,
              stroke: '#efefef',
              strokeDasharray: '0',
            },
            propsForLabels: {
              fontSize: 11,
            },
            barPercentage: 0.9,
            decimalPlaces: 0,
            useShadowColorFromDataset: false
          }}
          style={{
            marginTop: 10,
            backgroundColor: colors.white,
          }}
        />

        <View style={styles.buttons}>
            {likedit && (
              <View>
                <Button color={colors.blue} onPress={this.onLikeit}>
                  <Icon name={'thumbs-up'} size={25} style={{ color: 'white' }} />
                  <Text style={{ color: 'white' }}>You Like this question!</Text>
                </Button>
              </View>
            )}
            {!likedit && (
              <View>
                <Button color={colors.blue} onPress={this.onLikeit}>
                  <Icon name={'thumbs-up'} size={25} style={{ color: 'white' }} />
                  <Text style={{ color: 'white' }}>Like it!</Text>
                </Button>
              </View>
            )}
          {madeit && (
            <View>
              <Button color='theme' onPress={() => this.setState({modalVisible:true})}>
                Delete
              </Button>
            </View>
          )}
        </View>

        <View style={{ marginTop: 40}} />
        <TouchableOpacity style={styles.back } onPress={() => navigate(from_where)}>
          <Icon name={'chevron-down'} size={30} style={{ color: colors.blue }} />
        </TouchableOpacity>
        <View style={{ marginBottom: 40}} />
      </ScrollView>
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
  tables: {
    backgroundColor: 'grey',
  },
  cc: {
    position: 'absolute',
    left: screenWidth/4,
    top: 10,
    fontSize: 18,
    paddingTop: 5,
  },
  vv: {
    position: 'absolute',
    left: screenWidth/3*2,
    top: 10,
    fontSize: 20,
  },
  index: {
    position: 'absolute',
    left: 50,
    top: 10,
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Medium',
  },
  first: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginTop: 10,
    height: 50,
  },
  c_text: {
    position: 'absolute',
    left: screenWidth/4,
    top: 10,
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Medium',
  },
  v_text: {
    position: 'absolute',
    left: screenWidth/3*2,
    top: 10,
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Medium',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  edit: {
    padding: 8,
    width: 70,
    height: 45,
    backgroundColor: colors.green,
    borderRadius: 6,
    marginRight: 30,
  },
  delete: {
    padding: 8,
    width: 85,
    height: 45,
    backgroundColor: colors.red,
    borderRadius: 6,
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
  },
  back: {
    padding: 10,
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
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
