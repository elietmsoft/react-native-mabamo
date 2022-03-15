import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import {Text} from 'react-native-paper';



function CountArticle({available=0,count=0,setCount,title=""}){

    function handleAdd(){
        if(available>count){
            
        }
        setCount(count+1);
    }

    function handleRemove(){
        if(count>0){
            setCount(count-1);
        }
    }

    return(
        <View style={{ flex:1 }}>
            <View style={{ flexDirection:'row',alignItems:'center',
                margin:10,marginTop:0,borderWidth:1,borderRadius:20 }}>
                <ActionButton
                    onPress={handleRemove} title="-"
                />
                <View>
                    <Text style={{ fontSize:20,padding:4 }}>{count}</Text>
                </View>
                <ActionButton
                    onPress={handleAdd} title="+"
                />
            </View>
        </View>
    )
}

function ActionButton({title="w",onPress}){

    return(
        <View style={{ flex:1 }}>
            <Button type='clear' title={title}
                titleStyle={{ color:"#000",fontSize:20 }}
                buttonStyle={{ padding:4 }}
                onPress={onPress}
            />
        </View>
    )
}

export {CountArticle}