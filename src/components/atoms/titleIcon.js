import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import {Text} from 'react-native-paper';

function TitleIcon({name="ant-design",color="#000",type='hearto',title}){

    return(
        <View style={{ flexDirection:'row',alignItems:'center' }}>
            <View>
                <Icon
                    name={name} type={type} color={color}
                />
            </View>
            <View>
                <Text numberOfLines={1} style={{ padding:5 }}>
                    {title}
                </Text>
            </View>
        </View>
    )
}

export {TitleIcon}