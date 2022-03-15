import { sumBy } from 'lodash';
import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyScreen } from '../../components/atoms/empty';
import { RenderCart } from './Cart/renderItem';
import { TotalPrice } from './Cart/totalPrice';
import S from '../../utils/settings/redux.json';
import { ProductView } from './Article/partial/showProduct';
import {ConfirmDialog} from 'react-native-simple-dialogs';



function CartHome(){

    const carts=useSelector(state=>state.product.carts);
    const dispatch=useDispatch();
    const[visible,setVisible]=React.useState(false);
    const[current,setCurrent]=React.useState({});
    const[show,setShow]=React.useState(false);
    const[uid,setUid]=React.useState(-1);

    function getSum(){
        return sumBy(carts,p=>p.sale_price*p.quantity_sale);
    }

    function handleShowRemove(id){
        setUid(id);
        setShow(true);
    }

    function handleRemove(id){
        if(id>0){
            const items=carts.filter(p=>p.id!=id);
            dispatch({
                type:S.ARTICLE.CART,
                payload:items
            })
            setShow(false);
        }
    }

    function handleUpdate(item){
        setCurrent(item);
        dispatch({
            type:S.ARTICLE.CURRENT,
            payload:item
        });
        setVisible(true);
    }


    return(
        <React.Fragment>
            {carts.length>0 && (
                <React.Fragment>
                    <FlatList
                        renderItem={(info)=>(
                        <RenderCart
                            item={info.item}
                            onRemove={()=>handleShowRemove(info.item.id)}
                            onUpdate={()=>handleUpdate(info.item)}
                        />
                    )}
                    data={carts}
                />
                <TotalPrice
                    price={getSum()}
                />
                </React.Fragment>
            )}
            {carts.length==0 && (
                <EmptyScreen
                    message="Le panier est vide"
                    image={require('../../assets/images/cart-yellow.png')}
                    description=""
                />
            )}
            {visible && (<ProductView
                setVisible={setVisible}
                visible={visible}
                current={current}
                update={true}
            />)}
            {show && (
                <ConfirmDialog
                    animationType='fade'
                    positiveButton={{ onPress:()=>handleRemove(uid),title:"Supprimer" }}
                    negativeButton={{ onPress:()=>setShow(false),title:"Annuler" }}
                    message="Voulez-vous supprimer ce produit dans le panier?"
                    visible={show}
                />
            )}
        </React.Fragment>
    )
}
export {CartHome};