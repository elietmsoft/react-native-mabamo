import productService from "../../../store/service/productService";
import V from '../../../utils/settings/product.json';
import {min,max, minBy, maxBy, isEmpty} from 'lodash';

export async function getProducts(){
    let response=[];
    let query=`per_page=30`;
    await productService.getByKey(query).then(async rep=>{
      const items=rep.data;
      await Promise.all(items.map(async p=>{
          const variation=await productService.getVariations(p.id);
          p.variations=variation.data;
      }))
      response=items;

    }).catch(reason=>{
    })
    return response;
}

export function getPrice(item={}){
    let response=null;
    let status=V.PRICE.regular;
    if(item.type===V.TYPE.simple){
        let price1=item.regular_price;
        let price2=item.sale_price;
        if(isEmpty(item.sale_price)){
            status=V.PRICE.regular
        }else if(parseFloat(item.sale_price)>0){
            status=V.PRICE.promotion;
        }
        if(isEmpty(item.regular_price)){
            status=V.PRICE.regular;
            price1=item.price;
        }
        response=[price1,price2]
    }else if(item.type===V.TYPE.variable){
        const variations=[];
        item.variations.map(p=>{
            if(!isEmpty(p.regular_price)){
                p.regular_price=parseFloat(p.regular_price);
                variations.push(p);
            }
        })
        let min=minBy(variations,p=>p.regular_price);
        let max=maxBy(variations,p=>p.regular_price);
        if(!isEmpty(min))min=min.regular_price;
        if(!isEmpty(max))max=max.regular_price;
        if(isEmpty(min) || isEmpty(max)){
            status=null;
        }
        if(min<max){
            status=V.PRICE.interval;
        }else{
            status=V.PRICE.regular;
        }
        response=[min,max];
    }else{
        if(isEmpty(item.regular_price)){
            status=null;
        }
        response=[item.price,item.price]
    }

    return {response,status};
}