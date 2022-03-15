import React from 'react'
import { FlatList, ScrollView, useWindowDimensions, View } from 'react-native'
import { getListByPage, getPaginationCount } from '../../utils/helpers/table';
import { RenderProduct } from '../organisms/renderList/renderProduct';
import { ProductView } from '../../screens/Home/Article/partial/showProduct';
import { EmptyScreen } from '../atoms/empty';
import { StackActions,CommonActions } from '@react-navigation/native';
import { CategoryItem } from '../atoms/category';
import { getImageProduct } from '../../utils/helpers/imageManager';


function CategoryList({list=[]}){

    const[activeSlide,setActiveSlide]=React.useState(0);
    const dim=useWindowDimensions();
    const[items,setItems]=React.useState([]);

    React.useEffect(()=>{
        const elements=[];
        const len=getPaginationCount(list);
        for (let index = 0; index < len; index++) {
            const item=getListByPage(list,index+1,10);
            elements.push({
                list:item
            })
        }
        setItems(elements);
    },[list]);

    
    return(
        <React.Fragment>
            <CardCategory
                list={list}
            />
        </React.Fragment>
    )
}

function CardCategory({list=[]}){

    function handleOpen(item){
        //StackActions.push("CategoryScreen",{});
    }

    return(
        <ScrollView horizontal style={{ paddingTop:15,paddingBottom:15 }}>
            <FlatList
                data={list}
                keyExtractor={(item,index)=>item.id+index+""}
                renderItem={(info)=>(
                    <CategoryItem
                        image={getImageProduct(info.item.image)}
                        title={info.item.name}
                        onPress={()=>handleOpen(info.item)}
                        index={info.item.id}
                    />
                )}
                numColumns={Math.ceil(list.length/2)}
                key={`key${list.length/3}`}
                contentContainerStyle={{alignSelf: 'flex-start'}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </ScrollView>
    )
}

function ProductList({list=[]}){

    const[visible,setVisible]=React.useState(false);
    const[current,setCurrent]=React.useState({});

    const handleClick=(item)=>{
        setCurrent(item);
        setVisible(true);
    }
    return(
        <React.Fragment>
        {list.length>0 && (<FlatList
            data={list}
            renderItem={(info)=>(
                <RenderProduct
                  index={info.index}
                  item={info.item}
                  onPress={()=>handleClick(info.item)}
                />
            )}
            numColumns={2}
            keyExtractor={(item,index)=>item.id+index+""}
            key={`key${list.length/2}`}
            style={{ flexWrap:'wrap',paddingBottom:60 }}
            columnWrapperStyle={{ flex:1,justifyContent:'space-evenly' }}
        />)}
        {
            list.length==0 && (
                <EmptyScreen
                    message="Liste vide"
                    description="Essayez d'actualiser la liste"
                />
            )
        }
        {visible && (<ProductView
           setVisible={setVisible}
           visible={visible}
           current={current}
        />)}
        </React.Fragment>
    )
}


export {CategoryList,ProductList}