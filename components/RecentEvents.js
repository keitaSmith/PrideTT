import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Platform, TouchableNativeFeedback, TouchableOpacity, Dimensions } from 'react-native';
import CustomIcon from '../components/CustomIcon';
import Colors from '../constants/Colors';

const RecentEvents = (props) => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    if (props.error) {
        return (
            <View>
                <Text style={styles.text}>Something went wrong! Check your internet connection.</Text>
                <TouchableCmp
                    onPress={() => {
                        props.refetch()
                    }}
                >
                    <View style={styles.refreshButton}>
                        <Text style={styles.refreshText}>Refresh</Text>
                    </View>
                </TouchableCmp>
            </View>
        );
    }
    if (props.loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }
    if (props.recentEvents.length === 0) {
        return (
            <View>
                <Text style={styles.text}>There are no upcoming events at this time, most events are hosted around the end of June till the end of July</Text>
                <TouchableCmp
                    onPress={() => {
                        props.refetch()
                    }}
                >
                    <View style={styles.refreshButton}>
                        <Text style={styles.refreshText}>Refresh</Text>
                    </View>
                </TouchableCmp>
            </View>
        );
    }
    return (
        <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={props.loading}
                    onRefresh={props.refetch}
                    tintColor={Colors.primary}
                />
            }
            data={props.recentEvents}
            style={styles.eventsListContainer}
            horizontal={true}
            renderItem={itemData => (

                <View style={styles.event}>
                    <CustomIcon
                        style={styles.eventImage}
                        imgUrl={itemData.item.imgUrl}
                        action={() => {
                            props.navigation.navigate("Upcoming Events",
                                {
                                    id: itemData.item.id,
                                    title: itemData.item.title,
                                    start: itemData.item.readableStart,
                                    end: itemData.item.readableEnd,
                                    time: itemData.item.readableEventDetailsDate,
                                    favorite: itemData.item.favorite,
                                    imgUrl: itemData.item.imgUrl,
                                    category: itemData.item.category,
                                    location: itemData.item.location,
                                    content: itemData.item.content,
                                    registrationUrl: itemData.item.registrationUrl
                                }
                            )
                        }}></CustomIcon>
                    <Text style={styles.eventTitle}>{itemData.item.title}</Text>
                </View>
            )}
            keyExtractor={item => item.id}
        />
    )
}
let imageHeight;
let imageWidth;
let fontSize;
let eventsPadding;
if (Dimensions.get('screen').width > 500){
    imageHeight = 200,
    imageWidth = 270,
    fontSize = 25
    eventsPadding = 40
}else{
    imageHeight = 100
    imageWidth =150
    fontSize = 14
    eventsPadding = 10
}
    const styles = StyleSheet.create({
        eventsListContainer: {
            paddingTop: eventsPadding,
            paddingLeft: 20,
        },
        eventImage: {
            height: imageHeight,
            width: imageWidth
        },
        event: {
            width: imageWidth+20,
            marginRight: 20,
            paddingBottom: 10
        },
        eventTitle: {
            paddingTop: 10,
            fontSize:fontSize
        },
        container: {
            paddingHorizontal: 5,
            paddingTop: 50,
            alignItems: "center",
            justifyContent: "center"
        },
        text: {
            paddingTop: 20,
            fontWeight: "bold",
            paddingHorizontal: 20,
        },
        refreshButton: {
            margin: 20,
            backgroundColor: Colors.primary,
            borderRadius: 5
        },
        refreshText: {
            color: 'white',
            padding: 10,
            fontWeight: 'bold',
            textAlign: "center"
        },
    });
export default RecentEvents;