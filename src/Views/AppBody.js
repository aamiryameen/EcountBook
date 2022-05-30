import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import PropTypes from 'prop-types';
import DashboardScreen from '../Screens/DashboardScreen'
import FinancialYear from '../../src//Screens/FinancialYear'
// import Logout from '../Screen/Logout';

export default class AppBody extends React.Component {

  constructor(props) {
    super(props)
  }
  static propTypes = {
    headerTitle: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    queryToShow: PropTypes.object.isRequired
  };
  render() {
    var playThis;
    if (this.props.queryToShow === "DashboardScreen") {
        playThis = <DashboardScreen></DashboardScreen>
      }
if(this.props.queryToShow==="FinancialYear"){
  playThis=<FinancialYear></FinancialYear>
}
    if (this.props.queryToShow === "Stock") {
      playThis = <Stock context={this.props.context}> </Stock>
    }
    if (this.props.queryToShow === "History") {
      playThis = <HistoryScreen> </HistoryScreen>
    }
    if (this.props.queryToShow === "Account") {
      playThis = <Account context={this.props.context}> </Account>
    }
    else if (this.props.queryToShow === "OfflineOrders") {
      playThis = <OfflineOrdersHistory context={this.props.context}></OfflineOrdersHistory>
    }
    else if (this.props.queryToShow === "OfflineOrdersHistory") {
      playThis = <OfflineOrdersScreen context={this.props.context}></OfflineOrdersScreen>
    }
    else if (this.props.queryToShow === "RequestStock") {
      playThis = <RequestStock context={this.props.context}></RequestStock>
    }
    else if (this.props.queryToShow === "AssignStock") {
      playThis = <AssignStock context={this.props.context}></AssignStock >
    }
    else if (this.props.queryToShow === "Logout") {
      playThis = <LoginScreen context={this.props.context}> </LoginScreen>
    }
    return (
      <Container>
        {playThis}
      </Container>
    );
  }
}