import React, { Component } from "react";
import { I18nManager } from 'react-native';
import { StatusBar, Text, StyleSheet, TouchableOpacity, View, Image, ImageBackground, ScrollView, YellowBox, SafeAreaView, Dimensions } from "react-native";

import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Header, Left, Button, Icon, Right, Body, Title, Card, CardItem } from "native-base";
import MainScreen from "./MainScreen";
import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'
import constants from "./constants";


const translationGetters = {
  en: () => require('../../src/locales/en.json'),
  // nl: () => require('./src/translations/nl.js'),?
  ur: () => require('../../src/locales/ur.json')
}
const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
)
export default class DashboardScreen extends Component {
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
    constants.env=this;
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

      // main view 
      <View style={styles.container}>

        {/* Header style view */}

        <ScrollView>
          <View>
            {/* Description title style  */}

            <View style={{ textAlign: 'center' }}>
              <ImageBackground source={require('../Images/topTitle.png')} style={{
                height: 40, width: 150,
                marginTop: 10, marginLeft: 2
              }}>

                <Text style={{
                  paddingTop: 9,
                  textAlign: "center",
                  color: "#ffffff", fontSize: 16,
                }}>{translate("Description")}</Text>

              </ImageBackground>
              <View style={{ height: 150, backgroundColor: "#ebebeb", flexDirection: "row", paddingLeft: 20 }}>
                <View style={{ flex:2,padding: 10, }} >
                  <Text style={{ color: "#1b6bd4" }} >{translate("cashEquivalent")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("RevenueAndSales")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("Payables")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("Receivables")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("RevenueAndSales")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("OperatingExpense")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("BankEquivalent")}</Text>

                </View>

                <View style={{ flex:1, padding: 10 }}>

                  <Text >234,44.00</Text>
                  <Text >234,44.00</Text>
                  <Text>234,44.00</Text>
                  <Text>234,44.00</Text>
                  <Text>234,44.00</Text>
                  <Text>234,44.00</Text>
                  <Text>234,44.00</Text>
                </View>
              </View>

            </View>
            {/* Cash Eqivalent title style  */}
            <View style={{ marginTop: 15 }}>

              <Text style={{ color: "#2b7de9", fontSize: 15, marginLeft: 17 }}>{translate("cashEquivalent")}</Text>

              <View style={{ height: 100, backgroundColor: "#ebebeb", flexDirection: "row" }}>
                <Image source={require('../Images/left.png')} style={{ height: 100, width: 20, marginLeft: 1, }} />
                <View style={{flex:2, marginLeft: 8, padding: 10, }} >
                  <Text style={{ color: "#1b6bd4" }} >{translate("Opening")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("CurrentDebit")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("CurrentCredit")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("Banlance")}</Text>


                </View>

                <View style={{ flex:1, padding: 10 }}>

                  <Text >234,44.00</Text>
                  <Text >234,44.00</Text>
                  <Text>234,44.00</Text>
                  <Text>234,44.00</Text>

                </View>
              </View>

            </View>
            {/* Payable title style  */}
            <View style={{ marginTop: 10 }}>

              <Text style={{ color: "#2b7de9", fontSize: 15, marginLeft: 17 }}>{translate("Payables")} </Text>

              <View style={{ height: 100, backgroundColor: "#ebebeb", flexDirection: "row" }}>
                <Image source={require('../Images/left.png')} style={{ height: 100, width: 20, marginLeft: 2, }} />
                <View style={{flex:2, padding: 10 }} >
                <Text style={{ color: "#1b6bd4" }} >{translate("Opening")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("CurrentDebit")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("CurrentCredit")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("Banlance")}</Text>

                </View>

                <View style={{ flex:1, padding: 10 }}>

                  <Text >234,44.00</Text>
                  <Text >234,44.00</Text>
                  <Text>234,44.00</Text>
                  <Text>234,44.00</Text>

                </View>
              </View>

            </View>
            {/* Receievables title style  */}
            <View style={{ marginTop: 10 }}>

              <Text style={{ color: "#2b7de9", fontSize: 15, marginLeft: 17 }}>{translate("Receivables")} </Text>

              <View style={{ height: 100, backgroundColor: "#ebebeb", flexDirection: "row" }}>
                <Image source={require('../Images/left.png')} style={{ height: 100, width: 20, marginLeft: 2, }} />
                <View style={{flex:2, padding: 10 }} >
                <Text style={{ color: "#1b6bd4" }} >{translate("Opening")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("CurrentDebit")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("CurrentCredit")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("Banlance")}</Text>

                </View>

                <View style={{ flex:1, padding: 10 }}>

                  <Text >234,44.00</Text>
                  <Text >234,44.00</Text>
                  <Text>234,44.00</Text>
                  <Text>234,44.00</Text>

                </View>
              </View>

            </View>
            {/* Revenue & sales title style  */}
            <View style={{ marginTop: 10 }}>

              <Text style={{ color: "#2b7de9", fontSize: 15, marginLeft: 17 }}>{translate("RevenueAndSales")}</Text>

              <View style={{ height: 100, backgroundColor: "#ebebeb", flexDirection: "row" }}>
                <Image source={require('../Images/left.png')} style={{ height: 100, width: 20, marginLeft: 2, }} />
                <View style={{ flex:2,padding:10 }} >
                <Text style={{ color: "#1b6bd4" }} >{translate("Opening")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("CurrentDebit")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("CurrentCredit")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("Banlance")}</Text>

                </View>

                <View style={{flex:1, padding: 10 }}>

                  <Text >234,44.00</Text>
                  <Text >234,44.00</Text>
                  <Text>234,44.00</Text>
                  <Text>234,44.00</Text>

                </View>
              </View>

            </View>
            {/* Operatin expense title style  */}
            <View style={{ marginTop: 10 }}>

              <Text style={{ color: "#2b7de9", fontSize: 15, marginLeft: 17 }}>{translate("OperatingExpense")}</Text>

              <View style={{ height: 100, backgroundColor: "#ebebeb", flexDirection: "row", }}>
                <Image source={require('../Images/left.png')} style={{ height: 100, width: 20, marginLeft: 2, }} />
                <View style={{ flex:2,padding:10 }} >
                <Text style={{ color: "#1b6bd4" }} >{translate("Opening")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("CurrentDebit")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("CurrentCredit")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("Banlance")}</Text>

                </View>

                <View style={{flex:1, padding: 10 }}>

                  <Text >234,44.00</Text>
                  <Text >234,44.00</Text>
                  <Text>234,44.00</Text>
                  <Text>234,44.00</Text>

                </View>
              </View>

            </View>
            {/* Bank Equivalent title style  */}
            <View style={{ marginTop: 10 }}>

              <Text style={{ color: "#2b7de9", fontSize: 15, marginLeft: 17 }}> {translate("BankEquivalent")} </Text>

              <View style={{ height: 100, backgroundColor: "#ebebeb", flexDirection: "row", }}>
                <Image source={require('../Images/left.png')} style={{ height: 100, width: 20, marginLeft: 2, }} />
                <View style={{ flex:2,padding:10 }} >
                <Text style={{ color: "#1b6bd4" }} >{translate("Opening")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("CurrentDebit")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("CurrentCredit")}</Text>
                  <Text style={{ color: "#1b6bd4" }}>{translate("Banlance")}</Text>

                </View>

                <View style={{flex:1, padding: 10 }}>

                  <Text >234,44.00</Text>
                  <Text >234,44.00</Text>
                  <Text>234,44.00</Text>
                  <Text>234,44.00</Text>

                </View>
              </View>

            </View>
          </View>
        </ScrollView>
      </View>


    );
  }

}
const styles = new StyleSheet.create({

  Headerstyle: {

    height: 50

  },
  container: {
    flex: 1,
    marginBottom: 10
  }



})