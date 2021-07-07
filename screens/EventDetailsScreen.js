import React, { useState } from 'react';
import Markdown from 'react-native-markdown-display';
import { View, Text, Image, StyleSheet, ScrollView, StatusBar, Platform, SafeAreaView, TouchableNativeFeedback, TouchableOpacity,Dimensions,PureComponent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
import { ADD_OR_REMOVE_EVENT_FROM_FAVORITE } from '../queries/AllEvents';
import Colors from '../constants/Colors';
const EventDetailsScreen = props => {

            
    const { id, title, end, time, location, content, imgUrl, category, registrationUrl, favorite } = props.route.params
    const [fav, setFav] = useState(favorite);
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    const MyStatusBar = ({ backgroundColor, ...props }) => (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <StatusBar translucent={true} backgroundColor={backgroundColor}{...props} />
        </View>
    );
    const [addOrRemoveEventFromFavorite] = useMutation(ADD_OR_REMOVE_EVENT_FROM_FAVORITE, {
        variables: {
            eventId: id
        }
    })
    let iconSize;
    if(Dimensions.get('screen').width>600){
        iconSize =35
    }else{
        iconSize=28
    }
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MyStatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
            <ScrollView style={{ flex: 1, backgroundColor: 'white', }}>
                <View style={styles.event}>
                    {/*header image*/}
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={imgUrl} />
                    </View>

                    {/*category*/}
                    {category && <View style={styles.categoryContainer}>
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
                                {location && <Text style={styles.location}>     {location}</Text>}
                            </View>
                        </View>
                        <View style={styles.divider} />
                        {/*Description*/}
                        <View style={styles.contentContainer}>
                            <Text style={styles.contentTitle}>About</Text>
                            {(content || content!=="") && <Markdown style={styles.content}>{content}</Markdown>}
                        </View>
                        {registrationUrl != "" && registrationUrl != null && <TouchableCmp
                            onPress={() => {
                                this.props.navigation.navigate('Event Registration',
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
            <View style={styles.favoriteContainer}>
                <View style={styles.circle}>
                    <TouchableCmp onPress={async () => {
                        await addOrRemoveEventFromFavorite().then(() => {
                            setFav(!fav)
                        })
                    }} style={styles.actions}>
                        <View style={styles.circle}>
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-heart' : 'ios-heart'}
                                size={iconSize}
                                color={fav ? Colors.primary: 'pink'}
                            />
                        </View>
                    </TouchableCmp>
                </View>
            </View>
        </SafeAreaView>
    )


};
export const EventDetailsScreenOptions = (navData) => {
    return {
        headerTitle: "Event Details"
    }
};
let imageHeight;
let categoryHeight;
if(Dimensions.get('screen').width>600){
    imageHeight=330
    categoryHeight=355
}else{
    imageHeight=230
    categoryHeight=255
}
const styles = StyleSheet.create({
    registerButton: {
        marginTop: 20,
        backgroundColor: Colors.primary,
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
    },
    eventDetails: {
        paddingHorizontal: 20,
        paddingBottom: 20,

    },
    imageContainer: {
        height: imageHeight,
        width: '100%'
    },
    image: {
        height: imageHeight,
        width: '100%'
    },
    categoryContainer: {
        position: "absolute",
        height: categoryHeight,
        justifyContent: 'flex-end',
        padding: 20
    },
    categoryBox: {
        backgroundColor: Colors.primary
    },
    category: {
        padding: 4,
        color: "white"
    },
    titleContainer: {
        paddingVertical: 20
    },
    title: {
        color: Colors.primary,
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
        color: Colors.primary,
        paddingBottom: 10
    },
    statusBar: {
        backgroundColor: 'white'
    },
    circle: {
        height: 36,
        width: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        overflow: 'hidden',
    },
    favoriteContainer: {
        position: "absolute",

        alignSelf: "flex-end",
        paddingTop: Platform.OS==='ios'?50:10,
        paddingRight: 10,
        zIndex: 1,
    }
})
export default EventDetailsScreen;