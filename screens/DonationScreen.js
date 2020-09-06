import React, { useState, useRef } from 'react'
import { WebView } from 'react-native-webview';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import DonationInfo from '../queries/Donate';

const DonationScreen = props => {
    const webviewRef = useRef(null)
    const donationInfo = DonationInfo();
    const [canGoBack, setCanGoBack] = useState(false)
    const [isLoading, setLoading] = useState(false)
    //const [canGoForward, setCanGoForward] = useState(false)
    const [currentUrl, setCurrentUrl] = useState('')
    // if (isLoading) {
    //     return (
    //       <View style={styles.container}>
    //         <ActivityIndicator size="large" color="#fa2f88" />
    //       </View>
    //     );
    //   }
    const backButtonHandler = () => {
        if (webviewRef.current) webviewRef.current.goBack()
    }

    //  const frontButtonHandler = () => {
    //     if (webviewRef.current) webviewRef.current.goForward()
    //  }
    return (
        <SafeAreaView style={styles.flexContainer}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="rgba(0, 0, 0, 0.5)" translucent={false} />
            {(canGoBack) && <View>
                {(canGoBack && currentUrl != donationInfo.donate_link) && <TouchableOpacity onPress={backButtonHandler} style={styles.tabBarContainer}>
                    <Text style={styles.button}>Back</Text>
                </TouchableOpacity>}
                {/* {canGoForward&&<TouchableOpacity onPress={frontButtonHandler}>
                    <Text style={styles.button}>Forward</Text>
                </TouchableOpacity>}  */}
            </View>}
            <WebView
                source={{
                    uri: donationInfo.donate_link
                }}
                ref={webviewRef}
                onLoadStart={() => {
                    setLoading(true);
                }}
                onLoad={() => {
                    if (isLoading)
                        setLoading(false)
                }}
                onLoadEnd={() => {
                    if (isLoading)
                        setLoading(false)
                }}
                onNavigationStateChange={navState => {
                    setCanGoBack(navState.canGoBack)
                    //setCanGoForward(navState.canGoForward)
                    setCurrentUrl(navState.url)
                }}
            />
            {isLoading && <View style={styles.container}>
                <ActivityIndicator size="large" color="#fa2f88" />
            </View>}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        //top:(Dimensions.get('screen').height)/2,
        //left:(Dimensions.get('screen').width/2)-23,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute"
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