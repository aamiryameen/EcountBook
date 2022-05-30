
import React, { Component } from "react";
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'
import {
  I18nManager,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  ur: () => require("../../src/locales/ur.json"),
  en: () => require("../../src/locales/en.json")

  
};
const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
)
const setI18nConfigCustomized = (language) => {
  const fallback = { languageTag: 'en' }
  const { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback

  translate.cache.clear()
  i18n.translations = { [language]: translationGetters[language]() }
  i18n.locale = language

}
const setI18nConfig = () => {

  const fallback = { languageTag: 'en' }
  const { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback

  translate.cache.clear()
  i18n.translations = { [languageTag]: translationGetters[languageTag]() }
  i18n.locale = languageTag
}
export default class International extends React.Component {

  constructor(props) {
    super(props)
    // setI18nConfig()
    setI18nConfigCustomized("ur")
  }


  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange)
    // this.displayData()
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange)
  }

  handleLocalizationChange = () => {
    setI18nConfig()
      .then(() => this.forceUpdate())
      .catch(error => {
        console.error(error)
      })
  }
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.value}>{translate("title")}</Text>
        <Text style={styles.value}>{translate("name")}</Text>
        <Text style={styles.value}>{translate("defination")}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  value: {
    fontSize: 18
  }
});