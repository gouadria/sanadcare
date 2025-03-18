import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB', // Bleu SanadCare
    },
    secondary: {
      main: '#16A34A', // Vert validation
    },
    error: {
      main: '#DC2626', // Rouge erreurs
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
});