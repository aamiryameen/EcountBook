import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground,  Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Accordion from 'react-native-collapsible/Accordion';
import constants from '../Screens/constants';
import DropdownMenu from 'react-native-dropdown-menu';
import { Dropdown } from 'react-native-material-dropdown';
import * as RNLocalize from 'react-native-localize'
import { I18nManager } from 'react-native';
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'
import PropTypes from "prop-types";
import DashboardScreen from '../Screens/DashboardScreen';
import FinancialYear from '../../src/Screens/FinancialYear'
const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

  // var data = [["C", "Java", "JavaScript", "PHP"], ["Python", "Ruby"], ["Swift", "Objective-C"]];

const translationGetters = {

  en: () => require('../../src/locales/en.json'),
  // nl: () => require('./src/translations/nl.js'),?
  ur: () => require('../../src/locales/ur.json')
  
}
const CONTENT = [ 
  {
    // title: 'Account Defination',
    title: 'Account Defination',
    toTranslate:"AccountDefination"
  },
  {
    title: 'Accounts Transaction',
    toTranslate:"AccountTransaction"
  },
  {
    title: 'Accounts Reports',
    toTranslate:"AccountReport"
  }
];
const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
)
const data = [{
  label: "English",
  value: 'en',
}, {
  label: "Urdu",
  value: 'ur',
}];

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.state = {
      activeSections: [],
      collapsed: true,
      multipleSelect: false,
      text: '',
      data: {},
      val: { value: "" },
      pageRefresh: false,
      lang : "",
    };
  }
  static propTypes = {
    headerContext:PropTypes.object.isRequired,
    headerTitle: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    queryToShow: PropTypes.object.isRequired



  }
  setI18nConfig = (lang) => {

    const fallback = { languageTag: 'en' }
    const { languageTag } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback
if(languageTag=='ur'){
  <DashboardScreen/>
}
    translate.cache.clear()
    i18n.translations = { [lang]: translationGetters[lang]() }
    i18n.locale = lang
    this.setState({ pageRefresh: true })
  }
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
    else if( languageTag=="ur"){
<DashboardScreen/>    }
    else {
      i18n.translations = { [config.defaultLanguage]: translationGetters[config.defaultLanguage]() };
      i18n.locale = config.defaultLanguage;
    }

    this.setState({ pageRefresh: true })
  };


  setLanguage(value) {

    this.setI18nConfig(value);
    
    this.props.parentContext.setScreen("DashboardScreen")
  }
  // async saveUserData() {
  //   AsyncStorage.setItem("lang", JSON.stringify(data));
  // }

 

  _saveLang = async (lang) => {

    
    this.setState({
      lang: lang,
    });
    try {
      await AsyncStorage.setItem('selectLang', lang).then((value) => {
        this.setLanguage(lang);
        debugger
      })

    } catch (error) {
      // Error saving data
    }
    constants.env.setI18nConfig(lang);
    constants.env1.setI18nConfig(lang);
    // this.props.parentContext.getSidebarProps(lang);
  }
  checkLang = async () => {
    try {
      const langSelected = await AsyncStorage.getItem('selectLang');
      if (langSelected !== null) {
        console.log(langSelected);
        this.setLanguage(langSelected)
        this.setState({ lang: langSelected })
        // Navigation.dismissDrawer();

      }
    } catch (error) {
      // Error retrieving data
    }
  }
  componentDidMount() {
  
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }
  componentWillUnmount() {
    // Not mandatory
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }
  handleLocalizationChange = () => {
    this.setI18nConfigDefault()
    this.forceUpdate();
  };
  //  displayData=async(value)=>{
  //  let saveUser=await AsyncStorage.getItem('lang');
  //  const res=JSON.parse(saveUser);
  //  this.setState({data:r})
  //  alert({data:res})
  //  }
 
   componentWillMount(){
    // this.checkLang();
    this._saveLang("en")   }

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };
  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, image1) => {

    return (<View style={{ flexDirection: 'row', backgroundColor: "#b7d3f7", marginTop: 20, marginLeft: 7, marginRight: 7, borderRadius: 5, alignItems: "center" }}>
      <Image source={require('../Images/manage.png')} style={{ height: 20, width: 20, margin: 10 }} />
      <Text style={styles.tappableLink}>{translate(section.toTranslate)}</Text>
    </View>
    );
  };

  renderContent(section) {
    var playThis;
    if (section.title == "Account Defination") {
      return (
        <View >
          <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.props.parentContext.setScreen("FinancialYear")} >
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
          <Text style={styles.tappableSubLink}>{translate('FinancialYear')}</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.parentContext.setScreen("Orders")} style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate('ApprovedDashboard')}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.props.parentContext.setScreen("DashboardScreen")}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate('AccountsDashboard')}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate('ChartOfAccount')}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate('OpeningBalances')}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate('TaxScheduleMain')}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate('TaxTypes')}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate('Bank')}</Text></TouchableOpacity>
        </View>

      )

    }

    if (section.title == "Accounts Transaction") {
      return (
        <View>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
      <Text style={styles.tappableSubLink}>{translate("PaymentVoucher")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("ReceiptVoucher")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("CreditVoucher")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("JournalDebitVoucher")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("ContraVoucher")}</Text></TouchableOpacity>
        </View>)
    }
    if (section.title == "Accounts Reports") {
      return (
        <View>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("ChartOfAccount")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("VoucherValidation")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("VoucherActivity")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("ActivitySummery")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("VouchersReport")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("GeneralLedger")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("TrialBalance")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("Payables")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("Receivables")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("AccountStatement")} </Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("CashBookFlowStatement")} </Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("MonthlyTransactionBalances")}</Text></TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image source={require('../Images/dot.png')} style={{ height: 30, width: 30 }} />
            <Text style={styles.tappableSubLink}>{translate("BalanceSheet")}</Text></TouchableOpacity>


        </View>

      )

    }



  }

  render() {



    const { multipleSelect, activeSections } = this.state;

    return (


      <View style={styles.container}>
        <ScrollView contentContainerStyle={{}}>
 
          <View style={{ backgroundColor: "#0e64d6" }}>

            <Image source={require('../Images/aamir.jpg')}

              style={{ height: 90, width: 90, marginTop: 20, marginLeft: 110, marginRight: 110, borderRadius: 50 }} />



            <Text style={{ color: "#fff", marginTop: 20, marginLeft: 10 }}>{translate("name")}</Text>

            <Text style={{ color: "#fff", marginLeft: 10, marginBottom: 5 }}> aamiryameen0652@gmail.com</Text>
          </View>


          <Accordion

            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}

          />
          <View style={{ margin: 10 }}>

            <Dropdown


              label='Select Language'
              data={data}
              textColor="#7f78d2"
              selectedItemColor='#481380'
              textColor="#7f78d2"
              value={this,this.state.lang}
              // onPress={this.saveUserData}
              onChangeText={value => {this._saveLang(value)}}
              baseColor="#1eb2a6"

            // onPress ={this.displayData}
// onPress={<DashboardScreen/>}
            />
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 2,
    backgroundColor: '#F5FCFF',
    // paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
    color: "#2473A3"
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  tappableLink: {


    margin: 5,
    fontSize: 15,
    color: constants.colorGreyBGMain,
    fontFamily: constants.FontFamilyBold
  },
  tappableSubLink: {

    margin: 5,
    fontSize: 14,
    color: constants.colorGreyBGMain,
    fontFamily: constants.FontFamilyBold
  },
  dotstyle: {
    fontSize: 20,
    color: constants.colorGreyBGMain
  }
});