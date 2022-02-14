import { createTheme } from '@mui/material/styles';
import { scrollbar } from './scrollbar';
import { initial } from './theme';

declare module '@mui/material/styles/createPalette' {
  interface Neutral {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }
  interface PaletteOptions {
    neutral: Neutral;
  }

  interface Palette {
    neutral: Neutral;
  }
}

const theme = createTheme(initial, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...scrollbar,
      },
    },
  },
  typography: {
    h4: {
      ...initial.typography.h3,
      [initial.breakpoints.up('xs')]: {
        fontSize: '1.5rem',
      },
      [initial.breakpoints.up('sm')]: {
        fontSize: '1.8182rem',
      },
      [initial.breakpoints.up('md')]: {
        fontSize: '2rem',
      },
    },
  },
});

export { theme };
export type Theme = typeof theme;
