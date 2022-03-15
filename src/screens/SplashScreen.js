import React from "react";
import { ActivityIndicator, Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { useDispatch } from "react-redux";
import R from '../utils/themes/colors';
import S from '../utils/settings/redux.json';
import categoryService from "../store/service/categoryService";
import {StackActions,useNavigation} from "@react-navigation/native";
import productService from "../store/service/productService";
import { getLogin } from "../utils/helpers/store";
import { getProducts } from "./Home/Article/getProducts";


function SplashScreen(){
    const[loading,setLoading]=React.useState(false);
    const dispatch=useDispatch();
    const navigation=useNavigation();

    React.useEffect(()=>{
        setTimeout(async()=>{
            setLoading(true);
            let query=`per_page=30`;
            await categoryService.getByKey(query).then(response=>{
                const data=response.data;
                dispatch({
                    type:S.CATEGORY.SEARCH,
                    payload:data
                });
            }).catch(()=>{})
            /*await productService.getByKey(query).then(response=>{
                const data=response.data;
                dispatch({
                    type:S.ARTICLE.SEARCH,
                    payload:data
                });
            }).catch((reason)=>{console.log(reason.response)})*/
            await getProducts().then(response=>{
                dispatch({
                    type:S.ARTICLE.SEARCH,
                    payload:response
                });
            })
            /*const auth=await getLogin();
            if(auth!=null){
                dispatch({
                    type:S.USER.PROFIL,
                    payload:auth
                })
            }*/
            setTimeout(()=>{
                navigation.dispatch(
                    StackActions.replace('Home')
                )
            },500)
        },1500)
    },[]);

    return(
        <SafeAreaView style={{ flex:1 }}>
            <StatusBar animated hidden />
            <View style={{ flex:1,backgroundColor:R.light,alignItems:'center',justifyContent:'center' }}>
                <Avatar
                    source={require('../assets/images/pp.jpg')}
                    rounded size='xlarge'
                    containerStyle={{ elevation:10 }}
                />
            </View>
            <LoaderScreen state={loading} />
        </SafeAreaView>
    )
}

const LoaderScreen=({state=false})=>{
    return(
        <View style={{ position:'absolute',bottom:20,right:10,flex:1 }}>
        {state && (<View style={{ flexDirection:'row',alignItems:'center' }}>
            <View>
                <ActivityIndicator
                    animating
                    color={R.secondary}
                />
            </View>
            <View style={{ padding:5 }}>
                <Text>
                    chargement...
                </Text>
            </View>
        </View>)}
        </View>
    )
}

export {SplashScreen};