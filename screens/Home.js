import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  StatusBar
} from "react-native";
import RecentEvents from "../components/RecentEvents";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import TimedSlideshow from '../SlideShow';
const Home = (props) => {
  const items = [
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

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/logos/pridettLogo.png")}
          style={{ height: 250, width: 250, paddingRight: 30 }}
          resizeMode={"cover"}
        />
      </View>
      <LinearGradient
        colors={Colors.rainbow}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.border} />
      </LinearGradient>
      <ScrollView>
        <View style={{ height: 200 }}>
          <TimedSlideshow
            items={items}
            footerStyle={{ backgroundColor: 'transparent' }}
            showProgressBar={false}
            removeArrow={true}
            removeClose={true}
          />
        </View>
        {/* row 1 icons
        <View style={styles.icons}>
          <View>
            <BoxShadow setting={hotline}>
              <CustomIcon
                style={styles.hotline}
                imgUrl={require("../assets/ButtonIcons/Hotline.png")}
              ></CustomIcon>
              <Text style={styles.labels}>Hotline</Text>
            </BoxShadow>
          </View>
          <View>
            <BoxShadow setting={allies}>
              <CustomIcon
                style={styles.allies}
                imgUrl={require("../assets/ButtonIcons/Allies.png")}
                action={() => props.navigation.navigate("Allies")}
              ></CustomIcon>
              <Text style={styles.labels}>Allies</Text>
            </BoxShadow>
          </View>
          <View>
            <BoxShadow setting={updates}>
              <CustomIcon
                style={styles.updates}
                imgUrl={require("../assets/ButtonIcons/Updates.png")}
                action={() => props.navigation.navigate("Updates")}
              ></CustomIcon>
              <Text style={styles.labels}>Updates</Text>
            </BoxShadow>
          </View>
        </View>
        {/* row 2 icons
        <View style={styles.icons}>
          <View>
            <BoxShadow setting={wellness}>
              <CustomIcon
                style={styles.wellness}
                imgUrl={require("../assets/ButtonIcons/Wellness.png")}
                action={() => props.navigation.navigate("Wellness")}
              ></CustomIcon>
              <Text style={styles.labels}>Wellness</Text>
            </BoxShadow>
          </View>
          <View>
            <BoxShadow setting={media}>
              <CustomIcon
                style={styles.media}
                imgUrl={require("../assets/ButtonIcons/Media.png")}
                action={() => props.navigation.navigate("Media")}
              ></CustomIcon>
              <Text style={styles.labels}>Media</Text>
            </BoxShadow>
          </View>
          <View>
            <BoxShadow setting={events}>
              <CustomIcon
                style={styles.events}
                imgUrl={require("../assets/ButtonIcons/Events.png")}
                action={() => props.navigation.navigate("Events")}
              ></CustomIcon>
              <Text style={styles.labels}>Events</Text>
            </BoxShadow>
          </View>
        </View> */}

        <LinearGradient colors={Colors.rainbow} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <View style={styles.border} />
            </LinearGradient>
        <View style={styles.recentEventsContainer}>
          <Text style={styles.recentEventsTitle}>Upcoming Events</Text>
          <RecentEvents navigation={props.navigation} />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //paddingTop: 20,
    backgroundColor: "white",
    //zIndex: 0
  },
  icons: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labels: {
    paddingTop: 3,
    alignSelf: "center",
  },
  buttons: {
    height: 60,
    width: 60,
  },
  recentEventsContainer: {
    paddingTop: 15,
    //marginHorizontal: 20,
  },
  recentEventsTitle: {
    fontWeight: "bold",
    fontSize: 20,
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
  iconsTop: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    flexDirection: "row",

    justifyContent: "space-evenly",
  },
  iconsMiddle: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconsBottom: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  header: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 30,
  },
});
const hotline = {
  width: 60,
  height: 60,
  color: "#FF0000",
  border: 2,
  radius: 10,
  opacity: 0.2,
  x: 0,
  y: 3,
  style: { marginVertical: 5 },
};
const allies = {
  width: 60,
  height: 60,
  color: "#FF8000",
  border: 2,
  radius: 10,
  opacity: 0.2,
  x: 0,
  y: 3,
  style: { marginVertical: 5 },
};
const media = {
  width: 60,
  height: 60,
  color: "#0000FF",
  border: 2,
  radius: 10,
  opacity: 0.2,
  x: 0,
  y: 3,
  style: { marginVertical: 5 },
};
const updates = {
  width: 60,
  height: 60,
  color: "#FFFF00",
  border: 2,
  radius: 10,
  opacity: 0.2,
  x: 0,
  y: 3,
  style: { marginVertical: 5 },
};
const wellness = {
  width: 60,
  height: 60,
  color: "#00FF00",
  border: 2,
  radius: 10,
  opacity: 0.2,
  x: 0,
  y: 3,
  style: { marginVertical: 5 },
};
const events = {
  width: 60,
  height: 60,
  color: "#8000FF",
  border: 2,
  radius: 10,
  opacity: 0.2,
  x: 0,
  y: 3,
  style: { marginVertical: 5 },
};
export default Home;
