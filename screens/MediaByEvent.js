import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ActivityIndicator,
  RefreshControl,
  Dimensions
} from "react-native";
import Colors from '../constants/Colors';
import EventMediaItem from '../components/EventMediaItem';
import { useQuery, NetworkStatus } from '@apollo/client';
import Events_Media_Query from '../queries/EventsMedia';
const MediaByEvent = (props) => {
  const [isData, setData] = useState(false);
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const { year } = props.route.params
  const start = new Date(year, 0);
  const end = new Date(start.getFullYear() + 1, 0);

  const { data, error, loading, refetch, networkStatus } = useQuery(Events_Media_Query, {
    fetchPolicy: 'cache-and-network',
    variables: { start, end },
    notifyOnNetworkStatusChange: true
  });
  if (error) {
    return (
      <View style={styles.error}>
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
  if (loading && !isData) {
    return (
      <View style={styles.error}>
        <ActivityIndicator size="large" color="#fa2f88" />
      </View>
    );
  }
  const eventMediaItems = [];
  if (data) {
    data.events.forEach(event => {
      const newEventMedia = {
        id: event.id,
        title: event.title,
        imgUrl: { uri: "http://186.96.211.174:1337" + event.image.url },
        content: event.content,
        numGalleries: event.galleries.length,
        numVideos:event.videos.length
      }
      eventMediaItems.push(newEventMedia);
    })
  }
  if (eventMediaItems.length === 0) {
    return (
      <SafeAreaView style={styles.error}>
        <Text style={styles.text}>Media Coming Soon</Text>
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
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
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
          data={eventMediaItems}
          renderItem={(itemData) => (
            <View style={styles.mediaItem}>
              <EventMediaItem
                title={itemData.item.title}
                imgUrl={itemData.item.imgUrl}
                action={() => {
                  props.navigation.navigate('Media Files', {
                    id: itemData.item.id,
                    numGalleries:itemData.item.numGalleries,
                    numVideos:itemData.item.numVideos,
                  });
                }}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Dimensions.get('screen').width*0.0266,
  },
  mediaItem: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingTop: 10
  },
  error: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
  text: {
    paddingHorizontal: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.primary
  },
});

export default MediaByEvent;