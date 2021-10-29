import { darkScrollbar } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: "#0288d1",
        light: "#03a9f4",
        dark: "#01579b"
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: darkScrollbar(),
        },
      },
    },
  });