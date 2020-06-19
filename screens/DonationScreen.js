import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    Button,
    ScrollView,
    Linking
} from "react-native";
import DonationInfo from '../queries/Donate';

const DonationScreen = props => {
    const donationInfo = DonationInfo();
    return (
        <View>
            <Text>{donationInfo.hero_heading}</Text>
            <Text>{donationInfo.hero_description}</Text>
            <Button title="Donate" onPress={() => { Linking.openURL(donationInfo.donate_link) }} />
        </View>
    );
}
export default DonationScreen;