import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#EBEBEB',
    },
    primary: {
      main: '#64223c',
    },
  },
  typography: {
    fontFamily: '"Raleway", sans-serif',
  },
  customProperties: {
    sidebarWidth: '250px',
    appBarHeight: '64px',
  },
});

export { theme };
