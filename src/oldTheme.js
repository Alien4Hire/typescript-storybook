import { createTheme } from '@mui/material/styles';

// For more values refer to the Material-UI docs
// https://material-ui.com/customization/default-theme/#default-theme
// https://mui.com/customization/theming/#custom-variables
// declare module '@mui/material/styles' {
//   interface Theme {
//     palette<T>: {
//       danger: string;
//     };
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     status?: {
//       danger?: string;
//     };
//   }
// }

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 710,
      lg: 1030,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      main: '#00758E',
    },
    secondary: {
      main: '#00758E',
    },
    darkBackgroundColor: '#262626',
    fullPageDialogShadow: 'rgba(0, 0, 0, 0.5)',
    accordionTitle: '#f2f2f2',
    headline: '#6f6f6f',
    dividerGray: '#e0e0e0',
    inputBorderColor: '#e1e3e8',
    errorMessage: '#020202',
    darkGrayOverlay: 'rgba(8, 8, 8, 0.5)',
    base: {
      macmillanRed: '#da1b2c',
      black: '#080808',
      white: '#fff',
      offWhite: '#f8f8f8',
      offWhite2: '#f4f4f4',
      offWhite3: '#fafafa',
    },
    red: {
      veryLight: '#fce4e2',
      pale: '#ffe7e5',
      light: '#ffafaf',
      medium: '#ef5656',
      base: '#da1b2c',
      dark: '#a51426',
      skills: '#dd5714',
      skillsDivider: '#de5d20',
      mediumDark: '#a51426',
      insightsReport: '#da0052',
    },
    orange: {
      veryLight: '#ffe5d3',
      light: '#ffc196',
      medium: '#ff8a57',
      base: '#dd5714',
      dark: 'hsl(18, 85%, 36%)',
      skillsLabel: '#a83d0e',
    },
    yellow: {
      veryLight: '#fffbd7',
      light: '#faf2a9',
      medium: '#e5d676',
      base: '#b79e25',
      dark: '#74600c',
    },
    green: {
      veryLight: '#daf4d4',
      light: '#acdba2',
      medium: '#68b75f',
      base: '#3b822e',
      dark: '#2c5e20',
      highlight: '#daf4d4',
      successDark: '#3b822e',
      successLight: '#daf4d4',
    },
    teal: {
      veryLight: '#dbfff3',
      light: '#aee5d3',
      medium: '#5fb79c',
      base: '#218466',
      dark: '#16664b',
    },
    aqua: {
      pale: '#e5f2f3',
      veryLight: '#cff3f9',
      light: '#a2d6dd',
      medium: '#45a5b5',
      base: '#00758e',
      dark: '#205460',
    },
    blue: {
      veryLight: '#e0f1ff',
      light: '#b0daff',
      medium: '#3192d3',
      base: '#006eb8',
      mediumDark: '#004c72',
      veryDark: '#0a181f',
      lcrpLabel: '#006eb8',
      selection: '#cff3f9',
      reef: '#1565c0',
      mediumLight: '#4a90e2',
      cornflower: '#4990e2',
      insightsReport: '#00429d',
      lightInsightsReport: '#74bcd1',
    },
    purple: {
      veryLight: '#ffe6fd',
      light: '#e5c6e3',
      medium: '#b286af',
      base: '#865f7f',
      dark: '#543b50',
      macmillanPurple: '#3d2c70',
    },
    magenta: {
      veryLight: '#ffe6f3',
      light: '#edb0ce',
      medium: '#b26487',
      base: '#882345',
      dark: '#562135',
    },
    gray: {
      veryLight: '#f3f3f3',
      lightBorder: '#d8d8d8',
      light: '#ddd',
      medium: '#c8c8c8',
      base: '#989898',
      dark: '#686868',
      veryDark: '#383838',
      theDevils: '#666',
      closeButton: '#8f9da4',
      materialUi: '#0000004d',
      subText: '#555',
      cardSubText: '#c4c9cc',
      headerIcon: '#757575',
      dim: '#696969',
      gray: '#818181',
    },
    bars: {
      blueDark: '#142a35',
      headingBlue_gray: '#8f9da4',
      headingTitleText: '#fff',
    },
    buttonEffects: {
      aquaHover: 'rgba(0, 117, 142, 0.1)',
      redHover: 'rgba(218, 27, 44, 0.1)',
      button_focus: 'rgba(0, 117, 142, 1)',
    },
    shadows: {
      shadowBlack: 'rgba(0, 0, 0, 0.25)',
    },
  },
  typography: {
    fontFamily: '"Source Sans Pro", sans-serif',
    heading: {
      xl: '2rem',
      lg: '1.5rem',
      md: '1.125rem',
      sm: '1rem',
    },
    smallText: '0.75rem',
    basicText: '0.875rem',
    subText: '0.8125rem',
    fontExtraLightWeight: 200,
    fontLightWeight: 300,
    fontRegularWeight: 400,
    fontSemiBoldWeight: 600,
    fontBoldWeight: 700,
    fontBlackWeight: 900,
  },
  nav: {
    expanded: '225px',
    collapsed: '70px',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          textTransform: 'none',
          height: '35px',
          padding: '0 15px',
          margin: '5px',
          '&:focus': {
            boxShadow: '0 0 6px rgba(0, 117, 142, 1)',
            border: '1px solid #FFFFFF',
          },
          '&:disabled': {
            background: '#c8c8c8',
            color: '#f3f3f3',
          },
        },
        label: {
          display: 'flex',
          width: 'auto',
          textTransform: 'none',
          justifyContent: 'space-between',
        },
        textSecondary: {
          fontSize: '0.9375rem',
          height: '34px',
          lineHeight: '33px',
          padding: '0 15px',
          borderRadius: '3px',
          '-webkit-border-radius': '3px',
          '-ms-border-radius': '3px',
          '-moz-border-radius': '3px',
          textDecoration: 'none',
          color: '#00758e',
          cursor: 'pointer',
          background: 'transparent',
          border: '1px solid #00758e',
          overflow: 'hidden',
        },
        containedPrimary: {
          '&:focus': {
            boxShadow: '0 0 6px rgba(0, 117, 142, 1)',
            border: '1px solid #FFFFFF',
          },
          '&:disabled': {
            background: '#c8c8c8',
            color: '#f3f3f3',
          },
        },
        outlinedSecondary: {
          '&:focus': {
            boxShadow: '0 0 6px rgba(0, 117, 142, 1)',
            border: '1px solid #00758e',
          },
          '&:disabled': {
            color: '#989898',
            fill: '#c8c8c8',
            backgroundColor: '#f3f3f3',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        filledError: {
          background: '#fce4e2',
          color: '#000000',
          border: '1px solid #da1b2c',
        },
        filledInfo: {
          background: '#e0f1ff',
          color: '#000000',
          border: '1px solid #006eb8',
        },
        filledSuccess: {
          background: '#daf4d4',
          color: '#000000',
          border: '1px solid #3b822e',
        },
        filledWarning: {
          background: '#fffbd7',
          color: '#000000',
          border: '1px solid #b79e25',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple, on the whole application!
        focusRipple: false,
      },
    },
  },
  // overrides: { // https://material-ui.com/es/customization/components/#global-css-override
  //   MuiButton: {
  //     root: {
  //       fontSize: '1rem',
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
  //     label: {
  //       display: 'flex',
  //       width: 'auto',
  //       textTransform: 'capitalize',
  //       justifyContent: 'space-between',
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
  //   MuiTooltip: {
  //     arrow: {
  //       color: '#142a35',
  //     },
  //     tooltip: {
  //       backgroundColor: '#142a35',
  //       color: '#fff',
  //       fontSize: '0.875rem',
  //     },
  //   },
  //   MuiTypography: {
  //     root: {
  //       '&.MuiTypography-noWrap::after': {
  //         content: '""',
  //         display: 'block',
  //       },
  //     },
  //   },
  //   MuiAlert: {
  //     root: {
  //       fontSize: '1rem',
  //       minHeight: '34px',
  //       minWidth: '450px',
  //       borderRadius: '0px !important',
  //       backgroundColor: '#fffbd7',
  //       '&.MuiAlert-outlinedWarning': {
  //         border: '1px solid #74600c',
  //         '& .MuiAlert-icon': {
  //           color: '#74600c',
  //         },
  //       },
  //       '& .MuiAlert-action': {
  //         color: '#686868',
  //         '& .MuiIconButton-root': {
  //           transition: 'none',
  //           '&:hover': {
  //             backgroundColor: 'transparent',
  //           },
  //         },
  //         '& .MuiSvgIcon-root': {
  //           fontSize: '1.75rem',
  //         },
  //       },
  //       '& .MuiAlert-message': {
  //         color: '#080808',
  //       },
  //     },
  //   },
  // },
  // props: { // https://material-ui.com/customization/globals/#default-props
  //   // Name of the component
  //   MuiButtonBase: {
  //     // The default props to change
  //     disableRipple: true, // No more ripple, on the whole application!
  //     focusRipple: false,
  //   },
  // },
});
