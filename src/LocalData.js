import React, { Component } from "react";
import { I18nManager } from 'react-native';
import { StatusBar, Text, StyleSheet, TouchableOpacity, View, Image, ImageBackground, ScrollView, YellowBox, SafeAreaView ,Button,AsyncStorage} from "react-native";
export default class LocalData extends Component{
state={
 data:[]

}
    saveUserData(){
        const CountryLang=[
            "English",
            "Urdu",
             "Arabic",
             "China",
             "Russia",
             "Hindi",
        ]
       const res= AsyncStorage.setItem("lang",JSON.stringify(CountryLang));
        alert("data save successfully ")
      }
    displayData=async()=>{
    let saveUser=await AsyncStorage.getItem('lang');
    const res=JSON.parse(saveUser);
    this.setState({data:res})
  alert(res)
}
componentWillMount(){
    this.displayData()
}

render(){
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text  style={{marginTop:20}}>Local data</Text>
            <Button  style={{marginTop:20}} title ="sava data" onPress={this.saveUserData}/>
            {/* <Button title ="display data"/> */}
            <Button  style={{marginTop:20}} onPress={this.displayData} title="display data"/>
 

            
            <Text style={{marginTop:20}}>{this.state.data}</Text>
        </View>
    )
}

}