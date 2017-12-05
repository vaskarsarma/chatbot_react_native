# react-native-chat application using react-native-dialogflow

A React-Native Chat application using the Google Dialogflow AI SDK. For each request Dialog Flow will call to Web-Hooks based on matched intend type. Web-Hooks then call Google FIREBASE Server less functions and returns JSON response.

Right now we are pushing the JSON to FIREBASE (Googlw Cloud) using another NODE JS application. Future scope is to make call to external/EK APIs to display real time responses.

To Test the application : 

1. Download APK in adnroid device 
https://git.emirates.com/users/s440295/repos/hackathon/browse/andriod-app/app-release.apk

2. Install the APK

3. Run the APK

4. Select "Chat-Bot Key 1" and add a valid name, Press "Next"

5. Will route to CHAT screen and have fun :)


<img src="header_img.png" alt="Header Image"/>

Used to React-Native to provide support for both iOS 10+ and Android! and code reusablity.


[Dialogflow](https://dialogflow.com/) is a powerful tool for building delightful and natural conversational experiences. You can build chat and speech bots and may intergrate it in a lot of platform like twitter, facebook, slack, or alexa.


```
Note: Make sure you are setting the callbacks before startListening every single time again. Don't set the callbacks in e.g. constructor or componentsDidMount if you are executing startListening more than one times.

Right now we have configured to provide support for LANG_ENGLISH_GB but disloag flow provide support for below langauges

```
* LANG_CHINESE_CHINA
* LANG_CHINESE_HONGKONG
* LANG_CHINESE_TAIWAN
* LANG_DUTCH
* LANG_ENGLISH
* LANG_ENGLISH_GB
* LANG_ENGLISH_US
* LANG_FRENCH
* LANG_GERMAN
* LANG_ITALIAN
* LANG_JAPANESE
* LANG_KOREAN
* LANG_PORTUGUESE
* LANG_PORTUGUESE_BRAZIL
* LANG_RUSSIAN
* LANG_SPANISH
* LANG_UKRAINIAN