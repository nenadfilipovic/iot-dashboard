import { createMuiTheme } from '@material-ui/core/styles';

const boxShadow = '0 0 10px 3px rgba(162, 161, 161, 0.3)';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#EBEBEB',
    },
    primary: {
      main: '#101820FF',
    },
  },
  typography: {
    fontFamily: '"Nunito", sans-serif',
  },
  customProperties: {
    sidebarWidth: '250px',
    appBarHeight: '64px',
    boxShadow: boxShadow,
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: boxShadow,
      },
    },
  },
});

export { theme };
