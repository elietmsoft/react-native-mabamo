import { isEmpty } from "lodash";
import React from "react";
import { Alert, ScrollView, useWindowDimensions, View } from "react-native";
import {  Card, Icon, Overlay, Rating } from "react-native-elements";
import { Appbar,Button,Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ImageProduct, ProductPrice } from "../../../../components/atoms/product";
import S from '../../../../utils/settings/redux.json';
import RenderHtml from 'react-native-render-html';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { CountArticle } from "../../../../components/atoms/CountArticle";
import C from '../../../../utils/themes/colors';
import SegmentedControl from '@react-native-community/segmented-control';
import { HorizontalProduct } from "./HorizontalProduct";
import sectStyle from '../../../../utils/styles/section';
import { EmptyScreen } from "../../../../components/atoms/empty";
import { AttributeView } from "./attributeView";

const Tab=createMaterialTopTabNavigator();


function ProductView({visible,setVisible,current={},update=false}){

    const dispatch=useDispatch();
    const carts=useSelector(state=>state.product.carts);
    const favorites=useSelector(state=>state.product.favorites);
    const [disabled,setDisabled]=React.useState(false);
    const dim=useWindowDimensions();
    const[count,setCount]=React.useState(0);
    const[favorite,setFavorite]=React.useState(false);
    const[attributes,setAttribute]=React.useState([]);
    const[variations,setVariations]=React.useState([]);
    const[price,setPrice]=React.useState(0);
    const[mode,setMode]=React.useState({});


    React.useEffect(()=>{
        setDisabled(carts.findIndex(p=>p.id==current.id)!=-1)
        if(update && current.quantity_sale>0){
            setCount(current.quantity_sale);
        }
    },[current,carts]);

    React.useEffect(()=>{
        setVariations(current.variations)
        setAttribute(current.attributes)
        
    },[current]);

    React.useEffect(()=>{
        setFavorite(favorites.findIndex(p=>p.id==current.id)!=-1)
    },[current,favorites]);

    function onFavorite(){
        const state=favorites.findIndex(p=>p.id==current.id);
        if(state==-1){
            dispatch({
                type:S.ARTICLE.FAVORITE,
                payload:[...favorites,current]
            })
        }else{
            let items=favorites.filter(p=>p.id!=current.id)
            dispatch({
                type:S.ARTICLE.FAVORITE,
                payload:items
            })
        }
    }


    function purchase(count){
        if(count>0){
            if(!update){
                const item=current;
                item.quantity_sale=count;
                dispatch({
                    type:S.ARTICLE.CART,
                    payload:[...carts,item]
                })
            }else{
                const list=carts;
                list.map(p=>{
                    if(p.id==current.id){
                        p.quantity_sale=count;
                    }
                })
                dispatch({
                    type:S.ARTICLE.CART,
                    payload:list
                })
                setVisible(false);
            }
        }else{
            Alert.alert("Vérification","La quantité mentionnée est incorrecte")
        }
    }


    return(
        <Overlay isVisible={visible} fullScreen animationType='slide'
        overlayStyle={{ padding:0 }}
        >
            <View style={{ flex:1 }}>
                <Appbar.Header style={{ backgroundColor:"transparent" }}>
                    <Appbar.BackAction
                        onPress={()=>setVisible(false)}
                    />
                    <Appbar.Content
                        title=""
                    />
                </Appbar.Header>
                <View style={{ flex:1 }}>
                    <ScrollView>
                        <ImageProduct
                            images={current.images}
                        />
                        <PriceSpace
                            item={current}
                        />
                        <AttributeView
                            list={attributes}
                            variations={variations}
                            setCurrent={setMode}
                            current={mode}
                        />
                        <TabScreen
                            item={current}
                        />
                    </ScrollView>
                    <Actions
                        title={current.name} setCount={setCount} update={update}
                        state={disabled} count={count} favorite={favorite}
                        onPress={()=>purchase(count)} available={current.stock_quantity} onFavorite={onFavorite}
                    />
                </View>
            </View>
        </Overlay>
    )
}



function TabScreen({item={}}){
    const[index,setIndex]=React.useState(0);
    const [routes,setRoutes] = React.useState(["Description","Autres produits","Notes"]);
    const dim=useWindowDimensions();
    const products=useSelector(state=>state.product.products);
    return(
        <View>
            <ScrollView>
                <SegmentedControl
                    values={routes} selectedIndex={index}
                    onChange={event=>setIndex(event.nativeEvent.selectedSegmentIndex)}
                    style={{ backgroundColor:'#fff',margin:5 }}
                    collapsable
                />
            </ScrollView>
            {index==0 && (
                <DescriptionSpace
                    item={item}
                />
            )}
             {index==1 && (
                <HorizontalProduct
                    itemWidth={dim.width}
                    sliderWidth={dim.width}
                    list={products}
                />
            )}
             {index==2 && (
                <Review
                    count={15}
                />
            )}
        </View>
    )
}

function Actions({state=false,onPress,count,setCount,available=0,favorite=false,onFavorite,update}){


    return(
        <Card containerStyle={{ margin:0,elevation:10,borderTopEndRadius:50,borderTopStartRadius:50,borderColor:"#000"}}>
            <Text style={{ paddingLeft:15,fontSize:16,marginBottom:-5 }}>
                Quantité à acheter
            </Text>
            <View style={{ flexDirection:'row',alignItems:'center' }}>
                <CountArticle
                    setCount={setCount} title="Quantité à achéter"
                    available={available} count={count}
                />
                <View style={{ flex:1,alignItems:'flex-end' }}>
                    <Text style={{  padding:20 }}>$
                        <Text style={{ fontSize:30 }}>{count*15}</Text>
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection:'row',alignItems:'center',padding:10,paddingTop:0 }}>
                <View>
                    <Button 
                        onPress={onPress} mode='contained' color={C.accent}
                        disabled={state && !update} style={{ borderRadius:20,padding:5 }}
                        contentStyle={{ elevation:1 }} 
                        icon={()=>(
                            <Icon
                                name='shoppingcart' type='ant-design'
                                color={C.light}
                            />
                        )}
                        //buttonStyle={{ padding:10,paddingLeft:20,paddingRight:20,borderRadius:20 }}
                        titleStyle={{ fontFamily:"Lato-Medium" }}
                    >
                        Ajouter au panier
                    </Button>
                </View>
                <View style={{ flex:1,alignItems:'flex-end',paddingRight:20 }}>
                    <Icon
                        type='ant-design' onPress={onFavorite}
                        name={favorite?'heart':'hearto'} color={C.primary}
                    />
                </View>
        </View>
        </Card>
    )
}

function PriceSpace({item={}}){

    return(
        <View style={{ flexDirection:'row',padding:10,paddingLeft:30,paddingRight:30,alignItems:'center' }}>
             <View style={{ flex:1 }}>
                <Text style={{ fontSize:25 }}>
                    {item.name}
                </Text>
            </View>
            <View>
                <ProductPrice
                    item={item}
                    size={35}
                />
            </View>
        </View>
    )
}

function DescriptionSpace({item={}}){

    return(
        <View style={sectStyle.mintab}>
            {!isEmpty(item.description) &&(
                <React.Fragment>
                    <RenderHtml
                        source={{ html:item.description }}
                        baseStyle={{ padding:10 }}
                    />
                </React.Fragment>
            )}
            {isEmpty(item.description) && (
                <EmptyScreen
                    message="Aucune description"
                />
            )}
            
        </View>
    )
}

function Review({count=0}){

    return(
        <View style={[sectStyle.mintab,{flex:1,justifyContent:'center',alignItems:'center'}]}>
        <View style={{ flexDirection:'row',alignItems:'center',padding:10 }}>
            <View style={{ flex:1,alignItems:'flex-start' }}>
                <Rating
                    ratingCount={5}
                    imageSize={30}
                    startingValue={0}
                />
            </View>
            <View>
                <Text style={{ fontSize:20,borderBottomColor:"#333",borderBottomWidth:1,padding:5 }}>
                    {count}
                </Text>
            </View>
        </View>
        </View>
    )
}

function ValueZone({price=125,count=2}){

    return(
        <View style={{ flexDirection:'row',alignItems:'center',padding:8,paddingLeft:30,paddingRight:30 }}>
            <View style={{ alignItems:'flex-start' }}>
                <Text style={{ fontSize:14 }}>
                    $<Text style={{ fontSize:24,padding:8,fontWeight:'bold' }}>{price*count}</Text>
                </Text>
            </View>
            <View>
                <Text style={{ fontSize:22,margin:10,borderRadius:20,fontWeight:'bold',backgroundColor:"#f7f7f7",padding:10,paddingLeft:40,paddingRight:40 }}>
                    {count}
                </Text>
            </View>
        </View>
    )
}


export {ProductView}