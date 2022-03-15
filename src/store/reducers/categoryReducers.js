import S from '../../utils/settings/redux.json';
const intialState={
    categories:[],
    current:null
}

export default function categoryReducers(state=intialState,action){
    const type=S.CATEGORY;
    switch (action.type) {
        case type.SEARCH:
            return {...state,categories:action.payload} 
        case type.CURRENT:
            return {...state,current:action.payload}  
        default:
            return state;
    }
}