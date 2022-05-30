import React, { Component } from "react";
import { I18nManager } from 'react-native';
import { StatusBar, Text, StyleSheet, ImageBackground, View } from "react-native";
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Header, Left, Button, Icon, Right, Body, Title } from "native-base";
import constants from '../Screens/constants'
import PropTypes from "prop-types";
import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'



const translationGetters = {
  en: () => require('../../src/locales/en.json'),
  // nl: () => require('./src/translations/nl.js'),?
  ur: () => require('../../src/locales/ur.json')
}

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
)


export default class AppHeader extends Component {
  static propTypes = {
    headerTitle: PropTypes.object.isRequired,
    headerContext:PropTypes.object.isRequired,
    parentContext: PropTypes.object.isRequired,


  }
  constructor(props) {
    super(props);
    this.setI18nConfig = this.setI18nConfig.bind(this)
    this.setI18nConfigDefault = this.setI18nConfigDefault.bind(this)
    // this.renderContent = this.renderContent.bind(this);
    this.state = {
      activeSections: [],
      collapsed: true,
      multipleSelect: false,
      text: '',
      data: {},
      val: { value: "" },
      pageRefresh: false,
      lang: "",

    };
    constants.env1=this;
  }
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
    this.focusListener = 'didFocus', () => {
      var propsLang = this.props.context.state.lang;
      this.setI18nConfig(propsLang);
    }
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
  handlePropLang(propsLang){
   this.setI18nConfig(propsLang)
   this.setState({lang:propsLang})
  }
  render() {
    // const {lang} = this.state
    // var propsLang = this.props.context.state.lang;
    // if (lang == propsLang) {
    //   this.handlePropLang(propsLang)
    // }
    return (
      <View style={styles.Headerstyle}>
        <ImageBackground source={require('../Images/header.png')} style={{ height: 90 }} >

          <View style={{ flex: 1, marginLeft: 15, marginTop: 15 }}>
            <Button  transparent onPress={(parentContext) => this.props.openDrawer(parentContext)}>
              {/* <Icon name='menu' color='#f50' /> */}
              <MaterialIcon
                name="menu"
                color="#fff"
                size={32}
              />
            </Button>
          </View>
          <Body style={{ flex: 7, marginBottom: 40 }}>
            <Title
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: constants.FontFamilyRegular
              }}
            >
           {/* <Text>{translate("AccountsDashboard")}</Text>    */}
           
          <Text>{this.props.headerTitle}</Text>    
            </Title>
          </Body>
        </ImageBackground>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  header: {

    backgroundColor: 'transparent',
    // tintColor: '#fff',
    color: "#fff",
    // borderBottomColor: constants.colorGreyBGInputBox,
    // borderBottomWidth: 1
  }
});