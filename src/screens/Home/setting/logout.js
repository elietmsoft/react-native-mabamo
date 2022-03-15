import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import {Button,Text} from 'react-native-paper';
import C from '../../../utils/themes/colors';
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

function LogoutScreen(){

    const[showLogin,setShowLogin]=React.useState(false);
    const[showRegister,setShowRegister]=React.useState(false);

    function handleClick(){
        setShowLogin(true);
    }

    return(
        <React.Fragment>
        <View style={{ justifyContent:'center',alignItems:'center',flex:1 }}>
            <Icon
                name="user"
                type="ant-design"
                size={60}
                style={{ padding:10 }}
            />
            <Text style={{ fontSize:18,padding:8 }}>
                Créez un compte mobamo
            </Text>
            <Button color={C.primary} mode='contained' labelStyle={{ color:"#fff" }}
                style={{ padding:8 }} onPress={handleClick}
            >
                Connexion ou inscription
            </Button>
        </View>
        {showLogin && (
            <LoginScreen
                setVisible={setShowLogin} visible={showLogin}
                setRegister={setShowRegister}
            />
        )}
        {
            showRegister && (
                <RegisterScreen
                    setVisible={setShowRegister} visible={showRegister}
                />
            )
        }
        </React.Fragment>
    )
}

export {LogoutScreen}