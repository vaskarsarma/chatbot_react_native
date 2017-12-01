/**
 * Created by Vaskar Sarma
 * Chat-Bot App for mobile device
 * Using Dialog Flow API
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  Router,
  Scene
} from 'react-native-router-flux';

import Home from './APP/components/Home';
import Chat from './APP/components/Chat';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component{
  render() {
    return (
      <Router>
        <Scene key='root' style={{paddingTop: Platform.OS === 'ios' ? 64: 54}}>
          <Scene key='home' component={Home} title='Home'></Scene>
          <Scene key='chat' component={Chat} title='Chat'></Scene>
        </Scene>
      </Router>
    );
  }
}