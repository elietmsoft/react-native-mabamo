import { TouchableOpacity,View } from "react-native";
import { Avatar } from "react-native-elements";
import {Text} from 'react-native-paper';
import React from "react";
import styles from "../../utils/styles/text";
import { isEmpty } from "lodash";
import S from '../../utils/themes/colors';
import { getTitle } from "../../utils/helpers/text";
import LottieView from "lottie-react-native";


function CategoryItem({title,onPress,image,index}){


    return(
        <View>
        <TouchableOpacity style={{ 
            padding:5,flex:1,
            width:100,alignItems:'center' }}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View>
            {index!=29 && (<View>
                <Avatar
                    title={getTitle(title)}
                    size='medium'
                    source={!isEmpty(image)?{ uri:image }:null}
                    titleStyle={{ color:S.light }} rounded
                    containerStyle={{ backgroundColor:isEmpty(image)?S.primary:"transparent",alignSelf:'center' }}
                />
            </View>)}
            {index==29 && (
                <Avatar
                    rounded size='medium'
                    Component={()=>(
                        <LottieView
                            source={require('../../assets/lottie/79799-add-product.json')}
                            loop autoPlay autoSize
                            style={{ width:50,height:50,alignSelf:'center' }}
                        />
                    )}
                />
            )}
                <Text numberOfLines={1} style={styles.catTitle}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
        </View>
    )
}
export {CategoryItem};