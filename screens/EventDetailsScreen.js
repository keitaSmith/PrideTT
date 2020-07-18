import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, StatusBar, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
const EventDetailsScreen = props => {
    const { id, title, start, end, time, location, content, imgUrl, category,registrationUrl } = props.route.params
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <ScrollView style={{ flex: 1,backgroundColor:'white' }}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
            <View style={styles.event}>
                {/*header image*/}
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={imgUrl} />
                </View>
                {/*category*/}
                {category&&<View style={styles.categoryContainer}>
                    <View style={styles.categoryBox}>
                        <Text style={styles.category}>{category}</Text>
                    </View>
                </View>}
                <View style={styles.eventDetails}>
                    {/*title*/}
                    <View style={styles.titleContainer}>
                       {title && <Text style={styles.title}>{title}</Text>}
                    </View> 
                    {/*Date Time and Location*/}
                    <View>
                        <View style={styles.dateContainer}>
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-time' : 'ios-time'}
                                size={18}
                                color="pink"
                            />
                           <Text style={styles.date}>     {time} - {end}</Text>
                        </View>
                        <View style={styles.locationContainer}>
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-pin' : 'ios-pin'}
                                size={18}
                                color="pink"
                            />
                            {location&&<Text style={styles.location}>     {location}</Text>}
                        </View>
                    </View>
                    <View style={styles.divider} />
                    {/*Description*/}
                     <View style={styles.contentContainer}>
                        <Text style={styles.contentTitle}>About</Text>
                        {content&&<Text style={styles.content}>{content}</Text>}
                    </View> 
                     {registrationUrl!="" && registrationUrl!=null&&<TouchableCmp
                        onPress={() => {
                            props.navigation.navigate('Event Registration',
                                {
                                    registrationUrl: registrationUrl
                                })
                        }}
                        >
                        <View style={styles.registerButton}>
                            <Text style={styles.registerText}>Register for This Event</Text>
                        </View>
                    </TouchableCmp>}  
                </View>
            </View>
        </ScrollView>
    )


};
export const EventDetailsScreenOptions = (navData) => {
    return {
        headerTitle: "Event Details"
    }
};
const styles = StyleSheet.create({
    registerButton: {
        marginTop: 20,
        backgroundColor: "#fa2f88",
        borderRadius: 5
    },
    registerText: {
        color: 'white',
        padding: 10,
        fontWeight: 'bold',
        textAlign: "center"
    },
    event: {
        backgroundColor: 'white',
        //flex:1
    },
    eventDetails: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        
    },
    imageContainer: {
        height: 230,
        width: '100%'
    },
    image: {
        height: 230,
        width: '100%'
    },
    categoryContainer: {
        //flex:1,
        position: "absolute",
        height: 255,
        justifyContent: 'flex-end',
        //alignSelf: 'flex-end',
        padding: 20
    },
    categoryBox: {
        backgroundColor: "#fa2f88"
    },
    category: {
        padding: 4,
        color: "white"
    },
    titleContainer: {
        paddingVertical: 20
    },
    title: {
        color: "#fa2f88",
        fontWeight: 'bold',
        fontSize: 20
    },
    dateContainer: {
        flexDirection: 'row',
        height: 30
    },
    locationContainer: {
        flexDirection: 'row',
        paddingLeft: 2,
        height: 30
    },
    divider: {
        height: 1,
        backgroundColor: 'grey'
    },
    contentContainer: {
        paddingTop: 20
    },
    contentTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#fa2f88",
        paddingBottom: 10
    }
})
export default EventDetailsScreen;