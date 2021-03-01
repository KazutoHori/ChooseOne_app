import React, { Component } from 'react';
import {
  Text,
  View, TouchableOpacity, ScrollView,
} from 'react-native';

import colors from './utils/colors';

export default class AppTabNavigation extends React.Component {
  render() {
    const { navigation } = this.props;
    const { routes, index } = this.props.navigation.state;
    const {
      containerStyle,
      tabStyle,
      selectedTabStyle,
      textStyle,
      selectedTextStyle,
    } = styles;
    const color=[]

    return (
      <View>
        <ScrollView contentInsetAdjustmentBehavior='scrollableAxes' automaticallyAdjustContentInsets={false} showsHorizontalScrollIndicator={false} horizontal style={containerStyle}>
          {routes.map((route, idx) => {
            if (index === idx) {
              return (
                <View key={idx} style={[tabStyle, selectedTabStyle, {backgroundColor: colors.blue}]}>
                  <Text style={[textStyle, selectedTextStyle]}>{route.routeName}</Text>
                </View>
              );
            }
            return (
              <TouchableOpacity
                style={[tabStyle, {backgroundColor: color[idx] }]}
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
  containerStyle: {
    padding: 0,
    borderBottomWidth: 3,
    borderBottomColor: colors.blue,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // backgroundColor: colors.grey,
  },
  tabStyle: {
    flex: 1,
    marginRight: 1,
    marginLeft: 1,
    height: 30,
    width: 95,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#ffffff',
  },
  selectedTabStyle: {
    backgroundColor: colors.blue,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 13,
  },
  selectedTextStyle: {
    color: '#ffffff',
  },
}
