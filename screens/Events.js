import React, { useState, useCallback } from "react";
import { useQuery,useMutation } from '@apollo/react-hooks';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  StatusBar
} from "react-native";
import AllEvents from "../queries/AllEvents";
import EventItem from "../components/EventItem";
const Events = (props) => {

  const allEvents = AllEvents();
  // const[toggleFavoriteEvent]=useMutation(TOGGLE_FAVORITE_EVENT,{
  //     variables:{event_id:props.id}
  //   })
  // };
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
      <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "rgba(0, 0, 0, 0.5)" translucent = {true}/>
      <FlatList
        style={styles.list}
        data={allEvents}
        renderItem={(itemData) => (
          <View>
            <EventItem
              newDate={itemData.item.new_date}
              new_date={itemData.item.readableDate}
              title={itemData.item.title}
              start={itemData.item.readableStart}
              end={itemData.item.readableEnd}
              imgUrl={itemData.item.imgUrl}
              category={itemData.item.category}
              location={itemData.item.location}
              //favorite={itemData.item.favorite}
              // onFavoriteEvent={async()=>{
              //     await useMutation(TOGGLE_FAVORITE_EVENT,{
              //       variables:{event_id:itemData.item.id}
              //   })
              // }}
              onViewDetail={() => {
                props.navigation.navigate('EventDetails',
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
export const EventsScreenOptions = (navData) => {
  return {
    headerTitle: "Events",
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
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:'white'
  },
  event: {
    marginVertical: 10,
  },
  list:{
    //paddingTop:100
  }
});
export default Events;
