import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@apollo/client'
import { ADD_OR_REMOVE_EVENT_FROM_FAVORITE } from '../queries/AllEvents';
const EventItem = props => {

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    const [addOrRemoveEventFromFavorite] = useMutation(ADD_OR_REMOVE_EVENT_FROM_FAVORITE, {
        variables: {
            eventId: props.eventId
        }
    })
    let iconSize = Dimensions.get('screen').width * 0.048
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
                    <View style={styles.detailsContainer}>
                        <View style={styles.details}>
                            <Text style={styles.mainText} numberOfLines={1}>{props.title}</Text>
                            <View style={styles.itemData}>
                                <View style={styles.timeContainer}>
                                    <Ionicons
                                        name={Platform.OS === 'android' ? 'md-time' : 'ios-time'}
                                        size={iconSize}
                                        color="pink"
                                    />
                                    <Text style={styles.dateTime}> {props.start} - {props.end}</Text>
                                </View>
                                <View style={styles.locationContainer}>
                                    <Ionicons
                                        name={Platform.OS === 'android' ? 'md-pin' : 'ios-pin'}
                                        size={iconSize}
                                        color="pink"
                                    />
                                    <Text style={styles.dateTime} numberOfLines={1}> {props.location}</Text>
                                </View>

                            </View>
                        </View>
                        <View style={styles.lastRow}>
                            <View style={styles.favorite}>
                                {props.category ? <View style={styles.category}><Text style={styles.categoryText}>{props.category}</Text></View> : <View><Text> </Text></View>}
                                <View style={styles.circle}>
                                    <TouchableCmp onPress={async () => { await addOrRemoveEventFromFavorite() }} style={styles.actions}>
                                        <View style={styles.circle}>
                                            <Ionicons
                                                name={Platform.OS === 'android' ? 'md-heart' : 'ios-heart'}
                                                size={Dimensions.get('screen').width * 0.075}
                                                color={props.favorite ? '#fa2f88' : 'pink'}
                                            />
                                        </View>
                                    </TouchableCmp>
                                </View>
                            </View >
                        </View>
                    </View>
                </View>
            </TouchableCmp>
        </View>
    );
}
let eventHeight = Dimensions.get('screen').width * 0.335;
let lastRowSpecs = Dimensions.get('screen').width * 0.075;
let categoryPadding = Dimensions.get('screen').width * 0.0107;
let categoryFontSize = Dimensions.get('screen').width * 0.0373;
let titleFontSize = Dimensions.get('screen').width * 0.0427
let padding10 = Dimensions.get('screen').width * 0.02667

const styles = StyleSheet.create({
    eventItem: {
        paddingVertical: padding10,
        paddingHorizontal: padding10,
        height: eventHeight,
        flexDirection: "row",
        backgroundColor: 'white',
        overflow: "hidden",
        marginVertical: 5
    },
    dateContainer: {
        paddingTop: padding10,
        paddingLeft: padding10,
        marginHorizontal: padding10
    },
    timeContainer: {
        flexDirection: "row"
    },
    locationContainer: {
        flexDirection: "row",
        paddingLeft: Dimensions.get('screen').width * 0.0053
    },
    favorite: {
        flex: 1,
        flexDirection: "row",
        marginTop: 16,
        justifyContent: "space-between",
    },
    date: {
        fontSize:categoryFontSize,
        fontWeight: "bold",
    },
    itemData: {
        justifyContent: "space-between",
    },
    mainText: {
        fontSize: titleFontSize,
        fontWeight: "bold",
    },

    itemSummary: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20
    },
    dateTime:{
        fontSize:categoryFontSize
    },
    image: {
        height: '100%',
        width: '100%'
    },
    details: {
        width: '100%',
        justifyContent: "space-between",
        paddingHorizontal: padding10,
        flex: 1
    },
    detailsContainer: {
        width: '65%',
        justifyContent: 'flex-end'
    },
    imageContainer: {
        backgroundColor: 'black',
        height: '100%',
        width: '35%'
    },
    circle: {
        height: lastRowSpecs,
        width: lastRowSpecs,
        borderRadius: lastRowSpecs / 2,
        alignItems: "center",
        justifyContent: "center",
        overflow: 'hidden',
        alignSelf: 'flex-end'
    },
    category: {
        backgroundColor: "#fa2f88",
        alignItems: "center",
        justifyContent: "center",
        height: lastRowSpecs,
        alignSelf: 'flex-end'
    },
    categoryText: {
        color: "white",
        fontWeight: "bold",
        fontSize:categoryFontSize,
        paddingHorizontal: categoryPadding
    },
    lastRow: {
        flex: 1,
        paddingLeft: padding10
    }
});
export default EventItem;