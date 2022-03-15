import { isArray, isEmpty } from "lodash";

export function getImageProduct(value){
    let response=null;
    let image=value;
    if(isArray(value)){
        image=value[0]
    }
    if(!isEmpty(image)){
        response=image.src;
    }
    return response;
}

export function getImageProducts(value=[]){
    let response=null;
    if(!isEmpty(value)){
        if(value.length>0){
            response=value[0].src;
        }
    }
    return response;
}