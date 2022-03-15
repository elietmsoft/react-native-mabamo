import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen } from "./HomeScreen";
import R from '../utils/themes/colors';
import { SplashScreen } from "../screens/SplashScreen";
import { CategoryShow } from "../screens/Home/Article/categoryShow";

const Stack=createNativeStackNavigator()

function StackNavigation(){

    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ 
                    headerShown:false
                 }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ 
                    headerStyle:{backgroundColor:R.primary},
                    headerTitleStyle:{color:R.light},
                    headerShown:false
                 }}
            />
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryShow}
                options={{ 
                    headerStyle:{backgroundColor:R.primary},
                    headerTitleStyle:{color:R.light},
                    headerShown:false
                 }}
            />
        </Stack.Navigator>
    )

}
export {StackNavigation};