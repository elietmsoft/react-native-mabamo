import React from "react";
import { View } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { Appbar,Button,FAB,TextInput } from "react-native-paper";
import styleSection from "../../../utils/styles/section";
import C from '../../../utils/themes/colors';


function LoginScreen({visible=false,setVisible,setRegister}){

    const[email,setEmail]=React.useState("");
    const[password,setPassword]=React.useState("");
    const[secure,setSecure]=React.useState(true);

    function handleOpenRegister(){
        setVisible(false);
        setRegister(true);
    }

    return(
        <Overlay
            isVisible={visible} animationType='fade'
            overlayStyle={{ padding:0 }} fullScreen
        >
            <View style={{ flex:1 }}>
                <Appbar.Header style={[styleSection.appbar,{margin:0}]}>
                    <Appbar.BackAction
                        onPress={()=>setVisible(false)}
                    />
                    <Appbar.Content
                        title="Connexion"
                    />
                </Appbar.Header>
                <View style={{ flex:1,justifyContent:'center',padding:20 }}>
                    <View>
                        <Icon name="user" type="ant-design"
                            size={60} style={{ padding:10 }}
                        />
                        <TextInput
                            value={email} onChangeText={v=>setEmail(v)}
                            returnKeyType='next' textContentType='emailAddress'
                            keyboardType='email-address' underlineColor={C.primary}
                            label="Adresse E-mail" placeholder="user@example.com"
                            style={{ margin:10 }} left={()=><Icon name='user' type='ant-design' />}
                            theme={{ colors:{primary:C.primary} }}
                        />
                        <TextInput
                            value={password} onChangeText={v=>setPassword(v)}
                            secureTextEntry={secure} label="Mot de passe"
                            style={{ margin:10 }} underlineColor={C.primary}
                            theme={{ colors:{primary:C.primary} }}
                        />
                        <View style={{ alignItems:'center' }}>
                            <Button 
                                mode='contained' labelStyle={{ padding:8}}
                                style={{ maxWidth:200 }}
                            >
                                Se connecter
                            </Button>
                        </View>
                    </View>
                </View>
                <FAB
                    label="S'inscrire" icon={()=><Icon name='user' type='ant-design' />}
                    style={{ position:'absolute',bottom:20,right:20 }}
                    onPress={handleOpenRegister}
                />
            </View>

        </Overlay>
    )
}

export {LoginScreen}