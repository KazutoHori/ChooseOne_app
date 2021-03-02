import { Image, StyleSheet, FlatList, View, ActivityIndicator,
    Text, TouchableOpacity, SafeAreaView, ScrollView, Modal
  } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Button, Radio } from 'galio-framework';

const screenWidth = Dimensions.get("window").width;

import colors from '../utils/colors';

let customFonts  = {
  'PlayfairDisplay-Medium': require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
  'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
}

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

    const { navigation: { state: { params }, navigate }} = this.props;
    const { question, question: {id, author, title, created, choices } } = params;

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

    this.setState({ id, author, title, created, copy });
    this.setState({ error: 'You have votes for soccer!' });
    // setTimeout(() => this.setState({ error: ''}),2500);
  }

  render() {
    const { navigation: { state: { params }, navigate }} = this.props;
    const { question: {id, author, title, created, choices } } = params;
    const { error, fontsLoaded, modalVisible, answered, madeit } = this.state;

    var pie_data = Array.from(choices);
    const aaa = created.slice(17, 19);

    let bar_data = {
      labels: [],
      colors: [],
      datasets: [
        {
          data: [],
          colors: [],
          // backgroundColor: [],
        },
      ]
    };

    for(var i=0; i<choices.length; i++){
      pie_data[i]['name']=pie_data[i].choice_text;
      // delete pie_data[i].choice_text;
      // pie_data[i]['name']='basketball';
      pie_data[i]['legendFontSize']=12;
      pie_data[i]['color']='hsla('+((i+aaa)*70)+',75%,75%, 1)';
      pie_data[i]['legendFontColor']='hsla('+((i+aaa)*70)+', 75%, 75%, 1)';
      // pie_data[i]['legend']=10;
      bar_data.labels.push(pie_data[i].choice_text);
      bar_data.datasets[0].data.push(pie_data[i].votes);
      // bar_data.colors.push((opacity: 1) => 'hsla('+((i+aaa)*70)+', 75%, 75%, 1)');
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
        <View style={styles.back}>
          <TouchableOpacity onPress={() => navigate('Top')}>
            <Icon name={'chevron-down'} size={30} style={{ color: colors.blue }} />
          </TouchableOpacity>
        </View>
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
            useShadowColorFromDataset: false // optional
          }}
          accessor={"votes"}
          backgroundColor={colors.white}
          paddingLeft={20}
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
            // backgroundColor: 'red',
            // fillShadowGradient: 'blue',
            fillShadowGradientOpacity: 100,
            color: (opacity = 1) => `rgba(${opacity*0}, 122, 205, 1)`,
            labelColor: (index) => colors.black,
            propsForBackgroundLines: {
              strokeWidth: 0.8,
              stroke: '#efefef',
              strokeDasharray: '0',
            },
            propsForLabels: {
              // fontFamily: 'Bogle-Regular',
              fontSize: 11,
            },
            barPercentage: 0.9,
            decimalPlaces: 0,
            useShadowColorFromDataset: false // optional
          }}
          style={{
            marginTop: 10,
            backgroundColor: colors.white,
          }}
        />

        {madeit && (
          <View style={styles.buttons}>
            <View>
              <Button color='success' onPress={() => this.setState({ modalVisible: true})}>
                Edit
              </Button>
            </View>
            <View>
              <Button color='theme' onPress={() => this.setState({modalVisible:true})}>
                Delete
              </Button>
            </View>
          </View>
        )}

        <View style={{ marginTop: 40}} />
        <View style={styles.back }>
          <TouchableOpacity onPress={() => navigate('Top')}>
            <Icon name={'chevron-down'} size={30} style={{ color: colors.blue }} />
          </TouchableOpacity>
        </View>
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
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  vv: {
    position: 'absolute',
    left: screenWidth/3*2,
    top: 10,
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Regular',
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
    // justifyContent: 'center',
  },
  back: {
    padding: 10,
    alignItems: 'center',
    // zIndex: 2,
    // left: screenWidth/2-20,
    // position: 'absolute',
  },
  center: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    // marginTop: 40,
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
