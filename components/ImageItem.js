import React from 'react';
import { View, Dimensions, Image, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';

const ImageItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <TouchableCmp onPress={props.action}>          
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri:props.imgSrc}} />
                </View>          
        </TouchableCmp>
    )
}
let imageWidth=Dimensions.get('screen').width / 3;

const imageHeight = imageWidth;
const styles = StyleSheet.create({
    imageContainer: {
        paddingHorizontal: 0.5,
        paddingBottom: 1,
        height: imageHeight,
        width: imageWidth,

    },
    image: {
        height: '100%',
        width: '100%'
    },
});
export default ImageItem;