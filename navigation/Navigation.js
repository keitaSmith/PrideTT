import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Home from "../screens/Home";
import Events from "../screens/Events";
import Allies from "../screens/Allies";
import Media from "../screens/Media";
import Updates from "../screens/Updates";
import Wellness from "../screens/Wellness";
import DonationScreen from "../screens/DonationScreen";
import EventDetailsScreen from '../screens/EventDetailsScreen';
import EventRegistrationScreen from '../screens/EventRegistrationScreen';
import { EventsScreenOptions } from "../screens/Events";
import { AlliesScreenOptions } from "../screens/Allies";
import { MediaScreenOptions } from "../screens/Media";
import { UpdatesScreenOptions } from "../screens/Updates";
import { WellnessScreenOptions } from "../screens/Wellness";
import { EventDetailsScreenOptions } from '../screens/EventDetailsScreen';
const Tab = createBottomTabNavigator();
const HomeStackNavigator = createStackNavigator();
const UpcomingEventsStackNavigator = createStackNavigator();
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
        component={EventsNavigator}
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
    <EventsStackNavigator.Navigator
      screenOptions={{ headerShown: false }}
    >
      <EventsStackNavigator.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <EventsStackNavigator.Screen
        name="Events"
        component={Events}
        options={{ headerShown: true,
          //headerTransparent:true,
          headerBackTitleStyle:{
            color:'pruple'
          },
          //headerTintColor:'purple',
          headerStyle:{
            backgroundColor:'white'
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
export const UpcomingEventsNavigator = (props) => {
  return (
    <UpcomingEventsStackNavigator.Navigator>
      <UpcomingEventsStackNavigator.Screen
        name="Event Details"
        component={EventDetailsScreen}
        options={{ headerShown: false }}
      />
      {/* <EventsStackNavigator.Screen name="EventDetail" component={EventDetails} /> */}
    </UpcomingEventsStackNavigator.Navigator>
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
          let IconType;
          if (route.name === "Home") {
            IconType = MaterialIcons;
            iconName = "home";
          } else if (route.name === "Saved Events") {
            IconType = MaterialIcons;
            iconName = "event";
          } else if (route.name === "Contribute") {
            IconType = FontAwesome5;
            iconName = "hand-holding";
          }
          return <IconType name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        tabStyle: {
          backgroundColor: 'white'
        },
        activeTintColor: "#fa2f88",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      {/* <Tab.Screen name="Saved Events" component={Events} /> */}
      <Tab.Screen name="Contribute" component={DonationScreen} />
    </Tab.Navigator>
  );
};
