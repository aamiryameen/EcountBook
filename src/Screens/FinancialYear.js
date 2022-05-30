



import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Button } from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SearchIcon from 'react-native-vector-icons/dist/AntDesign';
import constants from '../Screens/constants'
import CheckBox from 'react-native-check-box'
import PropTypes from "prop-types";
import { TextInput } from 'react-native-paper';
import InputOutline from 'react-native-input-outline';

export default class FinancialYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: true,
            visibleModal: null,
            code: '',
            startPeriod: '',
            endPeriod: ''
        }
    }
    handleCode = (text) => {
        this.setState({ code: text })
    }
    handleStartPeriod = (text) => {
        this.setState({ startPeriod: text })
    }
    handleEndPeriod = (text) => {
        this.setState({ endPeriod: text })
    }
    login = (code, startPeriod, endPeriod) => {
        alert('code: ' + code + '  StartPeriod: ' + startPeriod + "EndPeriod:" + endPeriod)
    }
    static propTypes = {
        headerTitle: PropTypes.object.isRequired,
        headerContext: PropTypes.object.isRequired,
        parentContext: PropTypes.object.isRequired,
    }
    _renderButton = (text, onPress) => (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>

            <TouchableOpacity onPress={onPress} style={{ width: 180, height: 70 }} >
                <View style={styles.button}>
                    <Text style={{ color: "#fff" }}>{text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text style={{ color: "#2b7de9", fontSize: 20 }}>Edit Financial Year</Text>
            <InputOutline
  placeholder="Code"
  focusedColor='blue'
  defaultColor='grey'
  onChangeText={this.handleCode}
/>
<InputOutline
width="70%"
  placeholder="Start Period"
  focusedColor='blue'
  defaultColor='grey'
  onChangeText={this.handleCode}
/>
            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="End Period"
                placeholderTextColor="#2b7de9"
                autoCapitalize="none"
                onChangeText={this.handleEndPeriod} />

            {this._renderButton('Save Changes', () => this.setState({ visibleModal: null }))}
            {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
        </View>
    );

    render() {
        return (
            <View style={styles.container}>

<InputOutline
  placeholder="Email"
  focusedColor='blue'
  defaultColor='grey'
/>
                <View style={{ flexDirection: "row", backgroundColor: "#e8eaed", flex: 0.1, marginTop: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ padding: 10, color: "#2b7de9", fontSize: 20 }} >Financial Year List</Text>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <SearchIcon name="search1" size={20} color="#000" style={{ justifyContent: "flex-end", padding: 12 }} />
                    </View>

                </View>
                {this._renderButton('Add Financial Year', () => this.setState({ visibleModal: 1 }))}

                <Modal isVisible={this.state.visibleModal === 1}>
                    {this._renderModalContent()}
                </Modal>
                <Modal
                    isVisible={this.state.visibleModal === 2}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                >
                    {this._renderModalContent()}
                </Modal>

                {/* Blue Box style */}

                <View style={{ backgroundColor: "#2b7de9", flex: 0.2 }}>

                    {/* Start period  */}
                    <View style={{ flexDirection: "row" }} >
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 3 }}>
                            <Text style={{ color: "white", fontSize: 16, paddingTop: 20, paddingLeft: 20 }}>Start Period:</Text>
                            <Text style={{ color: "#70788d", fontSize: 18, paddingTop: 20, paddingLeft: 10 }}>02-10-2020</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 20 }}>
                            <CheckBox

                                checkBoxColor="white"
                                checkedCheckBoxColor="white"
                                onClick={() => {
                                    this.setState({
                                        isChecked: !this.state.isChecked
                                    })
                                }}
                                isChecked={this.state.isChecked}

                            />
                        </View>

                    </View>
                    {/* 2nd Period */}
                    <View style={{ flexDirection: "row" }} >
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 3 }}>
                            <Text style={{ color: "white", fontSize: 16, paddingLeft: 20 }}>Start Period:</Text>
                            <Text style={{ color: "#70788d", fontSize: 18, paddingLeft: 10 }}>02-10-2020</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingRight: 15 }}>
                            <TouchableOpacity style={{ backgroundColor: "white", borderRadius: 20, width: 50, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "#2b7de9" }}>EDIT</Text>

                            </TouchableOpacity>




                        </View>

                    </View>

                </View>

                {/* checkBox */}
                <View style={{ backgroundColor: "#2b7de9", flex: 0.2, marginTop: 10 }}>

                    {/* Start period  */}
                    <View style={{ flexDirection: "row" }} >
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 3 }}>
                            <Text style={{ color: "white", fontSize: 16, paddingTop: 20, paddingLeft: 20 }}>Start Period:</Text>
                            {/* <Text style={{ color: "#70788d", fontSize: 18, paddingTop: 20, paddingLeft: 10 }}>02-10-2020</Text> */}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 20 }}>
                            <CheckBox
                                checkBoxColor="white"
                                checkedCheckBoxColor="white"
                                onClick={() => {
                                    this.setState({
                                        isChecked: !this.state.isChecked
                                    })
                                }}
                                isChecked={this.state.isChecked}

                            />
                        </View>

                    </View>
                    {/* 2nd Period */}
                    <View style={{ flexDirection: "row" }} >
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 3 }}>
                            <Text style={{ color: "white", fontSize: 16, paddingLeft: 20 }}>Start Period:</Text>
                            {/* <Text style={{ color: "#70788d", fontSize: 18, paddingLeft: 10 }}>02-10-2020</Text> */}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingRight: 15 }}>
                            <TouchableOpacity style={{ backgroundColor: "#acaaaa", borderRadius: 20, width: 50, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "white" }}>EDIT</Text>

                            </TouchableOpacity>




                        </View>

                    </View>

                </View>




            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    button: {
        backgroundColor: '#2b7de9',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        color: "white",
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        flex: 1
    },
    modalContent: {
        backgroundColor: '#e8eaed',
        padding: 22,
        // flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#2b7de9',
        borderWidth: 1,
        borderRadius: 10,
        width: "100%"

    },
});