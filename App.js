/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import MainScreen from './src/Screens/MainScreen'
import DashboardScreen from './src/Screens/DashboardScreen'
import { createStackNavigator, createAppContainer } from "react-navigation";
import LocalData from './src/LocalData'
import International  from './src/i18n/International'
import FinancialYear from './src/Screens/FinancialYear'
console.disableYellowBox = true;

const AppNavigator = createStackNavigator(
  {
// data:{
//     screen: LocalData ,navigationOptions:{header:null}
// },

//  dashboard:{
//         screen: DashboardScreen ,navigationOptions:{header:null}
//  },



    MainScreen: {
      screen: MainScreen, navigationOptions: { header: null, }
    },
    dashboard: {
      screen: DashboardScreen, navigationOptions: { header: null }
    },
  });



export default createAppContainer(AppNavigator);