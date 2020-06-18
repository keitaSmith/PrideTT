import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const EventItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return(
        <View>
        {props.newDate? (<View style={styles.dateContainer}>
            <Text style={styles.date}>{props.new_date}</Text>
        </View>):null}
            <View style={styles.eventItem}>

                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={props.imgUrl} />
                </View>
                <View style={styles.details}>
                    <View style={styles.itemData}>
                        <Text style={styles.mainText}>{props.title}</Text>

                       <Text style={styles.description}>{props.start} - {props.end}</Text>
                    </View>
                    <View style={styles.favorite}> 
                            <TouchableCmp onPress={()=>{}} style={styles.actions}>
                                <View style={styles.circle}>
                                    <Ionicons
                                        name={Platform.OS === 'android' ? 'md-heart' : 'ios-heart'}
                                        size={28}
                                        color='pink'
                                    />
                                </View>
                            </TouchableCmp>
                        </View>
                </View>   
                 
                </View>
            </View>
        );
}
const styles = StyleSheet.create({
    eventItem: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 120,
        justifyContent: "space-between",
        flexDirection: "row",
        // overflow: 'hidden',
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 8,
        // elevation: 5,
        //borderRadius: 10,
        backgroundColor: 'white',
        overflow: "hidden",
        marginVertical:5
    },
    dateContainer:{
        paddingTop:10,
        paddingLeft:10,
        marginHorizontal:10
    },
    favorite:{
        flexDirection:"row",
        paddingRight:50,
        alignSelf:"flex-end"
    },
    date:{
        justifyContent:"center"
    },
    itemData: {
        justifyContent: "flex-start",
    },
    quantity: {
        //fontFamily: 'open-sans',
        //color: Colors.accent,
        fontSize: 16,
        //paddingHorizontal: 10
    },
    mainText: {
        paddingRight:20,
        fontSize: 16,
    },

    itemSummary: {
        //width:'65%',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20
    },

    image: {
        height: '100%',
        width: '100%'
    },
    details: {
        width: '75%',
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    imageContainer: {
        backgroundColor: 'black',
        height: '100%',
        width: '35%'
    },
    circle: {
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        overflow: 'hidden'
    }
});
export default EventItem;