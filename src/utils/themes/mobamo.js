import {configureFonts, DefaultTheme} from 'react-native-paper';
import fontConfig from './fonts/defaullt';
import C from './colors';

const theme={
    ...DefaultTheme,
    fonts:configureFonts(fontConfig),
    colors:{
        ...DefaultTheme.colors,
        primary: C.primary,
        //background: 'green',
        //surface: 'red',
        accent: C.accent,
        //error: 'teal',
        //text: 'yellow',
        //onSurface: 'gold',
        //disabled: 'pink',
        //placeholder: 'cyan',
        //backdrop: 'brown',
        //notification: 'blue',
    }
}

export {theme as mobamoTheme}
