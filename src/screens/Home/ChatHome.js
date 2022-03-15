import React from 'react';
import { EmptyScreen } from '../../components/atoms/empty';


function ChatHome(){

    return(
        <React.Fragment>
            <EmptyScreen
                message="Aucun message"
                lottie={require('../../assets/lottie/77007-message.json')}
            />
        </React.Fragment>
    )
}
export {ChatHome};