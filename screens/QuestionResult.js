import { Image, StyleSheet, FlatList, View, ActivityIndicator,
    Text, TouchableOpacity, SafeAreaView,
  } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import * as Font from 'expo-font';

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: colors.blue,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: colors.grey,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 25, 16, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

// Table
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

import colors from '../utils/colors';

const data = [
  {
    name: "basketball",
    population: 19551,
    color: "#d88eeb",
    legendFontColor: "#7F7F7F",
    legendFontSize: 10
  },
  {
    name: "soccer",
    population: 1857,
    color: "#d88e9d",
    legendFontColor: "#7F7F7F",
    legendFontSize: 10
  },
  {
    name: "hockey",
    population: 1591,
    color: "#e6ce91",
    legendFontColor: "#7F7F7F",
    legendFontSize: 10
  },
  {
    name: "tennis",
    population: 660,
    color: "#cdef94",
    legendFontColor: "#7F7F7F",
    legendFontSize: 10
  },
];

let customFonts  = {
  'PlayfairDisplay-Medium': require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
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
      }
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

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.back}>
          <TouchableOpacity onPress={() => navigate('Top')}>
            <Icon name={'chevron-down'} size={30} style={{ color: colors.blue }} />
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>by {author} {created.slice(0,10)}</Text>
        </View>

        <View style={styles.first}>
          <Text style={styles.c_text}>Choice</Text>
          <Text style={styles.v_text}>Votes</Text>
        </View>

        {choices.map((choice, index) => {
          return (
            <View style={styles.table}>
              <Text style={styles.index}>{index+1}</Text>
              <Text style={styles.cc}>{choice.choice_text}</Text>
              <Text style={styles.vv}>{choice.votes}</Text>
            </View>
          );
        })}

        <PieChart
          style={styles.piechart}
          data={data}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={colors.white}
          // paddingLeft={"15"}
          center={[10, 50]}
          absolute
        />

        {madeit && (
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.edit}>
              <Text style={styles.edit_text}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.delete}>
              <Text style={styles.delete_text}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  piechart: {
    marginTop: 30,
  },
  tables: {
    backgroundColor: 'grey',
  },
  table: {
    backgroundColor: '#d88eec',
    height: 50,
    flexDirection: 'row',
    borderTopColor: 'white',
    borderTopWidth: 0.5,
  },
  cc: {
    position: 'absolute',
    left: screenWidth/4,
    top: 10,
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Medium',
  },
  vv: {
    position: 'absolute',
    left: screenWidth/3*2,
    top: 10,
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Medium',
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
    marginTop: 30,
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
    fontSize: 9,
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
