import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { Appbar,Divider, List } from "react-native-paper";
import { useSelector } from "react-redux";
import section from '../../../utils/styles/section';

const styles=StyleSheet.create({
    title:{
        fontSize:16,fontWeight:'bold',
        textTransform:'uppercase',
    },
    divider:{
        marginLeft:20,marginRight:20
    }
})


function SettingMenu({visible,setVisible}){

    const user=useSelector(state=>state.user.profil);

    return(
        <Overlay 
        isVisible={visible} fullScreen animationType='slide'
        overlayStyle={{ padding:0 }}
        >
            <View style={{ flex:1 }}>
                <Appbar.Header style={[section.appbar,{margin:0}]}>
                    <Appbar.BackAction
                        onPress={()=>setVisible(false)}
                    />
                    <Appbar.Content
                        title="Paramètre et confidentialité"
                    />
                </Appbar.Header>
                <List.Section>
                    <List.Subheader style={styles.title}>
                        Compte
                    </List.Subheader>
                    <Divider style={styles.divider} />
                    {user.id>0 && (
                    <React.Fragment>
                        <List.Item
                            title="Mon profil"
                            left={()=><Icon type="ant-design" name="user"  />}
                        />
                        <List.Item
                            title="Solde"
                            left={()=><Icon type="ant-design" name="areachart"  />}
                        />
                        <List.Item
                            title="Mes contacts"
                            left={()=><Icon type="ant-design" name="contacts"  />}
                        />
                    </React.Fragment>)}
                    <List.Subheader style={styles.title}>
                        mes activités
                    </List.Subheader>
                    <Divider style={styles.divider} />
                    <List.Item
                        title="Notifications"
                        left={()=><Icon type="ant-design" name="bells"  />}
                    />
                    <List.Item
                        title="Mes achats"
                        left={()=><Icon type="ant-design" name="book"  />}
                    />
                    <List.Subheader style={styles.title}>
                        confidentialités
                    </List.Subheader>
                    <Divider style={styles.divider} />
                    <List.Item
                        title="Termes et conditions"
                        left={()=><Icon type="ant-design" name="pushpino"  />}
                    />
                    <List.Item
                        title="Mode de paiement"
                        left={()=><Icon type="ant-design" name="creditcard"  />}
                    />
                    <List.Item
                        title="A propos de nous"
                        left={()=><Icon type="ant-design" name="info"  />}
                    />
                </List.Section>
            </View>
    </Overlay>
    )
}

export {SettingMenu}