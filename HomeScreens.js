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
import CustomTabBar from './CustomTabBar';

const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={30} style={{ color: tintColor }} />
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

const LoveScreen = createStackNavigator (
  {
    Love,
    QuestionDetail,
    QuestionResult,
  },
  {
    initialRouteName: 'Love',
    headerMode: 'none',
    mode: 'modal',
  }
);

const NewsScreen = createStackNavigator (
  {
    News,
    QuestionDetail,
    QuestionResult,
  },
  {
    initialRouteName: 'News',
    headerMode: 'none',
    mode: 'modal',
  }
);

const SportsScreen = createStackNavigator (
  {
    Sports,
    QuestionDetail,
    QuestionResult,
  },
  {
    initialRouteName: 'Sports',
    headerMode: 'none',
    mode: 'modal',
  }
);

const EntertainmentScreen = createStackNavigator (
  {
    Entertainment,
    QuestionDetail,
    QuestionResult,
  },
  {
    initialRouteName: 'Entertainment',
    headerMode: 'none',
    mode: 'modal',
  }
);

const HealthScreen = createStackNavigator (
  {
    Health,
    QuestionDetail,
    QuestionResult,
  },
  {
    initialRouteName: 'Health',
    headerMode: 'none',
    mode: 'modal',
  }
);

const LivingScreen = createStackNavigator (
  {
    Living,
    QuestionDetail,
    QuestionResult,
  },
  {
    initialRouteName: 'Living',
    headerMode: 'none',
    mode: 'modal',
  }
);

const CareerScreen = createStackNavigator (
  {
    Career,
    QuestionDetail,
    QuestionResult,
  },
  {
    initialRouteName: 'Career',
    headerMode: 'none',
    mode: 'modal',
  }
);

const AcademicsScreen = createStackNavigator (
  {
    Academics,
    QuestionDetail,
    QuestionResult,
  },
  {
    initialRouteName: 'Academics',
    headerMode: 'none',
    mode: 'modal',
  }
);

const ITScreen = createStackNavigator (
  {
    IT,
    QuestionDetail,
    QuestionResult,
  },
  {
    initialRouteName: 'IT',
    headerMode: 'none',
    mode: 'modal',
  }
);

const QuizScreen = createStackNavigator (
  {
    Quiz,
    QuestionDetail,
    QuestionResult,
  },
  {
    initialRouteName: 'Quiz',
    headerMode: 'none',
    mode: 'modal',
  }
);

const OtherScreen = createStackNavigator (
  {
    Other,
    QuestionDetail,
    QuestionResult,
  },
  {
    initialRouteName: 'Other',
    headerMode: 'none',
    mode: 'modal',
  }
);

export const HomeScreens = createMaterialTopTabNavigator(
  {
    Top: {
      screen: TopScreen,
      navigationOptions: {
        tabBarLabel: 'Top',
      }
    },
    Love: {
      screen: LoveScreen,
      navigationOptions: {
        tabBarLabel: 'Love',
      }
    },
    News: {
      screen: NewsScreen,
      navigationOptions: {
        tabBarLabel: 'News',
      }
    },
    Sports: {
      screen: SportsScreen,
      navigationOptions: {
        tabBarLabel: 'Sports',
      }
    },
    Entertainment: {
      screen: EntertainmentScreen,
      navigationOptions: {
        tabBarLabel: 'Entertainment',
      }
    },
    Health: {
      screen: HealthScreen,
      navigationOptions: {
        tabBarLabel: 'Health',
      }
    },
    Living: {
      screen: LivingScreen,
      navigationOptions: {
        tabBarLabel: 'Living',
      }
    },
    Career: {
      screen: CareerScreen,
      navigationOptions: {
        tabBarLabel: 'Career',
      }
    },
    Academics: {
      screen: AcademicsScreen,
      navigationOptions: {
        tabBarLabel: 'Academics',
      }
    },
    IT: {
      screen: ITScreen,
      navigationOptions: {
        tabBarLabel: 'IT',
      }
    },
    Quiz: {
      screen: QuizScreen,
      navigationOptions: {
        tabBarLabel: 'Quiz',
      }
    },
    Other: {
      screen: OtherScreen,
      navigationOptions: {
        tabBarLabel: 'Other',
      }
    },
  },
  {
    initialRouteName: 'Top',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('home'),
      paddingTop: 40,
    },
    // tabBarComponent: AppTabNavigation
    style: {
      paddingTop: 40,
    },
    tabBarComponent: CustomTabBar,
    // pagerComponent: ViewPagerAdapter,             // 要らないはず
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

    },
  }
);
