import React, { useRef } from "react";
import { useQuery } from '@apollo/client';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
} from "react-native";
import PrideTTEvent from '../models/event';
import moment from 'moment';
import EventItem from "../components/EventItem";
import FAVORITE_EVENTS_QUERY from "../queries/AllEvents"

const FavoriteEvents = (props) => {
    const today = useRef(new Date()).current;
    const { data, error, loading } = useQuery(FAVORITE_EVENTS_QUERY, {
        fetchPolicy: 'cache-and-network',
        variables: { today: today },
        notifyOnNetworkStatusChange: true
    });
    console.log(loading);
    const pridettEvents = [];
    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Something went wrong!</Text>
                <Text style={styles.message}>Check your internet connection.</Text>
            </View>
        );
    }
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#fa2f88" />
            </View>
        );
    }
    if (data == undefined) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>No events have been favorited</Text>
            </View>
        );
    }
    data.events.forEach(event => {
        let end;
        let new_date;
        if (pridettEvents.length === 0) {
            new_date = true;
        } else if (pridettEvents[pridettEvents.length - 1].readableDate !== moment(event.start_time).format('MMMM Do YYYY')) {
            new_date = true;
        } else {
            new_date = false;
        }
        if (event.end_time) {
            end = new Date(event.end_time)
        } else {
            end = new Date(event.start_time);
            end.setHours(end.getHours() + 1);
        }
        const now = new Date();
        let category;
        if (event.category) {
            category = event.category.name
        } else {
            category = null
        }
        if ((event.favorite == true)) {
            pridettEvents.push(new PrideTTEvent(event.id, event.title, event.content, category, event.location, event.favorite, event.image.url, event.form, event.start_time, end, new_date));
            
        }
    });
    
    if (pridettEvents.length == 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>No events have been favorited</Text>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={false} barStyle="dark-content"/>
            <FlatList
                style={styles.list}
                data={pridettEvents}
                renderItem={(itemData) => (
                    <View>
                        <EventItem
                            eventId={itemData.item.id}
                            newDate={itemData.item.new_date}
                            new_date={itemData.item.readableDate}
                            title={itemData.item.title}
                            start={itemData.item.readableStart}
                            end={itemData.item.readableEnd}
                            imgUrl={itemData.item.imgUrl}
                            category={itemData.item.category}
                            location={itemData.item.location}
                            favorite={itemData.item.favorite}
                            onViewDetail={() => {
                                props.navigation.navigate('EventDetails',
                                    {
                                        id: itemData.item.id,
                                        title: itemData.item.title,
                                        start: itemData.item.readableStart,
                                        end: itemData.item.readableEnd,
                                        time: itemData.item.readableEventDetailsDate,
                                        imgUrl: itemData.item.imgUrl,
                                        category: itemData.item.category,
                                        location: itemData.item.location,
                                        content: itemData.item.content,
                                        registrationUrl: itemData.item.registrationUrl,
                                        favorite: itemData.item.favorite
                                    }
                                );
                            }}
                        />
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
};
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 24;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    message: {
        color: '#fa2f88',
        fontWeight: "bold"
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
        backgroundColor: 'white'
    },
});
export default FavoriteEvents;