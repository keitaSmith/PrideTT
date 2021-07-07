import React, { useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    StatusBar,
} from "react-native";
import ImageView from "react-native-image-viewing";
import ImageItem from '../components/ImageItem';
import db from '../constants/DBUrl';
const MediaImages = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const closeModal = () => {
        if (showModal) {
            setShowModal(false)
            return()=>setShowModal(false)
        }
    }
    const { images } = props.route.params;
    let imgId = 0;
    const imageList = [];
    images.forEach(image => {
        imageList.push({
            id: imgId,
            uri: db.url + image.url
        })
        imgId += 1;
    });

    return (
        <SafeAreaView style={styles.container}>
            {showModal&&<StatusBar hidden={true}/>}
            <FlatList style={styles.list}
                numColumns={3}                  // set number of columns 
                columnWrapperStyle={styles.row}  // space them out evenly

                data={imageList}
                keyExtractor={(item) => item.id}
                renderItem={(itemData) =>
                    <ImageItem
                        imgSrc={itemData.item.uri}
                        action={() => {
                            setShowModal(true)
                            setImageIndex(itemData.item.id)
                        }}
                    />
                }
            />
            
            <ImageView
                images={imageList}
                imageIndex={imageIndex}
                visible={showModal}
                onRequestClose={() => closeModal()}
                swipeToCloseEnabled
                presentationStyle="fullScreen"
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS==='ios'?StatusBar.currentHeight:0,
        alignItems: "center"
    },
    row: {
        flex: 1,
    }
});

export default MediaImages;