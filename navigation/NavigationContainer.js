import React from 'react';
import {View,StyleSheet}from 'react-native';
import {NavigationContainer}from '@react-navigation/native';
import {HomeTabNavigator} from './Navigation';
import { CardStyleInterpolators } from '@react-navigation/stack';





const AppNavigator = props =>{

    return (
        <NavigationContainer>
            <View style={styles.app}>
            <HomeTabNavigator/>
            </View>
        </NavigationContainer>
    )
};
const styles=StyleSheet.create({
    app:{
        flex:1,
        flexDirection:"row",
        //maxWidth:600,
        justifyContent:"center",
        alignSelf:"center"
        
    }
})
export default AppNavigator;