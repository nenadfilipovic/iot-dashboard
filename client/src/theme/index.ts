import { createMuiTheme } from '@material-ui/core/styles';

// const themeConfig = {
//   lighterBlue: '#191d3a',
//   darkShadow: '0 0 5px 0 #000',
//   windowShadow: '1px solid #e1e4e8',
// };

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#24292e',
    },
    secondary: {
      main: '#ec5990',
    },
    background: {
      default: '#081229',
    },
    text: {
      primary: '#24292e',
    },
    error: {
      main: '#ec5990',
    },
  },
  typography: { fontFamily: '"Quicksand", sans-serif;' },
  props: {
    MuiButton: { size: 'small' },
    MuiButtonBase: { disableRipple: true },
  },
});

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    customProperties: {};
  }
  interface ThemeOptions {
    customProperties?: {};
  }
}

export { theme };
