import React from 'react';
import { View, StyleSheet, Image,TouchableNativeFeedback,TouchableOpacity,Platform } from 'react-native';

const CustomIcon = props => {
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
                </View>
            </TouchableCmp>
        );
    }
    const styles = StyleSheet.create({
        container: {
            height: 60,
            width: 60,
            backgroundColor: 'white',
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 9,
            borderRadius: 10,
            overflow: 'hidden',
            justifyContent: "center",
            alignItems: "center",
        },
        buttons: {
            height: 60,
            width: 60,
        },
    });
    export default CustomIcon;