import React, { useRef, useEffect, useState } from "react";
import { View,TouchableOpacity,Platform,TouchableNativeFeedback, StyleSheet, Text, Image, ScrollView, StatusBar, SafeAreaView,Dimensions } from "react-native";
import Colors from "../constants/Colors";
 


let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

const DonationMethodsScreen = (props) => {
 
  return (
    <SafeAreaView >
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="white" translucent={true} />
        
        <View>
        <Text>Make A Donation</Text>
        <Text>Your support is vital if we are to make a lasting
            difference for the lives of LGBTQIA+ people. 
        </Text>
        <Text>Select Payment Method</Text>
        <View>
            <TouchableCmp
            onPress={() => {
                console.log("ah get press press press");
                
            }}
            >
                <View >
                    <Text >Bank</Text>
                </View>
            
            </TouchableCmp>

            <TouchableCmp
           onPress={() => props.navigation.navigate("FundMeTT")}
            >
                <View >
                    <Text >FundMeTnT</Text>
                </View>
            
            </TouchableCmp>
        </View>
        </View>
    </SafeAreaView>
  );
};


export default DonationMethodsScreen;
