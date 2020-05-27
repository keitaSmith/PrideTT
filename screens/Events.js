import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import AllEvents from '../queries/events';

const Events = props => {
    const allEvents = AllEvents();
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
        
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={allEvents}
                    renderItem={itemData => (
                        <View style={styles.event}>
                            <Text>{itemData.item.id}</Text>
                            <Text>{itemData.item.title}</Text>
                            <Text>{itemData.item.content}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical:30,
        marginHorizontal:20,
        justifyContent: "center",
        alignItems: "center",
    },
    event:{
        marginVertical:10
    }
})
export default Events;
