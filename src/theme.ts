import { createTheme } from '@mui/material/styles';
import mlColors from './util/ml-cdl-colors';
import {
  computerSmallMonitorMax,
  mobileScreenMax,
  mobileScreenMin,
  tabletScreenMax,
} from './util/breakpoints';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
    textLarge: true;
    textBasic: true;
    textSmall: true;
    textSub: true;
    buttonMedium: true;
    buttonSmall: true;
    buttonLarge: true;
  }
}

//UX variants definitions can be found at https://www.figma.com/file/bEonWYX4lesmqlFY6MqWCt/Course-Assembly-MVP?node-id=5540%3A249648
//Custom created variant names for typographies

declare module '@mui/material/styles/createTypography' {
  interface Typography {
    formTitle?: React.CSSProperties;
    formSubtitle?: React.CSSProperties;
    appTitle?: React.CSSProperties;
    title?: React.CSSProperties;
    textLarge?: React.CSSProperties;
    textBasic?: React.CSSProperties;
    textSmall?: React.CSSProperties;
    textSub?: React.CSSProperties;
    buttonMedium?: React.CSSProperties;
    buttonSmall?: React.CSSProperties;
    buttonLarge?: React.CSSProperties;
  }

  // allow configuration using `createMuiTheme`
  interface TypographyOptions {
    title?: React.CSSProperties;
    textLarge?: React.CSSProperties;
    textBasic?: React.CSSProperties;
    textSmall?: React.CSSProperties;
    textSub?: React.CSSProperties;
    buttonMedium?: React.CSSProperties;
    buttonSmall?: React.CSSProperties;
    buttonLarge?: React.CSSProperties;
  }
}

declare module '@mui/material/styles' {
  interface Theme {}
  interface ThemeOptions {}
  interface Palette {
    specials: Palette['primary'];
    aqua: Palette['primary'];
    black: Palette['primary'];
    blue: Palette['primary'];
    gray: Palette['primary'];
    green: Palette['primary'];
    magenta: Palette['primary'];
    orange: Palette['primary'];
    purple: Palette['primary'];
    red: Palette['primary'];
    teal: Palette['primary'];
    white: Palette['primary'];
    yellow: Palette['primary'];
  }
  interface PaletteOptions {
    specials: PaletteOptions['primary'];
    aqua: PaletteOptions['primary'];
    black: PaletteOptions['primary'];
    blue: PaletteOptions['primary'];
    gray: PaletteOptions['primary'];
    green: PaletteOptions['primary'];
    magenta: PaletteOptions['primary'];
    orange: PaletteOptions['primary'];
    purple: PaletteOptions['primary'];
    red: PaletteOptions['primary'];
    teal: PaletteOptions['primary'];
    white: PaletteOptions['primary'];
    yellow: PaletteOptions['primary'];
  }

  interface PaletteColor {
    macmillanRed?: string;
    offWhite?: string;
    veryLight?: string;
    medium?: string;
    veryDark?: string;
    fullPageDialogShadow?: string;
  }

  interface SimplePaletteColorOptions {
    macmillanRed?: string;
    offWhite?: string;
    veryLight?: string;
    medium?: string;
    veryDark?: string;
    fullPageDialogShadow?: string;
  }
}

export const theme = createTheme({
  palette: {
    background: {
      default: mlColors.off_white,
      paper: mlColors.pure_white,
    },
    primary: {
      main: mlColors.aqua,
    },
    secondary: {
      main: mlColors.aqua_dark,
    },
    specials: {
      main: mlColors.macmillan_red,
      macmillanRed: mlColors.macmillan_red,
      fullPageDialogShadow: 'rgba(0, 0, 0, 0.5)',
    },
    aqua: {
      main: mlColors.aqua,
      veryLight: mlColors.aqua_very_light,
      light: mlColors.aqua_light,
      medium: mlColors.aqua_medium,
      dark: mlColors.aqua_dark,
      veryDark: mlColors.dark_navy,
    },
    black: {
      main: mlColors.black,
    },
    blue: {
      main: mlColors.blue,
      veryLight: mlColors.blue_very_light,
      light: mlColors.blue_light,
      medium: mlColors.blue_medium,
      dark: mlColors.blue_dark,
    },
    gray: {
      main: mlColors.gray,
      veryLight: mlColors.gray_very_light,
      light: mlColors.gray_light,
      medium: mlColors.gray_medium,
      dark: mlColors.gray_dark,
      veryDark: mlColors.gray_very_dark,
    },
    green: {
      main: mlColors.green,
      veryLight: mlColors.green_very_light,
      light: mlColors.green_light,
      medium: mlColors.green_medium,
      dark: mlColors.green_dark,
    },
    magenta: {
      main: mlColors.magenta,
      veryLight: mlColors.magenta_very_light,
      light: mlColors.magenta_light,
      medium: mlColors.magenta_medium,
      dark: mlColors.magenta_dark,
    },
    orange: {
      main: mlColors.orange,
      veryLight: mlColors.orange_very_light,
      light: mlColors.orange_light,
      medium: mlColors.orange_medium,
      dark: mlColors.orange_dark,
    },
    purple: {
      main: mlColors.purple,
      veryLight: mlColors.purple_very_light,
      light: mlColors.purple_light,
      medium: mlColors.purple_medium,
      dark: mlColors.purple_dark,
    },
    red: {
      main: mlColors.red,
      veryLight: mlColors.red_very_light,
      light: mlColors.red_light,
      medium: mlColors.red_medium,
      dark: mlColors.red_dark,
    },
    teal: {
      main: mlColors.teal,
      veryLight: mlColors.teal_very_light,
      light: mlColors.teal_light,
      medium: mlColors.teal_medium,
      dark: mlColors.teal_dark,
      veryDark: mlColors.teal_very_dark,
    },
    white: {
      main: mlColors.pure_white,
      offWhite: mlColors.off_white,
    },
    yellow: {
      main: mlColors.yellow,
      veryLight: mlColors.yellow_very_light,
      light: mlColors.yellow_light,
      medium: mlColors.yellow_medium,
      dark: mlColors.yellow_dark,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: mobileScreenMin,
      md: mobileScreenMax,
      lg: tabletScreenMax,
      xl: computerSmallMonitorMax,
    },
  },
  spacing: 8,
  typography: {
    fontSize: 14,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      'Source Sans Pro',
      'sans-serif',
    ].join(','),
    allVariants: {
      fontWeight: 'normal',
    },
    button: {
      fontSize: 14,
      textTransform: 'uppercase',
    },
    h1: {
      color: mlColors.black,
      fontSize: 32,
      fontFamily: 'Source Sans Pro',
      fontWeight: 600,
    },
    h2: {
      color: mlColors.black,
      fontSize: 24,
      fontFamily: 'Source Sans Pro',
      fontWeight: 600,
    },
    h3: {
      color: mlColors.black,
      fontSize: 18,
      fontFamily: 'Source Sans Pro',
      fontWeight: 600,
    },
    h4: {
      color: mlColors.black,
      fontSize: 16,
      fontFamily: 'Source Sans Pro',
      fontWeight: 600,
    },
    title: {
      color: mlColors.black,
      fontSize: 28,
      fontFamily: 'Source Sans Pro',
      fontWeight: 200,
      fontStyle: 'normal',
    },
    textLarge: {
      color: mlColors.black,
      fontSize: 18,
      fontFamily: 'Source Sans Pro',
      fontWeight: 400,
      fontStyle: 'normal',
    },
    textBasic: {
      color: mlColors.black,
      fontSize: 16,
      fontFamily: 'Source Sans Pro',
      fontWeight: 400,
      fontStyle: 'normal',
    },
    textSmall: {
      color: mlColors.black,
      fontSize: 14,
      fontFamily: 'Source Sans Pro',
      fontWeight: 400,
      fontStyle: 'normal',
    },
    textSub: {
      color: mlColors.black,
      fontSize: 13,
      fontFamily: 'Source Sans Pro',
      fontWeight: 400,
      fontStyle: 'normal',
    },
    buttonLarge: {
      color: mlColors.black,
      fontSize: 15,
      fontFamily: 'Source Sans Pro',
      fontWeight: 400,
      fontStyle: 'normal',
    },
    buttonMedium: {
      color: mlColors.black,
      fontSize: 18,
      fontFamily: 'Source Sans Pro',
      fontWeight: 400,
      fontStyle: 'normal',
    },
    buttonSmall: {
      color: mlColors.black,
      fontSize: 12,
      fontFamily: 'Source Sans Pro',
      fontWeight: 400,
      fontStyle: 'normal',
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        filledError: {
          background: mlColors.red_very_light,
          color: mlColors.black,
          border: `1px solid ${mlColors.red}`,
        },
        filledInfo: {
          background: mlColors.blue_very_light,
          color: mlColors.black,
          border: `1px solid ${mlColors.blue}`,
        },
        filledSuccess: {
          background: mlColors.green_very_light,
          color: mlColors.black,
          border: `1px solid ${mlColors.green}`,
        },
        filledWarning: {
          background: mlColors.yellow_very_light,
          color: mlColors.black,
          border: `1px solid ${mlColors.yellow}`,
        },
      },
    },
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       fontSize: '1rem',
    //       textTransform: 'none',
    //       height: '35px',
    //       padding: '0 15px',
    //       margin: '5px',
    //       '&:focus': {
    //         boxShadow: '0 0 6px rgba(0, 117, 142, 1)',
    //         border: '1px solid #FFFFFF',
    //       },
    //       '&:disabled': {
    //         background: '#c8c8c8',
    //         color: '#f3f3f3',
    //       },
    //     },
    //     textSecondary: {
    //       fontSize: '0.9375rem',
    //       height: '34px',
    //       lineHeight: '33px',
    //       padding: '0 15px',
    //       borderRadius: '3px',
    //       '-webkit-border-radius': '3px',
    //       '-ms-border-radius': '3px',
    //       '-moz-border-radius': '3px',
    //       textDecoration: 'none',
    //       color: '#00758e',
    //       cursor: 'pointer',
    //       background: 'transparent',
    //       border: '1px solid #00758e',
    //       overflow: 'hidden',
    //     },
    //     containedPrimary: {
    //       '&:focus': {
    //         boxShadow: '0 0 6px rgba(0, 117, 142, 1)',
    //         border: '1px solid #FFFFFF',
    //       },
    //       '&:disabled': {
    //         background: '#c8c8c8',
    //         color: '#f3f3f3',
    //       },
    //     },
    //     outlinedSecondary: {
    //       '&:focus': {
    //         boxShadow: '0 0 6px rgba(0, 117, 142, 1)',
    //         border: '1px solid #00758e',
    //       },
    //       '&:disabled': {
    //         color: '#989898',
    //         fill: '#c8c8c8',
    //         backgroundColor: '#f3f3f3',
    //       },
    //     },
    //   },
    // },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple, on the whole application!
        focusRipple: false,
      },
    },
  },
});
