/**
 * Chat-Bot using react-native
 * by Vaskar Sarma
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Keyboard,
    ScrollView,
    Image,
    TextInput,
} from 'react-native';

import PropTypes, { array } from 'prop-types';
import Dialogflow from "react-native-dialogflow";
import Icon from 'react-native-vector-icons/Ionicons';
import Tts from 'react-native-tts';

export default class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listeningState: "not started",
            audioLevel: 0,
            isscrollToEnd: false,
            textmsg: "",
            messages: [
                {
                    query: "",
                    answer: "",
                    canswer: [],
                    images: "",
                    commands: []
                }
            ]
        };

        const apikey = props.apikey;

        Dialogflow.setConfiguration(
            apikey, Dialogflow.LANG_ENGLISH_GB
        );

        //TTS-config
        Tts.speak('Welcome ' + props.visitorname);
        Tts.setDucking(true);
        Tts.setDefaultLanguage('en-GB');
        Tts.setDefaultRate(0.99, true);
        Tts.setDefaultPitch(1.0);

        // Hide that keyboard!
        Keyboard.dismiss();
    }

    componentDidMount = () => {
        Dialogflow.requestEvent("start", null,
            r => {
                var sysReply = "";
                var cSysReply = new Array();
                var commands = "";
                var imageurl = "";
                var replies = new Array();

                if (r != null && r.result != null && r.result.fulfillment != null && r.result.fulfillment.speech != "") {
                    sysReply = r.result.fulfillment.speech;

                    if (r.result.fulfillment.messages != null) {
                        r.result.fulfillment.messages.map((item) => {

                            if (item.type == 0) {
                                console.log("1 : " + item.type + " : " + item.speech);
                                cSysReply.push(item.speech);
                            }

                            if (item.type == 3)
                                imageurl = item.imageUrl;

                            if (item.type == 2) {
                                if (item.replies != null) {
                                    commands += "To know more, please try these below commands";
                                    item.replies.map((reply) => {
                                        replies.push(reply);
                                    });
                                }
                            }
                        });
                    }

                    //Tts.speak(sysReply + " " + commands);
                    if (cSysReply != null || cSysReply.length > 0)
                        Tts.speak(cSysReply + " " + commands);
                    else
                        Tts.speak(sysReply + " " + commands);

                    this.setState({
                        messages: [...this.state.messages, {
                            query: '',
                            answer: sysReply,
                            canswer: cSysReply,
                            images: imageurl,
                            commands: replies,
                        }]
                    });
                }
            },
            e => console.log(e))
    };

    GetAPIResponse = () => {
        Dialogflow.onListeningStarted(() => {
            this.setState({ listeningState: "started" });
        });

        Dialogflow.onListeningCanceled(() => {
            this.setState({ listeningState: "canceled" });
        });

        Dialogflow.onListeningFinished(() => {
            this.setState({ listeningState: "finished" });
        });

        Dialogflow.onAudioLevel(level => {
            this.setState({ audioLevel: level });
        });

        Dialogflow.startListening(results => {
            console.log(results);
            var sysReply = "";
            var cSysReply = new Array();
            var imageurl = "";
            var replies = new Array();
            var commands = "";

            if (results != null && results.result != null && results.result.fulfillment != null && results.result.fulfillment.speech == "") {
                sysReply = "Please try again!";
            }
            else {
                sysReply = results.result.fulfillment.speech;

                if (results.result.fulfillment.messages != null) {
                    results.result.fulfillment.messages.map((item) => {
                        //console.log(item.type);

                        if (item.type == 0) {
                            console.log("2 : " + item.type + " : " + item.speech);
                            cSysReply.push(item.speech);
                        }

                        if (item.type == 3)
                            imageurl = item.imageUrl;

                        if (item.type == 2) {
                            if (item.replies != null) {
                                commands += "To know more, please try these below commands";
                                item.replies.map((reply) => {
                                    replies.push(reply);
                                });
                            }
                        }
                    });
                }
            }

            if (cSysReply != null || cSysReply.length > 0)
                Tts.speak(cSysReply + " " + commands);
            else
                Tts.speak(sysReply + " " + commands);

            //Tts.speak(sysReply + " " + commands);

            this.setState({
                isscrollToEnd: true,
                messages: [...this.state.messages, {
                    query: results.result.resolvedQuery,
                    answer: sysReply,
                    canswer: cSysReply,
                    images: imageurl,
                    commands: replies
                }]
            });
        }, error => {
            var errorTxt = "Could not get you, Can you please say again";
            Tts.speak(errorTxt);
            this.setState({
                isscrollToEnd: true,
                messages: [...this.state.messages,
                {
                    query: "?",
                    answer: errorTxt + "!",
                    canswer: [],
                    images: "",
                    commands: []
                }]
            });
        });
    }

    GetAPIRespForComd = (s, _this) => {
        if (s != "") {
            Dialogflow.requestQuery((s),
                results => {
                    console.log(results);
                    var sysReply = "";
                    var cSysReply = new Array();
                    var imageurl = "";
                    var replies = new Array();
                    var commands = "";

                    if (results != null && results.result != null && results.result.fulfillment != null && results.result.fulfillment.speech == "") {
                        sysReply = "Please try again!";
                    }
                    else {
                        // console.log(results.result.fulfillment.speech);
                        sysReply = results.result.fulfillment.speech;

                        if (results.result.fulfillment.messages != null) {
                            results.result.fulfillment.messages.map((item) => {

                                if (item.type == 0) {
                                    console.log("3 : " + item.type + " : " + item.speech);
                                    cSysReply.push(item.speech);
                                }

                                if (item.type == 3)
                                    imageurl = item.imageUrl;

                                if (item.type == 2) {
                                    if (item.replies != null) {
                                        commands += "To know more, please try these below commands";
                                        item.replies.map((reply) => {
                                            replies.push(reply);
                                        });
                                    }
                                }
                            });
                        }
                    }

                    // Hide that keyboard!
                    Keyboard.dismiss();
                    this.state.textmsg = "";

                    if (cSysReply != null || cSysReply.length > 0)
                        Tts.speak(cSysReply + " " + commands);
                    else
                        Tts.speak(sysReply + " " + commands);

                    _this.setState({
                        isscrollToEnd: true,
                        messages: [..._this.state.messages, {
                            query: results.result.resolvedQuery,
                            answer: sysReply,
                            canswer: cSysReply,
                            images: imageurl,
                            commands: replies
                        }]
                    });
                }, error => {
                    var errorTxt = "Could not get you, Can you please say again";
                    Tts.speak(errorTxt);
                    _this.setState({
                        isscrollToEnd: true,
                        messages: [..._this.state.messages,
                        {
                            query: "?",
                            answer: errorTxt + "!",
                            canswer: [],
                            images: "",
                            commands: []
                        }]
                    });
                });
        }
    }

    onChangeText = (value) => {
        this.setState({
            textmsg: value
        });
    }

    doNothing = () => {
        //alert("please add text");
    }

    render() {
        var _this = this;

        return (
            <View style={styles.container}>

                <ScrollView
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollToEnd({ animated: this.state.isscrollToEnd });
                    }}>
                    {
                        this.state.messages.map(function (result, i) {
                            const query = result.query;
                            const answer = result.answer;
                            const imageurl = result.images;
                            return (
                                <View key={i}>
                                    {(query !== "") ? (
                                        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                                            <View style={styles.personcircle}>
                                                <Icon name="ios-person" size={40} color="#ffffff" ></Icon>
                                            </View>
                                            <View>
                                                <Text>{" "}</Text>
                                            </View>
                                            <View style={styles.query}>
                                                <Text numberOfLines={3} ellipsizeMode='tail' style={styles.inputtext}>{query}</Text>
                                            </View>
                                        </View>
                                    ) : (<View></View>)}

                                    {(result.canswer.length > 0) ? (
                                        <View>
                                            {
                                                result.canswer.map((a, k) =>
                                                    <View key={k} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'center', padding: 10 }}>
                                                        <View style={styles.answer}>
                                                            <Text style={styles.inputtext}>{a}</Text>
                                                        </View>
                                                        <View >
                                                            <Text>{" "}</Text>
                                                        </View>
                                                        <View style={styles.systemcircle}>
                                                            <Icon name="logo-android" size={40} color="#ffffff" ></Icon>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    ) : (<View>
                                        {(answer !== "") ? (
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'center', padding: 10 }}>
                                                {console.log("4 " + answer)}
                                                <View style={styles.answer}>
                                                    <Text style={styles.inputtext}>{answer}</Text>
                                                </View>
                                                <View >
                                                    <Text>{" "}</Text>
                                                </View>
                                                <View style={styles.systemcircle}>
                                                    <Icon name="logo-android" size={40} color="#ffffff" ></Icon>
                                                </View>
                                            </View>
                                        ) : (<View></View>)}
                                    </View>)}

                                    {(imageurl !== "") ? (
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
                                            <TouchableOpacity><Image source={{ uri: imageurl }}
                                                style={styles.showimage} />
                                            </TouchableOpacity>
                                        </View>
                                    ) : (<View></View>)}

                                    {(result.commands.length > 0) ? (
                                        <View style={styles.commands}>
                                            {
                                                result.commands.map((s, k) =>
                                                    <View key={k} style={styles.commands}>
                                                        <TouchableOpacity
                                                            onPress={() => _this.GetAPIRespForComd(s, _this)}>
                                                            <View style={styles.commandstyle}>
                                                                <Text style={styles.inputtext}>{s}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    ) : (<View></View>)}

                                </View>
                            );
                        })
                    }
                </ScrollView>

                {(this.state.messages != null && this.state.messages.length > 0) ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', height: 50, margin: 2 }}>
                        <View style={styles.footersection}>
                            <TextInput
                                style={styles.nameinput}
                                placeholder="Send messages"
                                value={this.state.textmsg}
                                onChangeText={(value) => this.onChangeText(value)}
                            ></TextInput>
                            <TouchableOpacity style={styles.iconstyle}>
                                <Icon
                                    name="ios-send"
                                    size={30}
                                    color="#ffffff"
                                    onPress={() => (this.state.textmsg != "") ?
                                        this.GetAPIRespForComd(this.state.textmsg, this) : this.doNothing()}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.footersection}>
                            <TouchableOpacity style={styles.iconstyle}>
                                <Icon
                                    name="ios-mic"
                                    size={30}
                                    color={this.state.listeningState == "started" ? "#ffffff" : "#ff0000"}
                                    onPress={() => this.GetAPIResponse()}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconstyle}>
                                <Icon
                                    name="ios-close"
                                    size={30}
                                    color="#ffffff"
                                    onPress={() => Tts.stop()}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>) : (<View></View>)}
            </View>
        );
    }
}

Chat.defaultProps = {
    visitorname: 'Vaskar Sarma',
    apikey: '492a281b4eb64b8cbc326a5ac84d1cbe'
};

Chat.propTypes = {
    visitorname: PropTypes.string,
    apikey: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    inputtext: {
        fontSize: 14,
        textAlign: 'left',
        margin: 10,
        color: "#000000"
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: "#083002"
    },
    iconstyle: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: '#083002',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        margin: 2,
    },
    personcircle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#083002',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    systemcircle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#083002',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    query: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(9, 206, 209, 0.46)',
        borderRadius: 20
    },
    answer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignSelf: 'flex-start',
        marginLeft: 20,
        backgroundColor: 'rgba(9, 206, 209, 0.46)',
        borderRadius: 20
    },
    commands: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignSelf: 'center'
    },
    commandstyle: {
        width: 250,
        height: 20,
        borderRadius: 20,
        backgroundColor: 'rgba(9, 206, 209, 0.46)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        margin: 2,
    },
    showimage: {
        width: 250,
        height: 200,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ffffff',
        resizeMode: 'cover'
    },
    nameinput: {
        height: 40,
        borderWidth: 0,
        borderColor: '#0000FF',
        margin: 1,
        width: 220
    },
    footersection: {
        flexDirection: 'row',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderRadius: 5
    }
});

