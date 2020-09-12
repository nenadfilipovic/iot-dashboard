import { createMuiTheme } from '@material-ui/core/styles';

const oldMauve = '#64223c';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#EBEBEB',
    },
    primary: {
      main: oldMauve,
    },
    divider: 'rgb(230, 236, 240)',
  },
  typography: {
    fontFamily: '"Raleway", sans-serif',
  },
});

export { theme };
