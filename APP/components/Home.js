/**
 * Chat-Bot using react-native
 * by Vaskar Sarma
 */

import React, {Component} from 'react';

import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity,Picker} from 'react-native';

import {
 Actions
} from 'react-native-router-flux';

import {validate} from "../../utils/validations";

export default class Home extends Component {
    constructor(){
        super();
        this.state={
            name: '',
            key: '',
            isError:false,
            errorMsg:''
        };
    }
    
    onChangeText(value){
      this.setState({
           name: value
      });
      
      let v=validate("name",value);
      this.setState({isError: v[0],errorMsg: v[1]});
    }

    onChangeKey(value){
        this.setState({
             key: value
        });                 
      }
    
    render(){
        return(
            <View style={styles.container}>

                <Picker
                mode='dropdown'
                style={styles.picker} 
                selectedValue={this.state.key}
                onValueChange={(value) => this.onChangeKey(value)}>
                <Picker.Item label="Select ChatBot Key" color="green" value="" />
                <Picker.Item label="Chat-Bot Key 1" color="green" value="492a281b4eb64b8cbc326a5ac84d1cbe" />
                <Picker.Item label="Chat-Bot Key 2" color="green" value="475db972aaf84669b935b8733a8a0f9a" />
                </Picker>                
                <Text>{" "}</Text>

                <TextInput 
                 style={(this.state.isError)?styles.errorbox:styles.nameinput}
                 placeholder= "Please add your name"
                 value={this.state.name}
                 onChangeText={(value) => this.onChangeText(value)}
                 maxLength={25}
                ></TextInput>
                <Text style={styles.errormessage}>{this.state.errorMsg}</Text>
              
               <TouchableOpacity 
               onPress={()=>{
                    if(this.state.key == "")
                    {
                        alert("Please select a valid Bot Key");
                    }
                    else if(this.state.name == "")
                    {
                        alert("Please add your name");
                    }
                    else
                    {
                        Actions.chat({
                        visitorname: this.state.name,
                        apikey: this.state.key,
                        title: "Welcome " + this.state.name
                        }); 
                    }
               }}>
                   
                <Text style={styles.buttonText}>Next</Text>

               </TouchableOpacity>
            </View>
            );
        }
    }

    var styles= StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
          },
        title : {
            marginTop:0,
            marginLeft:20,
            fontSize:20,
            color: 'green'
        },
        nameinput : {
            height: 40,
            borderWidth: 2,
            borderColor: '#F5FCFF',
            margin: 20,
            width: 300
        },
        buttonText: {
            marginLeft: 20,
            fontSize: 20
        },
        picker: {
            width: 250,
          },
        errorbox: {
            height: 40,
            borderWidth: 2,
            borderColor: '#ff0000',
            margin: 20,
            width: 300
        },
        errormessage : {
            color:"#FF0000",
            margin: 20,
            width: 300
        },
        });