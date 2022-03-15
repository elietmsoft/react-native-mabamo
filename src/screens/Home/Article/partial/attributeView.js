import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-elements";
import {Text} from 'react-native-paper';


function AttributeView({list=[],variations=[],current={},setCurrent}){

    const[element,setElement]=React.useState({});

    return(
        <React.Fragment>
            {list.length>0 && (
                <FlatList
                    data={list}
                    extraData={current}
                    keyExtractor={(v,i)=>v.id+""+i}
                    renderItem={v=>(
                        <AttributesList
                            item={v.item}
                            variations={variations}
                            setCurrent={setElement}
                            current={element}
                        />
                    )}
                />
            )}
        </React.Fragment>
    )
}

function AttributesList({item={},variations=[],current=null,setCurrent}){

    function onCheck(name,value,index){
        const data=current;
        data[name]=value;
        setCurrent(data);
        setKey(key+1);
    }

    const[key,setKey]=React.useState(0);

    return(
        <View style={{ padding:10,paddingLeft:30,paddingRight:30 }}>
            <Text style={{ fontSize:20,fontWeight:'bold' }}>
                {item.name} :
            </Text>
            <FlatList
                horizontal
                data={item.options}
                renderItem={v=>(
                    <RenderView
                        index={v.index}
                        item={v.item}
                        current={current}
                        setCurrent={setCurrent}
                        name={item.name}
                        onPress={()=>onCheck(item.name,v.item,v.index)}
                    />
                )}
                extraData={current}
                key={`list-att-${key}`}
                keyExtractor={(v,i)=>v.id+""+i}
            />
        </View>
    )
}

function isUsed(name,value,values={}){
    console.log('VALUES',values);
    let response=false;
    console.log('RR',values[name]===value);
    response=values[name]===value;
    return response;
}

function RenderView({item,index,current,name,onPress}){

    return(
        <React.Fragment>
            <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
            <Card containerStyle={{ margin:5,borderRadius:20,
                elevation:isUsed(name,item,current)?10:0,
                backgroundColor:isUsed(name,item,current)?'red':"",
                marginBottom:10 }}>
                <Text style={{ fontSize:18,padding:8 }}>
                    {item}
                </Text>
            </Card>
            </TouchableOpacity>
        </React.Fragment>
    )
}

export {AttributeView}