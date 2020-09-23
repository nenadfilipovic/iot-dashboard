import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#24292E',
    },
    secondary: {
      main: '#ADBEC5',
    },
    background: {
      default: '#FAFBFC',
    },
  },
  typography: { fontFamily: '"Roboto Condensed", sans-serif' },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiPaper: { variant: 'outlined' },
  },
  overrides: {
    MuiButton: {
      text: { textTransform: 'none' },
    },
    MuiPaper: { root: { boxShadow: '0 0 1px rgba(106,115,125,.35)' } },
  },
});

export { theme };
