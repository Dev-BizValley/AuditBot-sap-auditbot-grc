import { createMuiTheme } from '@material-ui/core/styles';

export const FALLBACK_FONT_FAMILY = "'Inter', sans-serif";

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2563eb', // Professional blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#64748b', // Slate
    },
    background: {
      default: '#f8fafc', // Light slate gray
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.87)',
    },
  },
  typography: {
    // fontFamily: '"Outfit", "Inter", "system-ui", sans-serif',
    fontFamily: FALLBACK_FONT_FAMILY,
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
  }
});

// export const MENU_FONT_FAMILY = theme.typography.fontFamily;
export const MENU_FONT_FAMILY = FALLBACK_FONT_FAMILY;

export const getDynamicFont = (colors) => {
  return (colors && colors.length > 16 && colors[16]) ? colors[16] : FALLBACK_FONT_FAMILY;
};

export default theme;
