import { createMuiTheme } from '@material-ui/core/styles';

const sailorBlue = '#00203FFF';
const mint = '#ADEFD1FF';
const cultured = '#F7F9FB';

const theme = createMuiTheme({
  palette: {
    background: {
      default: cultured,
    },
    primary: {
      main: sailorBlue,
    },
    secondary: {
      main: mint,
    },
  },
  typography: {
    fontFamily: '"Raleway", sans-serif',
  },
});

export { theme };
