import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  Dimensions,
} from "react-native";
import PrideTTLogo from "../assets/svgs/PrideTTLogo.svg";

const Media = (props) => {
  return (
    // <View style={styles.container}>
    //     <PrideTTLogo
    //     height={0.35*Dimensions.get('window').height}
    //     width={0.35*Dimensions.get('window').width}
    //     />
    // </View>
    <SafeAreaView style={styles.container}>
      <Text>Media Screen</Text>
    </SafeAreaView>
  );
};

export const MediaScreenOptions = (navData) => {
  return {
    headerTitle: "Media",
    //header:null
    // headerRight: () => (
    //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //         <Item
    //             title='Cart'
    //             iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
    //             onPress={() => {
    //                 navData.navigation.navigate('Cart')
    //             }} />
    //     </HeaderButtons>
    // )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  event: {
    marginVertical: 10,
  },
});

export default Media;
