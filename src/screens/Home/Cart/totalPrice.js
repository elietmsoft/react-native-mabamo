import React from "react";
import { View } from "react-native";
import { Divider, Icon } from "react-native-elements";
import { Button, Text } from 'react-native-paper';
import C from '../../../utils/themes/colors';

function TotalPrice({onPress,price}){

    return(
        <View style={{ padding:10}}>
            <Divider style={{marginBottom:7}}/>
            <Text style={{ paddingLeft:10 }}>
                Total à payer
            </Text>
            <View style={{ flexDirection:'row',alignItems:'center',padding:15,paddingTop:0,paddingBottom:5 }}>
                <View style={{ flex:1 }}>
                    <Text style={{ color:C.accent,fontWeight:'bold',fontSize:28 }}>
                        {price} $
                    </Text>
                </View>
                <View>
                    <Button icon={()=>(
                        <Icon type="ant-design" name='shoppingcart' color={C.primary}/>  
                    )}
                    mode='contained' color={C.accent}
                    style={{ borderRadius:20,padding:5 }}
                    >
                        Payer maintenant
                    </Button>
                </View>
            </View>
        </View>
    )
}

export {TotalPrice}