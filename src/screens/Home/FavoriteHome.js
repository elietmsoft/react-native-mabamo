import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { EmptyScreen } from '../../components/atoms/empty';


function FavoriteHome(){

    return(
        <React.Fragment>
            <EmptyScreen
                message="La liste des favories est vide"
                lottie={require('../../assets/lottie/322-favorite.json')}
            />
        </React.Fragment>
    )
}
export {FavoriteHome};