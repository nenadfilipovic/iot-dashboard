import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#ec5990',
    },
    background: {
      default: '#081229',
      paper: '#191d3a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ec5990',
    },
  },
  typography: { fontFamily: '"Quicksand", sans-serif;' },
  props: {
    MuiButtonBase: { disableRipple: true },
  },
  overrides: {},
  customProperties: {
    sideBarWidth: '270px',
  },
});

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    customProperties: {
      sideBarWidth: React.CSSProperties['width'];
    };
  }
  interface ThemeOptions {
    customProperties?: {
      sideBarWidth?: React.CSSProperties['width'];
    };
  }
}

export { theme };
