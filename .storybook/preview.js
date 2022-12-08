import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../src/theme';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';

// Create your own theme like this.
// Note: you can specify theme name in themeName field. Otherwise it will be displayed by the number.
// you can specify only required fields overriding the Light Base Theme

// const themingDecorator = withThemes(ThemeProvider, [theme]);

// const providerFn = ({ theme, children }) => {
//   const muTheme = createTheme(theme);
//   return <ThemeProvider theme={muTheme}>{children}</ThemeProvider>;
// };

// pass ThemeProvider and array of your themes to decorator
// addDecorator(withThemes(null, [theme], { providerFn }));
// const themingDecorator = withThemes(null, [theme], { providerFn });

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
