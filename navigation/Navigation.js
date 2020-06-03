import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Events from '../screens/Events';
import {EventsScreenOptions} from '../screens/Events';
const Tab = createBottomTabNavigator();
const HomeStackNavigator=createStackNavigator();
const EventsStackNavigator = createStackNavigator();
const MainStackNavigator = createStackNavigator();
// export const MainNavigator=props=>{
//   return <MainStackNavigator.Navigator>
//     <MainStackNavigator.Screen name='Home' component={HomeNavigator} options={{
//     headerShown: false
//   }}/>
//     <MainStackNavigator.Screen name='Events' component={EventsNavigator} options={{
//     headerShown: true}}/>
//   </MainStackNavigator.Navigator>
// }
export const HomeNavigator=props=>{
  return <HomeStackNavigator.Navigator >
    <HomeStackNavigator.Screen
    name='Home'
    component={Home}
    options={{
      headerShown: false
    }}
    />
    <HomeStackNavigator.Screen name='Events' component={EventsNavigator} options={EventsScreenOptions}/>
  </HomeStackNavigator.Navigator>
}
export const EventsNavigator = props => {
  return <EventsStackNavigator.Navigator>
    <EventsStackNavigator.Screen
      name="Events"
      component={Events}
      options={{headerShown:false}}
    />
    {/* <EventsStackNavigator.Screen name="EventDetail" component={EventDetails} /> */}
  </EventsStackNavigator.Navigator>

}
export const HomeTabNavigator = props => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Saved Events') {
              iconName = 'event';
            }

            // You can return any component that you like here!
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Saved Events" component={Events} />
      </Tab.Navigator>
  );
}
