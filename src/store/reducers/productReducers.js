import S from '../../utils/settings/redux.json';
const intialState={
    products:[],
    current:null,
    carts:[],
    favorites:[]
}

export default function productyReducers(state=intialState,action){
    const type=S.ARTICLE;
    switch (action.type) {
        case type.SEARCH:
            return {...state,products:action.payload} 
        case type.CURRENT:
            return {...state,current:action.payload}  
        case type.CART:
                return {...state,carts:action.payload}  
        case type.FAVORITE:
            return {...state,favorites:action.payload}  
        default:
            return state;
    }
}