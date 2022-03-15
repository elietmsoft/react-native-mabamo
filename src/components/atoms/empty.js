import React from "react";
import { Image, View } from "react-native";
import {Text} from 'react-native-paper';
import {isEmpty} from 'lodash';
import LottieView from 'lottie-react-native';

function EmptyScreen({message='',description='',image=null,lottie=null}){

    return(
        <React.Fragment>
            <View style={{ flex:1,alignItems:'center',justifyContent:'center' }}>
                {!isEmpty(lottie) && (
                    <LottieView
                        source={lottie}
                        autoPlay loop 
                        style={{ width:250,height:250 }}
                    />
                )}
                {!isEmpty(image) && (
                    <Image
                        source={image}
                        style={{ width:150,height:150 }}
                    />
                )}
                <Text style={{ fontSize:18,padding:10 }}>
                    {message}
                </Text>
            </View>
        </React.Fragment>
    )
}

export {EmptyScreen}