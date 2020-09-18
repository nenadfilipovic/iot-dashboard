import { createMuiTheme } from '@material-ui/core/styles';

const themeSettings = {
  colors: {
    main: '#3E3E3E',
    secondary: '#FE5676',
    background: '#ffffff',
    divider: '#EBEBEB',
    text: {
      primary: '#3E3E3E',
      secondary: '#A0A3A7',
    },
  },
  typography: {
    fontFamily: 'Raleway',
  },
  custom: {
    sidebarWidth: 300,
    sidebarBackgroundColor: '#fbfbfb',
  },
};

const { colors, typography, custom } = themeSettings;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.main,
    },
    secondary: {
      main: colors.secondary,
    },
    divider: colors.divider,
    background: {
      default: colors.background,
    },
    text: colors.text,
  },
  custom: custom,
  typography: typography,
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiSvgIcon: {
      color: 'primary',
    },
    MuiPaper: { variant: 'outlined' },
  },
});

export { theme };
