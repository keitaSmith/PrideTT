import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useQuery } from '@apollo/client';
import Event_Galleries_Query from '../queries/EventGalleries';
import GalleryItem from '../components/GalleryItem';
import { MediaContext } from '../navigation/Context';
import Colors from '../constants/Colors';

const MediaGalleries = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const id = React.useContext(MediaContext);//passing data from one type of navigator to another


  const { data, error, loading, } = useQuery(Event_Galleries_Query, {
    fetchPolicy: 'cache-and-network',
    variables: { id: id },

  });
  if (error) {
    return (
      <View style={styles.error}>
        <Text style={styles.text}>Something went wrong!</Text>
        <Text style={styles.text}>Check your internet Connection</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View style={styles.error}>
        <ActivityIndicator size="large" color="#fa2f88" />
      </View>
    );
  }
  const mediaGalleries = [];
  if (data) {
    data.events.forEach(event => event.galleries.forEach(gallery => mediaGalleries.push(gallery)))
  }

  if (mediaGalleries.length == 0) {
    return (<View style={styles.errorText}><Text style={styles.text}>There are no galleries for this event</Text></View>)
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.list}
        numColumns={2}                  // set number of columns 
        columnWrapperStyle={styles.row}  // space them out evenly
        data={mediaGalleries}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) =>
          <GalleryItem
            imgSrc={itemData.item.feature.url}
            galleryTitle={itemData.item.title}
            galleryCredits={itemData.item.credits}
            numImages={itemData.item.images.length}
            action={() => {

              props.navigation.navigate('Media Images', {
                id: itemData.item.id,
                title: itemData.item.title,
                images: itemData.item.images
              });
            }}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  row: {
    flex: 1,
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

export default MediaGalleries;