import React, { Component } from 'react';

import { Drawer } from 'native-base';

import Sidebar from '../Views/Sidebar'
import AppHeader from '../Views/AppHeader';
import AppBody from '../Views/AppBody'
import constants from '../../src/Screens/constants'
import FinancialYear from '../../src/Screens/FinancialYear'
import DashboardScreen from './DashboardScreen';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'
import {Text} from 'react-native';
import { I18nManager } from 'react-native';
const translationGetters = {
  en: () => require('../../src/locales/en.json'),
  // nl: () => require('./src/translations/nl.js'),?
  ur: () => require('../../src/locales/ur.json')
}
const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
)
export default class MainScreen extends Component {
 constructor(props) {
    super(props);
    this.setScreen = this.setScreen.bind(this);
    this.login = this.login.bind(this);
    // this.getSidebarProps = this.getSidebarProps.bind(this);

    this.state = {
      screenToPlay: "DashboardScreen",
      queryToShow: 'DashboardScreen',
    headerToShow: "Accounts Dashboard",
      profileData:'',
      lang:'',
      pageRefresh: false,
    }
constants.env=this;
  }
    closeDrawer = () => {
    
        this.drawer._root.close()
      };
      openDrawer = () => {
        
        this.drawer._root.open()
      };
      setScreen(screen) {
        if (screen === "DashboardScreen") {
        this.setState({ queryToShow: "DashboardScreen", headerToShow:"Accounts Dashboard"})
        }
        if (screen === "FinancialYear") {
          this.setState({ queryToShow: "FinancialYear", headerToShow: "Financial Year" })
        }
        if (screen === "Stock") {
          this.setState({ queryToShow: "Stock", headerToShow: "Stock" })
        }
        if (screen === "OfflineOrders") {
          this.setState({ queryToShow: "OfflineOrdersHistory", headerToShow: "Create Offline Orders" })
        }
        if (screen === "CreateOfflineOrders") {
          this.setState({ queryToShow: "OfflineOrders", headerToShow: "Offline Orders" })
        }
        if (screen === "RequestStock") {
          this.setState({ queryToShow: "RequestStock", headerToShow: "Request Stock" })
        }
        if (screen === "AssignStock") {
          this.setState({ queryToShow: "AssignStock", headerToShow: "Assign Stock" })
        }
        if (screen === "Logout") {
          this.setState({ queryToShow: "Logout", headerToShow: "Logout" })
        }
        this.closeDrawer()
      }
      login = (email, pass) => {
        this.props.navigation.navigate('second', {
          UserEmail: email,
          UserPass: pass
        });
      }
      // setI18nConfig (lang) {
      //   const fallback = { languageTag: "en" , isRTL: false };
      
      //   const { languageTag, isRTL } =
      //     RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      //     fallback;
      //   translate.cache.clear();
      //   I18nManager.forceRTL(isRTL);
      //   i18n.translations = { [lang]: translationGetters[lang]() };
      //   i18n.locale =lang;
      //   this.setState({pageRefresh:true})
      // };
      setI18nConfig(lang) {
        const fallback = { languageTag: "en", isRTL: false };
        const { languageTag, isRTL } =
          RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
          fallback;
        translate.cache.clear();
        I18nManager.forceRTL(isRTL);
        i18n.translations = { [lang]: translationGetters[lang]() };
        i18n.locale = lang;
        this.setState({ pageRefresh: true })
      };
      setI18nConfigDefault() {
        const fallback = { languageTag: "en", isRTL: false };
    
        const { languageTag, isRTL } =
          RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
          fallback;
        translate.cache.clear();
        I18nManager.forceRTL(isRTL);
        if (languageTag == "en" || languageTag === "ur") {
          i18n.translations = { [languageTag]: translationGetters[languageTag]() };
          i18n.locale = languageTag;
        }
        else {
          i18n.translations = { [config.defaultLanguage]: translationGetters[config.defaultLanguage]() };
          i18n.locale = config.defaultLanguage;
        }
        this.setState({ pageRefresh: true })
      };
      componentDidMount() {
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
        this.checkLang();
      }
      handleLocalizationChange = () => {
        this.setI18nConfigDefault();
        this.forceUpdate();
      };
      componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);
      }
      setLanguage(value) {
        this.setI18nConfig(value);
      }
      checkLang = async () => { 
        try {
          const langSelected = await AsyncStorage.getItem('selectLang');
          if (langSelected !== null) {
            this.setLanguage(langSelected)
            this.setState({ lang: langSelected })
          }
          else {
            this.setI18nConfigDefault();
          }
        } catch (error) {
          // Error retrieving data
        }
      }
    render() {
        return (
          <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<Sidebar  parentContext={this} />}
            onClose={() => this.closeDrawer()}  >    
            <AppHeader headerTitle={this.state.headerToShow} context={this}  
              openDrawer={this.openDrawer.bind(this)}   
            />
                   {/* <FinancialYear headerTitle={this.state.headerToShow} context={this}  
              openDrawer={this.openDrawer.bind(this)}   
            /> */}
          
            {/* <AppBody screenToPlay='DashboardScreen' context={this} queryToShow='DashboardScreen'/> */}
            <AppBody screenToPlay={this.state.screenToPlay} context={this} queryToShow={this.state.queryToShow} 
    
            />
          </Drawer>
        );
      }
    
}

 