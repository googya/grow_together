import React, {Component} from 'react';

import {StackNavigator} from 'react-navigation';

import HomeScreen from './src/pages/home'
import DetailScreen from './src/pages/details';

const RootStack = StackNavigator({
    Home: {
      screen: HomeScreen,
    },

    Detail: {
      screen: DetailScreen,
    }
  },

  {
    initialRouteName: 'Detail',
  });

export default class App extends Component {
  render() {
    return <RootStack/>;
  }
}