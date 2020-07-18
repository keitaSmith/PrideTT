import React, { useState, useRef } from 'react'
import { WebView } from 'react-native-webview';
import { View, TouchableOpacity, Text, StyleSheet,StatusBar } from 'react-native';

const EventRegistrationScreen = props => {
    const {registrationUrl}= props.route.params
    const webviewRef = useRef(null)
    const [canGoBack, setCanGoBack] = useState(false)
    const [currentUrl, setCurrentUrl] = useState('')
    const backButtonHandler = () => {
        if (webviewRef.current) webviewRef.current.goBack()
    }

    //  const frontButtonHandler = () => {
    //     if (webviewRef.current) webviewRef.current.goForward()
    //  }
    return (
        <View style={styles.flexContainer}>
            <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "rgba(0, 0, 0, 0.5)" translucent = {false}/>
            {(canGoBack)&&<View>
                {(canGoBack&&currentUrl!=donationInfo.donate_link)&&<TouchableOpacity onPress={backButtonHandler} style={styles.tabBarContainer}>
                    <Text style={styles.button}>Back</Text>
                </TouchableOpacity>}
                 {/* {canGoForward&&<TouchableOpacity onPress={frontButtonHandler}>
                    <Text style={styles.button}>Forward</Text>
                </TouchableOpacity>}  */}
            </View>}
            <WebView
                source={{
                    uri: registrationUrl
                }}
                ref={webviewRef}
                onNavigationStateChange={navState => {
                    setCanGoBack(navState.canGoBack)
                    //setCanGoForward(navState.canGoForward)
                    setCurrentUrl(navState.url)
                }} 
                />
            
        </View>
    );
}
const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    tabBarContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white'
    },
    button: {
        color: 'black',
        fontSize: 24
    }
})
export default EventRegistrationScreen;