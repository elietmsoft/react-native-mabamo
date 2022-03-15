import { isEmpty } from "lodash";
import React from "react";
import { Alert, View } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { Appbar,Button,TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import customerService from "../../../store/service/customerService";
import { getLogin, setLogin } from "../../../utils/helpers/store";
import {anyIsEmpty } from "../../../utils/helpers/text";
import styleSection from "../../../utils/styles/section";
import C from '../../../utils/themes/colors';
import S from '../../../utils/settings/redux.json';


function RegisterScreen({visible=false,setVisible}){

    const[email,setEmail]=React.useState("");
    const[lastName,setLastName]=React.useState("");
    const[firstName,setFirstName]=React.useState("");
    const[password,setPassword]=React.useState("");
    const[confirm,setConfirm]=React.useState("");
    const[secure,setSecure]=React.useState(true);
    const[loading,setLoading]=React.useState(false);
    const[errors,setErrors]=React.useState({});
    const[phone,setPhone]=React.useState("");

    const dispatch=useDispatch();

    function handleClose(){
        if(loading==false){
            setVisible(false)
        }
    }

    async function handleSave(){
        if(anyIsEmpty([email,firstName,lastName,phone])){
            Alert.alert("Vérification","Remplissez correctement toutes les cases");
            return;
        }
        const data={};
        data.email=email;
        data.firs_name=firstName;
        data.last_name=lastName;
        const bill={};
        bill.firs_name=firstName;
        bill.last_name=lastName;
        bill.phone=phone;
        bill.email=email;
        data.billing=bill;
        setLoading(true);
        await customerService.store(data).then(async response=>{
            await setLogin(response.data);
            const rep=await getLogin();
            dispatch({
                type:S.USER.PROFIL,
                payload:rep
            })
            setVisible(false);
        }).catch(reason=>{
            const response=reason.response;
            if(response.status==400){
                Alert.alert("Authentification",response.data.message);
            }
        })
        setLoading(false);
    }

    return(
        <Overlay
            isVisible={visible} animationType='slide'
            overlayStyle={{ padding:0 }} fullScreen
        >
            <View style={{ flex:1 }}>
                <Appbar.Header style={[styleSection.appbar,{margin:0}]}>
                    <Appbar.BackAction
                        onPress={handleClose}
                    />
                    <Appbar.Content
                        title="Inscription"
                    />
                </Appbar.Header>
                <View style={{ flex:1,justifyContent:'center',padding:20 }}>
                    <View>
                        <Icon name="user" type="ant-design"
                            size={60} style={{ padding:10 }}
                        />
                        <TextInput
                            value={lastName} onChangeText={v=>setLastName(v)}
                            returnKeyType='next'
                            keyboardType='ascii-capable' underlineColor={C.primary}
                            label="Nom" placeholder="votre nom"
                            style={{ margin:10 }} left={()=><Icon name='user' type='ant-design' />}
                            theme={{ colors:{primary:C.primary} }}
                            error={!isEmpty(errors.lastName)}
                        />
                        <TextInput
                            value={firstName} onChangeText={v=>setFirstName(v)}
                            returnKeyType='next' underlineColor={C.primary}
                            label="Prénom" placeholder="user@example.com"
                            style={{ margin:10 }} left={()=><Icon name='user' type='ant-design' />}
                            theme={{ colors:{primary:C.primary} }}
                            error={!isEmpty(errors.firstName)}
                        />
                        <TextInput
                            value={email} onChangeText={v=>setEmail(v)}
                            returnKeyType='next' textContentType='emailAddress'
                            keyboardType='email-address' underlineColor={C.primary}
                            label="Adresse E-mail" placeholder="user@example.com"
                            style={{ margin:10 }} left={()=><Icon name='user' type='ant-design' />}
                            theme={{ colors:{primary:C.primary} }}
                            error={!isEmpty(errors.email)}
                        />
                        <TextInput
                            value={phone} onChangeText={v=>setPhone(v)}
                            label="Numéro de téléphone"
                            style={{ margin:10 }} underlineColor={C.primary}
                            theme={{ colors:{primary:C.primary} }}
                            keyboardType='phone-pad'
                            error={!isEmpty(errors.phone)}
                        />
                        <View style={{ alignItems:'center' }}>
                            <Button 
                                mode='contained' labelStyle={{ padding:8}}
                                style={{ maxWidth:200 }} loading={loading}
                                onPress={handleSave}
                            >
                                Enregistrer
                            </Button>
                        </View>
                    </View>
                </View>
            </View>

        </Overlay>
    )
}

export {RegisterScreen}