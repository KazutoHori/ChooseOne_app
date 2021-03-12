import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import colors from './utils/colors';
import QuestionCreate from './screens/QuestionCreate';
import QuestionAnswered from './screens/QuestionAnswered';
import ContactUs from './screens/ContactUs';
import AccountSetting from './screens/AccountSetting';
import About from './screens/About';
import Drawer from './screens/Drawer';
import { HomeScreens } from './HomeScreens';
import UserQuestionDetail from './screens/UserQuestionDetail';
import UserQuestionResult from './screens/UserQuestionResult';

const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={30} style={{ color: tintColor }} />
);

const getDrawerItemIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={22} style={{ color: tintColor }} />
);

const CreateScreens = createStackNavigator(
  {
    QuestionCreate,
  },
  {
    initialRouteName: 'QuestionCreate',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('create'),
      headerStyle: {
        backgroundColor: colors.grey,
      },
    },
    headerMode: 'none',
    mode: 'modal',
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

const QuestionScreen = createStackNavigator (
  {
    QuestionAnswered,
    UserQuestionDetail,
    UserQuestionResult,
  },
  {
    initialRouteName: 'QuestionAnswered',
    headerMode: 'none',
    mode: 'modal',
  }
);

const SettingDrawer = createDrawerNavigator(
  {
    QuestionAnswered: QuestionScreen,
    About: About,
    Drawer: Drawer,
    AccountSetting: AccountSetting,
    ContactUs: ContactUs,
  },
  {
    contentComponent: Drawer,
    drawerPosition: 'right',
    initialRouteName: 'QuestionAnswered',
    // headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('storage'),
    },
  },
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
    keyboardHidesTabBar: true,
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight,
      },
      showLabel: true,
      showIcon: true,
      inactiveTintColor: colors.greyDark,
      keyboardHidesTabBar: true,
    },
  },
);

export default createAppContainer(TabNavigator);
