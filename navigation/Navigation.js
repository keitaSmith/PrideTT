import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Events from "../screens/Events";
import Allies from "../screens/Allies";
import Media from "../screens/Media";
import Updates from "../screens/Updates";
import Wellness from "../screens/Wellness";
import { EventsScreenOptions } from "../screens/Events";
import { AlliesScreenOptions } from "../screens/Allies";
import { MediaScreenOptions } from "../screens/Media";
import { UpdatesScreenOptions } from "../screens/Updates";
import { WellnessScreenOptions } from "../screens/Wellness";
const Tab = createBottomTabNavigator();
const HomeStackNavigator = createStackNavigator();
const EventsStackNavigator = createStackNavigator();
const MainStackNavigator = createStackNavigator();
const AlliesStackNavigator = createStackNavigator();
const MediaStackNavigator = createStackNavigator();
const UpdatesStackNavigator = createStackNavigator();
const WellnessStackNavigator = createStackNavigator();
// export const MainNavigator=props=>{
//   return <MainStackNavigator.Navigator>
//     <MainStackNavigator.Screen name='Home' component={HomeNavigator} options={{
//     headerShown: false
//   }}/>
//     <MainStackNavigator.Screen name='Events' component={EventsNavigator} options={{
//     headerShown: true}}/>
//   </MainStackNavigator.Navigator>
// }
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
        name="Events"
        component={EventsNavigator}
        options={EventsScreenOptions}
      />
      <HomeStackNavigator.Screen
        name="Allies"
        component={AlliesNavigator}
        options={AlliesScreenOptions}
      />
      <HomeStackNavigator.Screen
        name="Updates"
        component={UpdatesNavigator}
        options={UpdatesScreenOptions}
      />
      <HomeStackNavigator.Screen
        name="Wellness"
        component={WellnessNavigator}
        options={WellnessScreenOptions}
      />
      <HomeStackNavigator.Screen
        name="Media"
        component={MediaNavigator}
        options={MediaScreenOptions}
      />
    </HomeStackNavigator.Navigator>
  );
};
export const EventsNavigator = (props) => {
  return (
    <EventsStackNavigator.Navigator>
      <EventsStackNavigator.Screen
        name="Events"
        component={Events}
        options={{ headerShown: false }}
      />
      {/* <EventsStackNavigator.Screen name="EventDetail" component={EventDetails} /> */}
    </EventsStackNavigator.Navigator>
  );
};

export const AlliesNavigator = (props) => {
  return (
    <AlliesStackNavigator.Navigator>
      <AlliesStackNavigator.Screen
        name="Allies"
        component={Allies}
        options={{ headerShown: false }}
      />
      {/* <EventsStackNavigator.Screen name="EventDetail" component={EventDetails} /> */}
    </AlliesStackNavigator.Navigator>
  );
};

export const MediaNavigator = (props) => {
  return (
    <MediaStackNavigator.Navigator>
      <MediaStackNavigator.Screen
        name="Media"
        component={Media}
        options={{ headerShown: false }}
      />
      {/* <EventsStackNavigator.Screen name="EventDetail" component={EventDetails} /> */}
    </MediaStackNavigator.Navigator>
  );
};

export const UpdatesNavigator = (props) => {
  return (
    <UpdatesStackNavigator.Navigator>
      <UpdatesStackNavigator.Screen
        name="Updates"
        component={Updates}
        options={{ headerShown: false }}
      />
      {/* <EventsStackNavigator.Screen name="EventDetail" component={EventDetails} /> */}
    </UpdatesStackNavigator.Navigator>
  );
};

export const WellnessNavigator = (props) => {
  return (
    <WellnessStackNavigator.Navigator>
      <WellnessStackNavigator.Screen
        name="Wellness"
        component={Wellness}
        options={{ headerShown: false }}
      />
      {/* <EventsStackNavigator.Screen name="EventDetail" component={EventDetails} /> */}
    </WellnessStackNavigator.Navigator>
  );
};

export const HomeTabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Saved Events") {
            iconName = "event";
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Saved Events" component={Events} />
    </Tab.Navigator>
  );
};
