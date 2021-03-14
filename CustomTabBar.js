import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import colors from './utils/colors';
import tabColors from './utils/tabColors';


export default class AppTabNavigation extends React.Component {
  constructor(props){
    super(props);
    this.scrollRef=React.createRef();
  }

  componentDidUpdate() {
    const { index } = this.props.navigation.state
    if (1<index && index<10){
      this.scrollRef.current.scrollTo({ animated: false, x: 95*(index-2)+40, y:0})
    }else if(index>=10){
      this.scrollRef.current.scrollToEnd({ animated: false });
    }else{
      this.scrollRef.current.scrollTo({ animated:false, offset: 0});
    }
  }

  render() {
    const { navigation } = this.props;
    const { routes, index } = this.props.navigation.state;
    const {
      tabStyle,
      selectedTabStyle,
      textStyle,
      selectedTextStyle,
    } = styles;

    const containerStyle = (index) => ({
      padding: 0,
      borderBottomWidth: 3,
      borderBottomColor: tabColors[index],
      flexDirection: 'row',
    });

    return (
      <View>
        <ScrollView
          contentInsetAdjustmentBehavior='scrollableAxes'
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={containerStyle(index)}
          ref={this.scrollRef}
        >
          {routes.map((route, idx) => {
            if (index === idx) {
              return (
                <View key={idx} style={[tabStyle, selectedTabStyle, {backgroundColor: tabColors[idx]}]}>
                  <Text style={[textStyle, selectedTextStyle]}>{route.routeName}</Text>
                </View>
              );
            }
            return (
              <TouchableOpacity
                style={[tabStyle, {backgroundColor: tabColors[idx] }]}
                key={idx}
                onPress={() => { navigation.navigate(route.routeName); }}
              >
                <Text style={textStyle}>{route.routeName}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  tabStyle: {
    flex: 1,
    marginRight: 1,
    marginLeft: 1,
    height: 30,
    width: 95,
    marginTop: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#ffffff',
  },
  selectedTabStyle: {
    marginTop: 0,
    height: 38,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 13,
    color: colors.white,
  },
}
