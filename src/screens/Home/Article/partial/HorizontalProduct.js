import React from "react";
import { Dimensions, StyleSheet, useWindowDimensions, View } from "react-native";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { getImageProduct } from "../../../../utils/helpers/imageManager";
import {Text} from 'react-native-paper';
import { Rating } from "react-native-elements";
import { ProductPrice } from "../../../../components/atoms/product";
import { upperCase } from "lodash";
import styleSection from "../../../../utils/styles/section";

const { width: screenWidth } = Dimensions.get('window')

const styles = StyleSheet.create({
    item: {
      width: screenWidth - 60,
      height: screenWidth-60,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'center',
    },
  })

function HorizontalProduct({list=[],sliderWidth=500,itemWidth=500}){

    return(
        <View style={[styleSection.mintab,{padding:8}]}>
            <Carousel
                data={list}
                renderItem={RenderHorizontalProduct}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth-60}
                hasParallaxImages
            />
        </View>
    )
}

function RenderHorizontalProduct({item, index}, parallaxProps){


    return(
        <View style={styles.item}>
            <ParallaxImage
                parallaxFactor={0.8}
                containerStyle={styles.imageContainer}
                style={styles.image}
                source={{ uri:getImageProduct(item.images) }}
                {...parallaxProps}
                resizeMode='center'
            />
            <View>
                <Text style={{ fontSize:18,fontWeight:'bold' }}>
                    {upperCase(item.name)}
                </Text>
                <ProductPrice
                    item={item}
                    size={18}
                />
                <View style={{ alignItems:'flex-start' }}>
                    <Rating
                        imageSize={14}
                    />
                </View>
            </View>
        </View>
    )

}

export {HorizontalProduct}
