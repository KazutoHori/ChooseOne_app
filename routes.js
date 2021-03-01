import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { DrawerItems, DrawerNavigatorItems } from "react-navigation-drawer";
import colors from './utils/colors';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import CustomDrawerNavigator from './CustomDrawerNavigator';

import Top from './screens/Top';
import QuestionCreate from './screens/QuestionCreate';
import QuestionAnswered from './screens/QuestionAnswered';
import Sports from './screens/Sports';
import Study from './screens/Study';
import IT from './screens/IT';
import Entertainment from './screens/Entertainment';
import Love from './screens/Love';
import Living from './screens/Living';
import Health from './screens/Health';
import News from './screens/News';
import Career from './screens/Career';
import Quiz from './screens/Quiz';
import Other from './screens/Other';
import Academics from './screens/Academics';
import QuestionDetail from './screens/QuestionDetail';
import QuestionResult from './screens/QuestionResult';
import ContactUs from './screens/ContactUs';
import AccountSetting from './screens/AccountSetting';
import About from './screens/About';
import Drawer from './screens/Drawer';

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
      paddingTop: 40,
    },
    // tabBarComponent: AppTabNavigation
    style: {
      paddingTop: 40,
    },
    tabBarOptions: {
      paddingTop: 40,
      labelStyle: {
        fontSize: 12,
      },
      tabStyle: {
        width: 100,
        // backgroundColor: colors.grey,
      },
      style: {
        // backgroundColor: colors.red,
      },
      scrollEnabled: true,
    }
  }
);

const CreateScreens = createStackNavigator(
  {
    QuestionCreate,
  },
  {
    initialRouteName: 'QuestionCreate',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('create'),
      // drawerIcon: getDrawerItemIcon('list'),
      headerStyle: {
        // marginTop: 40,
        backgroundColor: colors.grey,
      },
    },
    headerMode: 'none',
    mode: 'modal',
    headerStyle: {
      // marginTop: 40,
    },
    style: {
      // marginTop: 40,
    }
  }
);

const QuestionAnsweredScreen = createStackNavigator(
  {
    QuestionAnswered,
  },
  {
    initialRouteName: 'QuestionAnswered',
    navigationOptions: {
      drawerIcon: getDrawerItemIcon('storage'),
    },
  },
);

const AboutScreen = createStackNavigator(
  {
    About,
  },
  {
    initialRouteName: 'About',
    navigationOptions: {
      drawerIcon: getDrawerItemIcon('star'),
    },
  },
);

const AccountSettingScreen = createStackNavigator(
  {
    AccountSetting,
  },
  {
    mode: 'modal',
    initialRouteName: 'AccountSetting',
    navigationOptions: {
      drawerIcon: getDrawerItemIcon('person'),
    },
  },
);

const ContactUsScreen = createStackNavigator(
  {
    ContactUs,
  },
  {
    mode: 'modal',
    initialRouteName: 'ContactUs',
    navigationOptions: {
      drawerIcon: getDrawerItemIcon('contact'),
    },
  },
);

const SettingDrawer = createDrawerNavigator(
  {
    QuestionAnswered: QuestionAnswered,
    About: About,
    Drawer: Drawer,
    AccountSetting: AccountSetting,
    ContactUs: ContactUs,
  },
  {
    contentComponent: Drawer,
    drawerPosition: 'right',
    initialRouteName: 'QuestionAnswered',
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('storage'),
    },
  },
);

const AnsweredScreens = createStackNavigator (
  {
    QuestionAnswered: QuestionAnswered,
    About: About,
    AccountSetting: AccountSetting,
    ContactUs: ContactUs,
  },
  {
    initialRouteName: 'QuestionAnswered',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('storage'),

      // drawerIcon: getDrawerItemIcon('list'),
    },
    headerMode: 'none',
    mode: 'modal',
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
    },
    style: {
      marginTop: 40,
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreens,
    Create: CreateScreens,
    Answered: SettingDrawer,
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
