import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView, StatusBar, SafeAreaView,Dimensions } from "react-native";
import moment from 'moment';
import { useQuery } from '@apollo/client';
import RecentEvents from "../components/RecentEvents";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import TimedSlideshow from '../SlideShow';
import Recent_Events_Query from "../queries/AllEvents";
import PrideTTEvent from '../models/event';
import FeaturedImages from '../queries/FeaturedImages';
const Home = (props) => {
  const images = FeaturedImages();
  var items;
  if (images == "error" || images == "loading") {
    items = [
      {
        uri: require("../assets/sliderImages/slider1.jpg"),
      },
      {
        uri: require("../assets/sliderImages/slider2.jpg"),
      },
      {
        uri: require("../assets/sliderImages/slider3.jpg"),
      },
      {
        uri: require("../assets/sliderImages/slider4.jpg")
      }
    ]
  } else {
    items = images;
  }
  const today = useRef(new Date()).current;
  const { data, error, loading, refetch } = useQuery(Recent_Events_Query, {
    fetchPolicy: 'cache-and-network',
    variables: {
      today: today,
    },
    notifyOnNetworkStatusChange: true,
  });
  const recentEvents = [];
  let numEvents = 0;
  if (data) {
    data.events.forEach(event => {
      let end;
      let new_date
      if (recentEvents.length === 0) {
        new_date = true;
      } else if (recentEvents[recentEvents.length - 1].readableDate !== moment(event.start_time).format('MMMM Do YYYY')) {
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
      if (numEvents < 5) {
        recentEvents.push(new PrideTTEvent(event.id, event.title, event.content, category, event.location, event.favorite, event.image.url, event.form, event.start_time, end, new_date));
        numEvents++
      }

    }
    )
  };
  useEffect(() => {
    const willFocusSub = props.navigation.addListener('focus', () => { refetch() });
    return willFocusSub
  }, [props.navigation,refetch])
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="white" translucent={true} />
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require("../assets/logos/pridettLogo.png")}
            style={styles.logo}
            resizeMode={"cover"}
          />
        </View>
        <LinearGradient colors={Colors.rainbow} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <View style={styles.border} />
        </LinearGradient>
        <View style={styles.slider}>
          <TimedSlideshow
            items={items}
            footerStyle={{ backgroundColor: 'transparent' }}
            showProgressBar={false}
            removeArrow={true}
            removeClose={true}
          />
        </View>
        <LinearGradient colors={Colors.rainbow} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <View style={styles.border} />
        </LinearGradient>
        <View style={styles.recentEventsContainer}>
          <Text style={styles.recentEventsTitle}>Upcoming Events</Text>
          <RecentEvents
            navigation={props.navigation}
            error={error}
            loading={loading}
            recentEvents={recentEvents}
            refetch={refetch}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
let logoHeight = Dimensions.get('screen').width * 0.65;
let fontSize =Dimensions.get('screen').width * 0.0533;
let eventsPadding=Dimensions.get('screen').width * 0.04;;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  recentEventsContainer: {
    paddingTop: eventsPadding,
  },
  recentEventsTitle: {
    fontWeight: "bold",
    color: Colors.primary,
    fontSize: fontSize,
    paddingTop: 10,
    paddingLeft: 20,
  },
  border: {
    height: 3,
  },
  line: {
    marginTop: 10,
  },
  rainbowContainer: {
    flexDirection: "row",
  },
  header: {
    height: logoHeight-50,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 30,
  },
  logo:{
     height: logoHeight, 
     width: logoHeight, 
     paddingRight: 30 
  },
  slider:{
    height:logoHeight
  }
});

export default Home;
