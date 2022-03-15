import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { AppNavigation } from "./src/navigation/AppNavigation";
import reducer from './src/store/reducers/';
import R from './src/utils/themes/colors';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import fontConfig from "./src/utils/themes/fonts/defaullt";
import { mobamoTheme } from "./src/utils/themes/mobamo";

const store=createStore(reducer);

/*const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
};*/

function App(){

  return(
    <PaperProvider theme={mobamoTheme}>
      <Provider store={store} >
        <StatusBar showHideTransition barStyle='dark-content' animated backgroundColor={R.light}/>
        <AppNavigation/>
      </Provider>
    </PaperProvider>
  )
}
export default App;
