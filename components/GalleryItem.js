import React from 'react';
import { View, Dimensions, Text, Image, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';
import Colors from '../constants/Colors';
const GalleryItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <TouchableCmp onPress={props.action}>
            <View style={styles.galleryItemContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: 'http://186.96.211.174:1337' + props.imgSrc }} />
                </View>
                <View>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>{props.galleryTitle}</Text>
                    <Text style={styles.credits} numberOfLines={2} ellipsizeMode="tail">Credits: {props.galleryCredits}</Text>
                    <Text style={styles.numImages}>{props.numImages} photos</Text>
                </View>
            </View>
        </TouchableCmp>
    )
}
let imageWidth=Dimensions.get('screen').width/2;
let galleryTitle = Dimensions.get('screen').width * 0.04
let textSize = Dimensions.get('screen').width * 0.0373
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
    galleryItemContainer: {
        width: imageWidth
    },
    title: {
        paddingHorizontal: 5,
        color: Colors.primary,
        fontWeight: 'bold',
        paddingBottom: 10,
        fontSize: galleryTitle
    },
    credits: {
        fontSize:textSize,
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    numImages: {
        fontSize:textSize,
        fontWeight: 'bold',
        paddingHorizontal: 10
    }
});
export default GalleryItem;