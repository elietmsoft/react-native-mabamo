import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { ArticleHome } from '../screens/Home/ArticleHome';
import { FavoriteHome } from '../screens/Home/FavoriteHome';
import { ChatHome } from '../screens/Home/ChatHome';
import { CartHome } from '../screens/Home/CartHome';
import { SettingHome } from '../screens/Home/SettingHome';
import { Icon } from 'react-native-elements';
import color from '../utils/themes/colors';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

const Tab=createMaterialBottomTabNavigator();

function HomeScreen(){

    const carts=useSelector(state=>state.product.carts);

    return(
        <React.Fragment>
        <Tab.Navigator
            activeColor={color.primary}
            inactiveColor={color.dark}
            barStyle={{ backgroundColor:color.light }}
            style={{ paddingTop:0 }}
        >
            <Tab.Screen
                name="ArticleHome"
                component={ArticleHome}
                options={{ 
                    tabBarIcon:({color,focused})=>(
                        <Icon name='smileo' type='antdesign' color={color}   />
                    ),
                    title:""
                 }}
            />
            <Tab.Screen
                name="FavoriteHome"
                component={FavoriteHome}
                options={{ 
                    tabBarIcon:({color,focused})=>(
                        <Icon name='hearto' type='antdesign' color={color}   />
                    ),
                    title:""
                 }}
            />
            <Tab.Screen
                name="ChatHome"
                component={ChatHome}
                options={{ 
                    tabBarIcon:({color,focused})=>(
                        <Icon name='message1' type='antdesign' color={color}   />
                    ),
                    title:""
                 }}
            />
            <Tab.Screen
                name="CartHome"
                component={CartHome}
                options={{ 
                    tabBarIcon:({color,focused})=>(
                        <Icon name='shoppingcart' type='antdesign' color={color}   />
                    ),
                    title:"",
                    tabBarBadge:carts.length>0?carts.length:null
                 }}
            />
            <Tab.Screen
                name="SettingHome"
                component={SettingHome}
                options={{ 
                    tabBarIcon:({color,focused})=>(
                        <Icon name='setting' type='antdesign' color={color}   />
                    ),
                    title:""
                 }}
            />
        </Tab.Navigator>
        </React.Fragment>
    )
}

export {HomeScreen}