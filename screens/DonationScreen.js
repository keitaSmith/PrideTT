import React, { useState, useRef } from 'react'
import { WebView } from 'react-native-webview';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DonationInfo from '../queries/Donate';

const DonationScreen = props => {
    const webviewRef = useRef(null)
    const donationInfo = DonationInfo();
    const [canGoBack, setCanGoBack] = useState(false)
    const [canGoForward, setCanGoForward] = useState(false)
    const [currentUrl, setCurrentUrl] = useState('')
    const backButtonHandler = () => {
        if (webviewRef.current) webviewRef.current.goBack()
    }

    // const frontButtonHandler = () => {
    //     if (webviewRef.current) webviewRef.current.goForward()
    // }
    return (
        <View style={styles.flexContainer}>
            {(canGoForward||canGoBack)&&<View style={styles.tabBarContainer}>
                {(canGoBack&&currentUrl!=donationInfo.donate_link)&&<TouchableOpacity onPress={backButtonHandler}>
                    <Text style={styles.button}>Back</Text>
                </TouchableOpacity>}
                {/* {canGoForward&&<TouchableOpacity onPress={frontButtonHandler}>
                    <Text style={styles.button}>Forward</Text>
                </TouchableOpacity>} */}
            </View>}
            <WebView
                source={{
                    uri: donationInfo.donate_link
                }}
                ref={webviewRef}
                onNavigationStateChange={navState => {
                    setCanGoBack(navState.canGoBack)
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
export default DonationScreen;