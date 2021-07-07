import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Platform,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  RefreshControl,
  StatusBar,
  Dimensions
} from "react-native";
import MediaItem from '../components/MediaItem';
import { useQuery, NetworkStatus } from '@apollo/client';
import Featured_Images_Media_Query from '../queries/FeaturedImagesMedia';
import Colors from '../constants/Colors'
import db from '../constants/DBUrl'
const Media = (props) => {
  const [isData, setData] = useState(false)
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const { data, error, loading, refetch, networkStatus } = useQuery(Featured_Images_Media_Query, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  });

  if (loading && !isData) {
    return (
      <View style={styles.error}>
        <ActivityIndicator size="large" color="#fa2f88" />
      </View>
    );
  }
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
  const featuredImages = [];
  if (data) {
    data.galleries.forEach(gallery => {
      gallery.images.forEach(image => {
        const newPrideYear = {
          id: image.id,
          title: image.name,
          imgUrl: { uri: db.url + image.url },
        }
        featuredImages.push(newPrideYear)
      });
      featuredImages.sort((a, b) => { return b.title - a.title });
    })
  };
  return (
    < SafeAreaView style={styles.container}>
      <StatusBar translucent={false} barStyle="dark-content" />
      <FlatList
      style={styles.list}
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
        data={featuredImages}
        renderItem={(itemData) => (
          <View style={styles.mediaItem}>
            <MediaItem
              title={itemData.item.title}
              imgUrl={itemData.item.imgUrl}
              action={() => {
                props.navigation.navigate('Events Media', {
                  year: itemData.item.title
                })
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView >
  );
};


const styles = StyleSheet.create({
  container: {
    
    flex: 1,

  },
  error: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  mediaItem: {
    width:'100%',
    paddingHorizontal: Dimensions.get('screen').width*0.0266,
    paddingVertical:5
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
  list:{
    width:'100%'
  }
});

export default Media;
