import React from 'react';
import { SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Appbar } from 'react-native-paper';
import { LogoutScreen } from './setting/logout';
import { SettingMenu } from './setting/SettingMenu';
import section from '../../utils/styles/section';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { DashboardScreen } from './setting/dashboard';


function SettingHome(){

    const[showMenu,setShowMenu]=React.useState(false);
    const user=useSelector(state=>state.user.profil);

    React.useEffect(()=>{
        console.log("USER",user.id);
    },[user]);
    function handleShowMenu(){
        setShowMenu(true);
    }

    return(
        <SafeAreaView style={{ flex:1 }}>
            <Appbar.Header
                style={[section.appbar,{margin:0}]}
            >
                <Appbar.Content
                    title="Mon mobamo"
                />
                <Appbar.Action
                    icon={()=>(
                        <Icon
                            name="menu"
                            type="entypo"
                            onPress={handleShowMenu}
                        />
                    )}
                />
            </Appbar.Header>
            {!user.id>0 && (<LogoutScreen/>)}
            {user.id>0 && (<DashboardScreen/>)}
            {showMenu && (
                <SettingMenu
                    setVisible={setShowMenu}
                    visible={showMenu}
                />
            )}
        </SafeAreaView>
    )
}
export {SettingHome};