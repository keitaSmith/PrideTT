import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const EventItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View>
            {props.newDate ? (<View style={styles.dateContainer}>
                <Text style={styles.date}>{props.new_date}</Text>
            </View>) : null}
            <TouchableCmp onPress={props.onViewDetail}>
                <View style={styles.eventItem}>

                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={props.imgUrl} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.mainText} numberOfLines={1}>{props.title}</Text>
                        <View style={styles.itemData}>
                            <View style={styles.timeContainer}>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-time' : 'ios-time'}
                                    size={18}
                                    color="pink"
                                />
                                <Text style={styles.dateTime}> {props.start} - {props.end}</Text>
                            </View>
                            <View style={styles.locationContainer}>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-pin' : 'ios-pin'}
                                    size={18}
                                    color="pink"
                                />
                                <Text style={styles.dateTime} numberOfLines={1}> {props.location}</Text>
                            </View>

                        </View>
                        
                        <View style={styles.favorite}>
                            {props.category? <View style={styles.category}><Text style={styles.categoryText}>{props.category}</Text></View>:<View><Text> </Text></View>}
                            {/* <View style={styles.circle}>
                             <TouchableCmp onPress={props.onFavoriteEvent} style={styles.actions}>
                                <View style={styles.circle}>
                                    <Ionicons
                                        name={Platform.OS === 'android' ? 'md-heart' : 'ios-heart'}
                                        size={28}
                                        color={props.favorite?'red':'pink'}
                                    />
                                </View>
                            </TouchableCmp> 
                            </View> */}
                        </View >
                    
                    </View>
                </View>
            </TouchableCmp>
        </View>
    );
}
const styles = StyleSheet.create({
    eventItem: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 125,
        flexDirection: "row",
        // overflow: 'hidden',
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 8,
        // elevation: 5,
        //borderRadius: 10,
        backgroundColor: 'white',
        overflow: "hidden",
        marginVertical: 5
    },
    dateContainer: {
        paddingTop: 10,
        paddingLeft: 10,
        marginHorizontal: 10
    },
    timeContainer: {
        flexDirection: "row"
    },
    locationContainer: {
        flexDirection: "row",
        paddingLeft:2
    },
    favorite: {
        flexDirection: "row",
        //paddingRight: 40,
        marginTop:16,
        justifyContent: "space-between",
        
    },
    date: {
        fontWeight:"bold",
        justifyContent: "center"
    },
    itemData: {
        justifyContent: "space-between",
    },
    quantity: {
        //fontFamily: 'open-sans',
        //color: Colors.accent,
        fontSize: 16,
        //paddingHorizontal: 10
    },
    mainText: {
        //paddingRight: 10,
        fontSize: 16,
        fontWeight: "bold",
    },

    itemSummary: {
        //width:'65%',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20
    },

    image: {
        height: '100%',
        width: '100%'
    },
    details: {
        width: '65%',
        //height: '100%',
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    imageContainer: {
        backgroundColor: 'black',
        height: '100%',
        width: '35%'
    },
    circle: {
        height: 36,
        width: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        overflow: 'hidden',
        //backgroundColor:"#fa2f88"
    },
    category: {
        //alignSelf: "flex-end",
        backgroundColor: "#fa2f88",
        height:28

        //justifyContent:'flex-end'
    },
    categoryText: {
        color: "white",
        fontWeight: "bold",
        padding: 4
    },
    lastRow:{
        justifyContent:'flex-start'
    }
});
export default EventItem;