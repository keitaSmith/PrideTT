import React from 'react';
import { View, StyleSheet} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import CustomIcon from '../components/CustomIcon';
import Colors from '../constants/Colors'
const Home = props => {
    const images = [
        require("../assets/sliderImages/slider1.jpg"),
        require("../assets/sliderImages/slider2.jpg"),
        require("../assets/sliderImages/slider3.jpg"),
        require("../assets/sliderImages/slider4.jpg") //local image
        //"https://source.unsplash.com/1024x768/?tree", // Network image
    ];
    return (
        <View style={styles.screen}>
            {/* image slider */}
            <SliderBox
                images={images}
                autoplay
                circleLoop
                resizeMethod={'resize'}
                resizeMode={'cover'}
                sliderBoxHeight={250}
            />
            {/* row 1 icons */}
            <View style={styles.icons}>
                <CustomIcon style={styles.hotline} imgUrl={require('../assets/ButtonIcons/Hotline.png')}></CustomIcon>
                <CustomIcon style={styles.allies} imgUrl={require('../assets/ButtonIcons/Allies.png')}></CustomIcon>
                <CustomIcon style={styles.updates} imgUrl={require('../assets/ButtonIcons/Updates.png')}></CustomIcon>
            </View>
            {/* row 2 icons */}
            <View style={styles.icons}>
                <CustomIcon style={styles.wellness} imgUrl={require('../assets/ButtonIcons/Wellness.png')}></CustomIcon>
                <CustomIcon style={styles.media} imgUrl={require('../assets/ButtonIcons/Media.png')}></CustomIcon>
                <CustomIcon style={styles.events} imgUrl={require('../assets/ButtonIcons/Events.png')}></CustomIcon>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white'
    },
    icons: {
        paddingTop: 30,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    buttons: {
        height: 60,
        width: 60,
    },
    allies: {
        backgroundColor: Colors.allies
    },
    hotline: {
        backgroundColor: Colors.hotline
    },
    updates: {
        backgroundColor: Colors.updates
    },
    wellness: {
        backgroundColor: Colors.wellness
    },
    media: {
        backgroundColor: Colors.media
    },
    events: {
        backgroundColor: Colors.events
    }
});

export default Home;