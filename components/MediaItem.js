import React from 'react';
import { View, StyleSheet, Image, Text, TouchableNativeFeedback, TouchableOpacity, Platform, Dimensions } from 'react-native';

const MediaItem = props => {
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
let itemHeight = Dimensions.get('screen').width * 0.667;

const styles = StyleSheet.create({
    container: {
        height: itemHeight,
        width: '100%',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 8,
        elevation: 9,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: "center",
    },
    linearGradient: {
        borderRadius: 10
    },
    buttons: {
        height: itemHeight,
        width: '100%',
        backgroundColor: 'white'
    },
    textContainer: {
        position: "absolute",
        height: Dimensions.get('screen').width*0.1066,
        width: '100%',
        backgroundColor: "rgba(0,0,0,0.4)",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: Dimensions.get('screen').width*0.0533,
        color: 'white'
    }
});
export default MediaItem;