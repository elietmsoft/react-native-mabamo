import { isEmpty, upperCase } from "lodash";

export function anyIsEmpty(list=[]){
    let response=false;
    if(list.length==0){
        return true;
    }
    list.map(p=>{
        if(isEmpty(p)){
            response=true;
        }
    })
    return response;
}

export function getTitle(name){
    let response="";
    if(isEmpty(name))return "";
    response=upperCase(name.substr(0,1));
    return response;
}