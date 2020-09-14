import { createMuiTheme } from '@material-ui/core/styles';

const oldMauve = '#64223c';
const platinum = '#EBEBEB';

const theme = createMuiTheme({
  palette: {
    background: {
      default: platinum,
    },
    primary: {
      main: oldMauve,
    },
  },
  typography: {
    fontFamily: '"Raleway", sans-serif',
  },
});

export { theme };
