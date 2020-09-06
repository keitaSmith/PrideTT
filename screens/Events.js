import React, { useRef, useState } from "react";
import { useQuery, NetworkStatus } from '@apollo/client';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  SafeAreaView,
  
} from "react-native";
import PrideTTEvent from '../models/event';
import moment from 'moment';
import EventItem from "../components/EventItem";
import All_Events_Query from "../queries/AllEvents";
import Colors from "../constants/Colors";

const Events = (props) => {
  const [isData, setData] = useState(false)
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const today = useRef(new Date()).current;
  const { data, error, loading, refetch, networkStatus } = useQuery(All_Events_Query, {
    fetchPolicy: 'cache-and-network',
    variables: { today: today },
    notifyOnNetworkStatusChange: true
  });
  const pridettEvents = [];
  if (loading && !isData) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fa2f88" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Something went wrong!</Text>
        <Text style={styles.text}>Check your internet Connection</Text>
        <TouchableCmp
          onPress={() => {
            if (isData) {
              setData(false)
            }
            refetch()
          }}
        >
          <View style={styles.refreshButton}>
            <Text style={styles.refreshText}>Refresh</Text>
          </View>
        </TouchableCmp>
      </View>
    );
  }
  if (data) {
    data.events.forEach(event => {
      let end;
      let new_date
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
      pridettEvents.push(new PrideTTEvent(event.id, event.title, event.content, category, event.location, event.favorite, event.image.url, event.form, event.start_time, end, new_date));
    });
  }
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent={true} backgroundColor={backgroundColor}{...props} />
    </View>
  );
  if (pridettEvents.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>There are no upcoming events at this time, most events are hosted around the end of June till the end of July</Text>
        <TouchableCmp
          onPress={() => {
            if (isData) {
              setData(false)
            }
            refetch()

          }}
        >
          <View style={styles.refreshButton}>
            <Text style={styles.refreshText}>Refresh</Text>
          </View>
        </TouchableCmp>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} barStyle="dark-content"/>
      <FlatList
        automaticallyAdjustContentInsets={false}
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={() => {
              setData(true)
              refetch()
            }}
            enabled
            tintColor={Colors.primary}
            colors={Colors.rainbow}
          />
        }
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


export const EventsScreenOptions = (navData) => {
  return {
    headerTitle: "Events",
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statusBar: {
    backgroundColor: 'white',
  },
  text: {
    paddingHorizontal: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.primary
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

export default Events;
