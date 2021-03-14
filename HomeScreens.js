import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Top from './screens/Top';
import Sports from './screens/Sports';
import IT from './screens/IT';
import Entertainment from './screens/Entertainment';
import Love from './screens/Love';
import Living from './screens/Living';
import Health from './screens/Health';
import News from './screens/News';
import Career from './screens/Career';
import Quiz from './screens/Quiz';
import Academics from './screens/Academics';
import QuestionDetail from './screens/QuestionDetail';
import QuestionResult from './screens/QuestionResult';
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
  },
  {
    initialRouteName: 'Top',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('home'),
      paddingTop: 40,
    },
    style: {
      paddingTop: 40,
    },
    tabBarComponent: CustomTabBar,
    tabBarOptions: {
      paddingTop: 40,
      labelStyle: {
        fontSize: 12,
      },
      tabStyle: {
        width: 100,
      },
      scrollEnabled: true,
    },
  }
);
