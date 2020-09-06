import React from 'react';
import { View, StyleSheet, Image, Text, TouchableNativeFeedback, TouchableOpacity, Platform,Dimensions } from 'react-native';

const EventMediaItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <TouchableCmp onPress={props.action} useForeground>

            <View style={{ ...styles.container, ...props.style }}>
                <Image
                    source={props.imgUrl}
                    style={{ ...styles.buttons, ...props.style }}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>PrideTT {props.title}</Text>
                </View>
            </View>
        </TouchableCmp>
    );
}
let itemHeight=Dimensions.get('screen').width * 0.667;
let textContainerHeight = Dimensions.get('screen').width * 0.133
let textSize = Dimensions.get('screen').width * 0.04

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: itemHeight,
        width: '100%',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 9,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: "center",
    },
    linearGradient: {
        borderRadius: 10
    },
    buttons: {
        height: itemHeight-textContainerHeight,
        width: '100%',
        backgroundColor: 'white'
    },
    textContainer: {
        height: textContainerHeight,
        width: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: textSize,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        color: 'black'
    }
});
export default EventMediaItem;