import S from '../../utils/settings/redux.json';
const intialState={
    list:[],
    current:{},
    profil:{},
    contacts:{}
}

export default function customerReducers(state=intialState,action){
    const type=S.USER;
    switch (action.type) {
        case type.LIST:
            return {...state,list:action.payload} 
        case type.CONTACTS:
            return {...state,contacts:action.payload} 
        case type.PROFIL:
            return {...state,profil:action.payload}  
        default:
            return state;
    }
}