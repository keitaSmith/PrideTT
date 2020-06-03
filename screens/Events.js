import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView, Dimensions } from 'react-native';
import AllEvents from '../queries/AllEvents';
import PrideTTLogo from '../assets/svgs/PrideTTLogo.svg';
import EventItem from '../components/EventItem';
const Events = props => {
    const allEvents = AllEvents();
    const [newDate, setNewDate] = useState('');

    const isNewDate = useCallback(props => {
        if (props.date != newDate)
            setNewDate(false);
        else setNewDate(true);

    },
        [newDate],
    );

    if (allEvents === "error") {
        return (
            <View style={styles.container}>
                <Text>Something went wrong!</Text>
            </View>
        );
    }
    if (allEvents === "loading") {
        return (
            <View style={styles.container}>
                <Text>Loading....</Text>
            </View>
        );
    }
    return (
        // <View style={styles.container}>
        //     <PrideTTLogo 
        //     height={0.35*Dimensions.get('window').height}
        //     width={0.35*Dimensions.get('window').width}
        //     />
        // </View>
        <SafeAreaView style={styles.container}>
            <FlatList
                data={allEvents}
                renderItem={itemData => (
                    <View>
                        <EventItem
                            newDate={itemData.item.new_date}
                            new_date={itemData.item.readableDate}
                            title={itemData.item.title}
                            start={itemData.item.readableStart}
                            end={itemData.item.readableEnd}
                            imgUrl={itemData.item.imgUrl}
                        />
                    </View>

                )}
                
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}
export const EventsScreenOptions = navData => {
    return {
        headerTitle: 'Events',
        //header:null
        // headerRight: () => (
        //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //         <Item
        //             title='Cart'
        //             iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        //             onPress={() => {
        //                 navData.navigation.navigate('Cart')
        //             }} />
        //     </HeaderButtons>
        // )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    event: {
        marginVertical: 10
    }
})
export default Events;
