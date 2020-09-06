import React from "react";
import { Platform } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { MediaContext } from './Context';
import Colors from '../constants/Colors';
import Home from "../screens/Home";
import Events from "../screens/Events";
import Media from "../screens/Media";
import MediaByEvent from '../screens/MediaByEvent';
import DonationScreen from "../screens/DonationScreen";
import EventDetailsScreen from '../screens/EventDetailsScreen';
import EventRegistrationScreen from '../screens/EventRegistrationScreen';
import FavoriteEvents from '../screens/FavoriteEvents';
import MediaGalleries from '../screens/MediaGalleries';
import MediaImages from '../screens/MediaImages';
import MediaVideos from '../screens/MediaVideos';
import { from } from "apollo-boost";
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const HomeStackNavigator = createStackNavigator();
const UpcomingEventsStackNavigator = createStackNavigator();
const EventsStackNavigator = createStackNavigator();
const FavoriteEventsStackNavigator = createStackNavigator();
const MediaStackNavigator = createStackNavigator();
const MediaImagesStackNavigator = createStackNavigator();
export const MediaNavigator = props => {
  return (
    <MediaStackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0.5
          //shadowRadius:0
        }
      }}
    >
      <MediaStackNavigator.Screen
        name="Media"
        component={Media}
        options={{
          headerShown: false,
        }}
      />
      <MediaStackNavigator.Screen
        name="Events Media"
        component={MediaByEvent}
        options={{
          headerShown: true,
          headerBackTitleStyle: {
            color: Colors.primary
          },
          headerTitleStyle: {
            color: 'black'
          },
          headerTintColor: Colors.primary,
          //back
        }}
      />
      <MediaStackNavigator.Screen
        name="Media Files"
        component={MediaFilesNavigator}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerBackTitleStyle: {
            color: Colors.primary
          },
          headerTitleStyle: {
            color: 'black'
          },
          headerTintColor: Colors.primary,
        }}
      />
      {/* <MediaStackNavigator.Screen
        name="Media Galleries"
        component={MediaGalleries}
        options={{
          headerShown: true,
          headerBackTitleStyle: {
            color: Colors.primary
          },
          headerTitleStyle: {
            color: 'black'
          },
          headerTintColor: Colors.primary,
        }}
      />
      <MediaStackNavigator.Screen
        name="Media Images"
        component={MediaImages}
        options={{
          headerShown: true,
          headerBackTitleStyle: {
            color: Colors.primary
          },
          headerTitleStyle: {
            color: 'black'
          },
          headerTintColor: Colors.primary,
        }}
      /> */}
    </MediaStackNavigator.Navigator>
  )
}
export const MediaFilesNavigator = props => {
  return (
    <MediaContext.Provider value={props.route.params.id}>
      <TopTab.Navigator
        tabBarOptions={{
          labelStyle: { fontWeight: "bold" },
          indicatorStyle: { backgroundColor: Colors.primary },
          style: {
            elevation: 0.5
          }
        }}

      >
        <TopTab.Screen
          name="Gallery Stack"
          component={MediaImagesNavigator}
          options={{
            headerShown: false,
            tabBarLabel: props.route.params.numGalleries > 0 ? "Galleries (" + props.route.params.numGalleries + ")" : "Galleries"
          }}
        />
        <TopTab.Screen
          name="Media Videos"
          component={MediaVideos}
          options={{
            tabBarLabel: props.route.params.numVideos > 0 ? "Videos (" + props.route.params.numVideos + ")" : "Videos",
            headerShown: false
          }}
        />
      </TopTab.Navigator>
    </MediaContext.Provider>
  )
}
export const MediaImagesNavigator = props => {
  return (
    // <MediaContext.Provider value={props.route.params.id}>
    <MediaImagesStackNavigator.Navigator>
      <MediaImagesStackNavigator.Screen
        name="Media Galleries"
        component={MediaGalleries}
        options={{
          headerShown: false,
          headerBackTitleStyle: {
            color: Colors.primary
          },
          headerTitleStyle: {
            color: 'black'
          },
          headerTintColor: Colors.primary,
        }}
      />
      <MediaImagesStackNavigator.Screen
        name="Media Images"
        component={MediaImages}
        options={{
          headerShown: false,
          headerBackTitleStyle: {
            color: Colors.primary
          },
          headerTitleStyle: {
            color: 'black'
          },
          headerTintColor: Colors.primary,
        }}
      />
    </MediaImagesStackNavigator.Navigator>
    // </MediaContext.Provider>
  );
}
export const MediaFilesTabNavigator = props => {
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
}
export const HomeNavigator = (props) => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <HomeStackNavigator.Screen
        name="Upcoming Events"
        component={EventDetailsScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            color: 'white'
          },
          headerTintColor: 'white',

        }
        }
      />
      <HomeStackNavigator.Screen
        name="Event Registration"
        component={EventRegistrationScreen}
        options={{
          headerShown: true,
          //headerTransparent: true,
          headerTitle: 'Registration Form',
          // headerBackTitleStyle: {
          //   color: 'bla'
          // },
          //headerTintColor: 'black',

        }
        }
      />
    </HomeStackNavigator.Navigator>
  );
};
export const EventsNavigator = (props) => {
  return (
    <EventsStackNavigator.Navigator
      screenOptions={{ headerShown: false }}
    >
      <EventsStackNavigator.Screen
        name="Events"
        component={Events}
        options={{
          headerShown: false,
          //headerTransparent:true,
          headerBackTitleStyle: {
            color: 'black'
          },
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: 'white'
          }
          //headerTransparent: true,
        }}
      />
      <EventsStackNavigator.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            color: 'white'
          },
          headerTintColor: 'white',

        }
        }
      />
    </EventsStackNavigator.Navigator>
  );
};
export const FavoriteEventsNavigator = (props) => {
  return (
    <FavoriteEventsStackNavigator.Navigator
      screenOptions={{ headerShown: false }}
    >
      <FavoriteEventsStackNavigator.Screen
        name="Saved Events"
        component={FavoriteEvents}
        options={{
          headerShown: false,
          //headerTransparent:true,
          headerBackTitleStyle: {
            color: 'black'
          },
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: 'white'
          }
          //headerTransparent: true,
        }}
      />
      <FavoriteEventsStackNavigator.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerBackTitleVisible: false,
          headerBackTitleStyle: {
            color: 'white'
          },
          headerTintColor: 'white',

        }
        }
      />
    </FavoriteEventsStackNavigator.Navigator>
  );
};
export const UpcomingEventsNavigator = (props) => {
  return (
    <UpcomingEventsStackNavigator.Navigator>
      <UpcomingEventsStackNavigator.Screen
        name="Event Details"
        component={EventDetailsScreen}
        options={{ headerShown: false, headerBackTitleVisible: false }}
      />
      {/* <EventsStackNavigator.Screen name="EventDetail" component={EventDetails} /> */}
    </UpcomingEventsStackNavigator.Navigator>
  );
};




export const HomeTabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconType;
          if (route.name === "Home") {
            IconType = MaterialIcons;
            iconName = "home";
          } else if (route.name === "Events") {
            IconType = Ionicons;
            iconName = Platform.OS === "android" ? "md-calendar" : "ios-calendar";
          } else if (route.name === "Saved Events") {
            IconType = Ionicons;
            iconName = Platform.OS === "android" ? "md-heart" : "ios-heart";
          } else if (route.name === "Contribute") {
            IconType = FontAwesome5;
            iconName = "hand-holding";
          } else if (route.name === "Media") {
            IconType = Ionicons;
            iconName = Platform.OS === "android" ? "md-aperture" : "ios-aperture";
          }
          return <IconType name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        tabStyle: {
          backgroundColor: 'white'
        },
        activeTintColor: "#fa2f88",
        inactiveTintColor: "black",
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} listeners={({ navigation, route }) => ({ tabPress: e => { if (route.state && route.state.routeNames.length > 0) { navigation.navigate('Home') } } })} />
      <Tab.Screen name="Events" component={EventsNavigator} />
      <Tab.Screen name="Saved Events" component={FavoriteEventsNavigator} />
      <Tab.Screen name="Media" component={MediaNavigator} />
      <Tab.Screen name="Contribute" component={DonationScreen} />
    </Tab.Navigator>
  );
};