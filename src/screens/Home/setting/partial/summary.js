import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";
import {Button,Text} from 'react-native-paper';

const styles=StyleSheet.create({
    value:{
        padding:4,fontSize:16
    }
})

function SummaryDashboard({list=["","","","","",""]}){

    const renderItem=({item,index})=>{
        return(
            <View style={{ flexDirection:'row',alignItems:'center',padding:5 }}>
                <View>
                    <Text style={[styles.value,{paddingRight:20}]}>
                        25 oct 2021
                    </Text>
                </View>
                <View style={{ flex:1 }}>
                   <View style={{ flexDirection:'row',alignItems:'center' }}>
                       <View>
                           <Avatar
                                rounded size='small'
                                title="M"
                                containerStyle={{ backgroundColor:"red" }}
                           />
                       </View>
                       <View style={{ flex:1 }}>
                            <Text numberOfLines={1} style={[styles.value,{fontSize:18}]}>
                                malewa
                            </Text>
                       </View>
                   </View>
                </View>
                <View style={{ flexDirection:'row',alignItems:'center' }}>
                    <View>
                        <Avatar rounded size={10} containerStyle={{ backgroundColor:'teal' }} />
                    </View>
                    <View>
                        <Text style={[styles.value,{fontSize:13,paddingRight:15}]}>
                            en cours
                        </Text>
                    </View>
                </View>
                <View>
                   <Text style={[styles.value,{fontWeight:'bold',fontSize:20}]}>
                        515 $
                   </Text>
                </View>
            </View>
        )
    }
    return(
        <View>
            <View>
                <Text style={[styles.value,{fontSize:22,fontWeight:'bold',padding:10}]}>
                    Les récentes activités
                </Text>
            </View>
            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={(v,i)=>i+""}
                key="list"
            />
            <View style={{ alignItems:'flex-end',padding:10 }}>
                <Button mode='contained'>
                    Voir plus
                </Button>
            </View>
        </View>
    )
}

export {SummaryDashboard}