import { CategoryItem } from "../../atoms/category";
import React from "react";
import { getImageProduct } from "../../../utils/helpers/imageManager";


function RenderCategory({item,onPress}){

    return(
        <CategoryItem
            title={item.name}
            onPress={onPress}
            key={item.id}
            image={getImageProduct(item.image)}
        />
    )
}

export {RenderCategory}