import React from "react";
import { getImageProduct, getImageProducts } from "../../../utils/helpers/imageManager";
import { ProductItem } from "../../atoms/product";


function RenderProduct({item,index,onPress}){


    return(
        <React.Fragment key={item.id}>
            <ProductItem
                key={item.id}
                name={item.name}
                images={getImages(item.images)}
                price={item.price}
                salePrice={item.sale_price}
                item={item}
                onPress={onPress}
            />
        </React.Fragment>
    )
}

function getImages(list=[]){
    let response=[];
    list.map((p,index)=>{
        if(index<3){
            response.push(p);
        }
    })
    return response;
}

export {RenderProduct}