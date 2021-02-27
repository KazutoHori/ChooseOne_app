import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import colors from './utils/colors';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';

import Top from './screens/Top';
import Create from './screens/Create';
import Answered from './screens/Answered';
import Sports from './screens/Sports';
import Study from './screens/Study';
import IT from './screens/IT';
import Entertainment from './screens/Entertainment';
import Love from './screens/Love';
import Living from './screens/Living';
import Health from './screens/Health';
import News from './screens/News';
import Career from './screens/Career';
import Trip from './screens/Trip';
import Quiz from './screens/Quiz';
import Other from './screens/Other';
import Academics from './screens/Academics';
import QuestionDetail from './screens/QuestionDetail';
import QuestionResult from './screens/QuestionResult';

const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={30} style={{ color: tintColor }} />
);

const getDrawerItemIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={22} style={{ color: tintColor }} />
);

const TopScreen = createStackNavigator (
  {
    Top,
    QuestionDetail,
    QuestionResult,
  },
  {
    initialRouteName: 'Top',
    headerMode: 'none',
    mode: 'modal',
  }
);

const HomeScreens = createMaterialTopTabNavigator(
  {
    Top: {
      screen: TopScreen,
      navigationOptions: {
        tabBarLabel: 'Top',
      }
    },
    Love: {
      screen: Love,
    },
    News: {
      screen: News,
    },
    Sports: {
      screen: Sports,
    },
    Entertainment: {
      screen: Entertainment,
    },
    Trip: {
      screen: Trip,
    },
    Health: {
      screen: Health,
    },
    Living: {
      screen: Living,
    },
    Career: {
      screen: Career,
    },
    Academics: {
      screen: Academics,
    },
    IT: {
      screen: IT,
    },
    Quiz: {
      screen: Quiz,
    },
    Other: {
      screen: Other,
    },
  },
  {
    initialRouteName: 'Top',
    pagerComponent: ViewPagerAdapter,
    navigationOptions: {
      tabBarIcon: getTabBarIcon('home'),
    },
    // tabBarComponent: AppTabNavigation
    style: {
      paddingTop: 40,
    },
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
      },
      tabStyle: {
        width: 100,
        backgroundColor: 'red',
      },
      style: {
        backgroundColor: 'white',
      },
      scrollEnabled: true,
    }
  }
);

const CreateScreens = createStackNavigator(
  {
    Create,
  },
  {
    initialRouteName: 'Create',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('create'),
      // drawerIcon: getDrawerItemIcon('list'),
    },
  }
);

const AnsweredScreens = createStackNavigator (
  {
    Answered,
  },
  {
    initialRouteName: 'Answered',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('storage'),

      // drawerIcon: getDrawerItemIcon('list'),
    },
    style: {
      paddingTop: 40,
    },
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
      },
      tabStyle: {
        width: 100,
        backgroundColor: colors.greyDark,
      },
      style: {
        backgroundColor: 'white',
      },
      scrollEnabled: true,
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreens,
    Create: CreateScreens,
    Answered: AnsweredScreens,
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight,
      },
      showLabel: true,
      showIcon: true,
      inactiveTintColor: colors.greyDark,
    },
  },
);

export default createAppContainer(TabNavigator);
