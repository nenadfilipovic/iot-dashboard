import { createMuiTheme } from '@material-ui/core/styles';

const sailorBlue = '#00203F';
const mint = '#ADEFD1';

const theme = createMuiTheme({
  typography: {
    fontFamily: `Raleway`,
  },
  palette: {
    primary: {
      main: mint,
    },
    secondary: {
      main: sailorBlue,
    },
  },
});

export { theme };
