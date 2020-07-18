import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Recent from '../queries/RecentEvents';
import CustomIcon from '../components/CustomIcon';
const RecentEvents = props => {
    const recentEvents = Recent();
    if (recentEvents === "error") {
        return (
            <View style={styles.container}>
                <Text>Something went wrong!</Text>
            </View>
        );
    }
    if (recentEvents === "loading") {
        return (
            <View style={styles.container}>
                <Text>Loading....</Text>
            </View>
        );
    }

    return (
            <FlatList
                data={recentEvents}
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
                                time:itemData.item.readableEventDetailsDate,
                                imgUrl: itemData.item.imgUrl,
                                category: itemData.item.category,
                                location: itemData.item.location,
                                content: itemData.item.content,
                                registrationUrl:itemData.item.registrationUrl
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
const styles = StyleSheet.create({
    eventsListContainer: {
        paddingTop: 10,
        paddingLeft: 20,
    },
    eventImage: {
        height: 100,
        width: 150
    },
    event: {
        width: 170,
        marginRight:20,
        paddingBottom:10
        //paddingRight: 20
        //paddingHorizontal:10
    },
    eventTitle: {
        paddingTop: 10
    },

});
export default RecentEvents;