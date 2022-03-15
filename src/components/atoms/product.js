import { isEmpty } from "lodash";
import React from "react";
import { ActivityIndicator, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Icon, Image } from "react-native-elements";
import { Card, Text } from "react-native-paper";
import { getImageProduct } from "../../utils/helpers/imageManager";
import R from '../../utils/themes/colors';
import V from '../../utils/settings/product.json';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getPrice } from "../../screens/Home/Article/getProducts";

function ProductItem({name,item={},images=[],onPress}){

    return(
        <View style={{ padding:8,width:'50%',marginBottom:5 }}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} >
        <Card style={{ elevation:10 }}>
            
            {images.length==1 && (
            <Image
                source={{ uri:getImageProduct(images[0]) }}
                style={{ padding:10,flex:1,minHeight:200 }}
                PlaceholderContent={<ActivityIndicator size='large' color={R.primary} />}
            />)}
            {images.length>1 && (
                <CarouselImage
                   images={images}
                />
            )}
            <View style={{ flex:1 }}>
                <Text numberOfLines={1} style={{ padding:8,fontSize:16,textAlign:'center' }}>
                    {name}
                </Text>
                <ProductPrice item={item} />
                <View style={{ flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-end',padding:8,paddingTop:0 }}>
                    <Icon
                       name="ellipsis1"
                       type="ant-design"
                    />
                </View>
            </View>

        </Card>
        </TouchableOpacity>
        </View>
    )
}

function CarouselImage({images=[],type=1}){

    const[activeSlide,setActiveSlide]=React.useState(0);
    const dim=useWindowDimensions();

    const renderItem=({item})=>{
        return(
            <Image
                source={{ uri:getImageProduct(item) }}
                style={{ minHeight:type==1?200:300 }}
                PlaceholderContent={<ActivityIndicator size='large' color={R.primary} />}
            />
        )
    }
    return(
        <React.Fragment>
            <Carousel
                data={images}
                renderItem={renderItem}
                layout='default'
                autoplay loop centerContent
                itemWidth={type==1?dim.width/2-20:300}
                sliderWidth={type==1?dim.width/2-20:300}
                onSnapToItem={(index)=>setActiveSlide(index)}
            />
            <Pagination
                activeDotIndex={activeSlide}
                dotsLength={images.length}
                containerStyle={{ marginTop:-20 }}
                dotColor={R.primary}
                inactiveDotColor={R.dark}
            />
        </React.Fragment>
    )
}

function ImageProduct({images=[]}){

    return(
        <View style={{ alignItems:'center' }}>
        <View style={{ height:300,width:300 }}>
            {images.length==1 && (
            <Image
                source={{ uri:getImageProduct(images[0]) }}
                style={{ minHeight:300 }}
                PlaceholderContent={<ActivityIndicator size='large' color={R.primary} />}
            />)}
            {images.length>1 && (
                <CarouselImage
                   images={images}
                   type={2}
                />
            )}
        </View>
        </View>
    )
}



function ProductPrice({item={},size=20}){

    const price=getPrice(item);

    return(
        <React.Fragment>
            {(!isEmpty(item.price) || !isEmpty(item.regular_price) || !isEmpty(item.sale_price)) && (
            <View style={{ flexDirection:'row',alignItems:'center',paddingLeft:20,paddingBottom:0 }}>
                {!isEmpty(price.status) && (
                <Text style={{ fontSize:11 }}>
                    $
                </Text>)}
                {price.status==V.PRICE.promotion && (<Text style={{ color:R.primary,fontWeight:'bold',fontSize:size,paddingLeft:5,paddingRight:5,
                textDecorationLine:'line-through' }}>
                    {price.response[0]}
                </Text>)}
                {(price.status==V.PRICE.regular || price.status==V.PRICE.promotion) && (
                <Text style={{ color:R.secondary,fontWeight:'bold',fontSize:size }}>
                    {price.response[1]}
                </Text>)}
                {price.status==V.PRICE.interval && (
                    <Text style={{ color:R.secondary,fontWeight:'bold',fontSize:size }}>
                        {`${price.response[0]}-${price.response[1]}`}
                    </Text>
                )}
            </View>)}
        </React.Fragment>
    )
}

export {ProductItem,ImageProduct,ProductPrice}