import React from "react";
import { ScrollView, View } from "react-native";
import { Avatar } from "react-native-elements";
import { useSelector } from "react-redux";
import {Button,Text} from 'react-native-paper';
import { upperCase, upperFirst } from "lodash";
import { ChartDashboard } from "./partial/chart";
import { SummaryDashboard } from "./partial/summary";
import { RecentDashboard } from "./partial/recent";


function DashboardScreen(){
    const user=useSelector(state=>state.user.profil);

    return(
        <View>
            <ScrollView>
                <UserProfil user={user} />
                <ChartDashboard/>
                <SummaryDashboard/>
                <RecentDashboard/>
            </ScrollView>
        </View>
    )
}

function UserProfil({user={}}){

    return(
        <View style={{ alignItems:'center',padding:15 }}>
            <Avatar
                title="M" rounded size='large'
                containerStyle={{ backgroundColor:'red' }}
            />
            <Text numberOfLines={1} style={{ padding:8,fontSize:16 }}>
                {upperFirst(user.first_name)} {upperCase(user.last_name)} 
            </Text>
        </View>
    )
}
export {DashboardScreen}