import React from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView,
    FlatList,
    View,
    ActivityIndicator,
    Dimensions
} from "react-native";
import { useQuery } from '@apollo/client'
import Event_Videos_Query from '../queries/EventVideos';
import { MediaContext } from '../navigation/Context';
import YoutubePlayer from "react-native-youtube-iframe";
import Colors from '../constants/Colors';
const MediaVideos = (props) => {
    const id = React.useContext(MediaContext);
    const { data, error, loading, refetch } = useQuery(Event_Videos_Query, {
        fetchPolicy: 'network-only',
        variables: { id: id }
    });
    if (error) {
        return (
            <View style={styles.error}>
                <Text style={styles.text}>Something went wrong!</Text>
                <Text style={styles.text}>Check your internet Connection</Text>
            </View>
        );
    }
    if (loading) {
        return (
            <View style={styles.error}>
                <ActivityIndicator size="large" color="#fa2f88" />
            </View>
        );
    }
    const mediaVideos = [];
    if (data) {
        data.events.forEach(event => event.videos.forEach(video => mediaVideos.push(
            {
                id: video.id,
                title: video.title,
                videoId: video.videoId
            }
        )))
    }
    if (mediaVideos.length == 0) {
        return (<View style={styles.errorText}><Text style={styles.text}>There are no videos for this event</Text></View>)
    }
    let videoHeight=Dimensions.get('screen').width * 0.56;
    
    return (
        <SafeAreaView style={styles.container}>
            <FlatList style={styles.list}


                data={mediaVideos}
                keyExtractor={(item) => item.id}
                renderItem={(itemData) =>
                    <View style={styles.videoContainer}>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>{itemData.item.title}</Text>
                        <YoutubePlayer
                            height={videoHeight}
                            play={false}
                            videoId={itemData.item.videoId}
                        />
                    </View>
                }
            />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    errorText: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        color: Colors.primary,
        fontSize: Dimensions.get('screen').width * 0.04,
        fontWeight: 'bold'
    },
    videoContainer: {
        //paddingVertical:10
    },
    error: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    refreshButton: {
        margin: 20,
        backgroundColor: Colors.primary,
        borderRadius: 5
    },
    refreshText: {
        color: 'white',
        padding: 10,
        fontWeight: 'bold',
        textAlign: "center"
    },
    text: {
        paddingHorizontal: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: Colors.primary
    },
});

export default MediaVideos;