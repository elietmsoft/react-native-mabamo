import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setLogin(data){
    let response=false;
    try {
        await AsyncStorage.setItem('@user', JSON.stringify(data))
        response=true;
    } catch (error) {
        response=false;
    }
    return response;
}

export async function getLogin(){
    let response=null;
    try {
        const value = await AsyncStorage.getItem('@user')
        if(value !== null) {
            response=JSON.parse(value);
        }
    } catch (error) {
        
    }
    return response;
}