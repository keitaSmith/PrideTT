import React from 'react';
import {NavigationContainer}from '@react-navigation/native';
import {EventsNavigator,HomeNavigator,MainNavigator,HomeTabNavigator} from './Navigation';
import Home from '../screens/Home';




const AppNavigator = props =>{

    return (
        <NavigationContainer>
            <HomeTabNavigator/>
        </NavigationContainer>
    )
};
export default AppNavigator;