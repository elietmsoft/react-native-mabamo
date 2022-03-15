import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import section from '../../utils/styles/section';
import { CategoryList, ProductList } from '../../components/page/homeProduct';


function ArticleHome(){


    const[items,setItems]=React.useState([]);
    const categories=useSelector(state=>state.category.categories);
    const products=useSelector(state=>state.product.products);

    React.useEffect(()=>{
        const elements=[];
        elements.push({
            type:"category",
            data:categories,
            uid:"category"
        });
        elements.push({
            type:"product",
            data:products,
            uid:"product"
        });
        setItems(elements);
    },[]);

    const renderItem=({item})=>{

        if(item.type=='category'){
            return(
                <CategoryList
                    list={item.data}
                    key={item.uid}
                />
            )
        }else if(item.type=='product'){
            return(
                <ProductList
                    list={item.data}
                    key={item.uid}
                />
            )
        }
    }

    return(
        <SafeAreaView style={{ flex:1 }}>
            <View>
                <HeaderSpace/>
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    key="list-data"
                    keyExtractor={(data,key)=>data.uid+key}
                />
            </View>
        </SafeAreaView>
    )
}

function HeaderSpace(){

    const[value,setValue]=React.useState('');

    return(
        <View>
            <Appbar.Header style={section.appbar}>
                <Searchbar
                    style={{ borderRadius:50,margin:10 }}
                    value={value} allowFontScaling
                    onChangeText={v=>setValue(v)}
                    placeholder="Rechercher"
                />
            </Appbar.Header>
        </View>
    )
}
export {ArticleHome};