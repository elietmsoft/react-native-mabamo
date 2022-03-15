import { upperCase } from "lodash";
import React from "react";
import { Image, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import {Button,Text} from 'react-native-paper';
import { TitleIcon } from "../../../components/atoms/titleIcon";
import { getImageProduct } from "../../../utils/helpers/imageManager";
import C from '../../../utils/themes/colors';



function RenderCart({item={},onRemove,onUpdate}){

    return(
        <Card containerStyle={{ borderRadius:20,elevation:10,marginBottom:5,padding:2 }}>
        <View style={{ flexDirection:'row',padding:8,paddingBottom:0,alignItems:'center' }}>
            <View>
                <Image
                    source={{ uri:getImageProduct(item.images) }}
                    style={{ width:100,height:100 }}
                    resizeMode='center' resizeMethod='resize'
                />
            </View>
            <View style={{ flex:1 }}>
                <Text numberOfLines={1} style={{ padding:0,fontSize:16,fontWeight:'bold' }}>
                    {upperCase(item.name)}
                </Text>
                <View style={{ flexDirection:'row',alignItems:'center' }}>
                    <View>
                        <TitleIcon
                            title={item.price+' $'} name='tags' type='ant-design'
                        />
                    </View>
                    <View>
                        <TitleIcon
                            title={item.quantity_sale} name='link' type='ant-design'
                        />
                    </View>
                </View>   
                <View>
                    <Text style={{ fontSize:18,color:C.primary,fontWeight:'bold' }}>
                        {item.quantity_sale*item.price} $
                    </Text>
                </View>
                 
            </View>
        </View>
            <View style={{ flexDirection:'row',alignItems:'center',alignSelf:'flex-end' }}>
                <ButtonRender
                    title="Supprimer"
                    onPress={onRemove}
                />
                <ButtonRender
                    title="Modifier"
                    onPress={onUpdate}
                />
            </View>
        </Card>
    )
}

const ButtonRender=({title="",onPress,icon='',type='ant-design',color=C.secondary})=>{
    return(
        <View style={{ marginLeft:4,marginRight:4 }}>
            <Button mode='text' labelStyle={{ color:"#000" }}
                icon={()=>(
                    <Icon
                        type={type} name={icon} color={color}
                    />
                )}
                onPress={onPress}
            >
                {title}
            </Button>
        </View>
    )
}

export {RenderCart}