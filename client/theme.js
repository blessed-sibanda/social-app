import { createTheme } from '@mui/material/styles';
import { pink, blue, red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    openTitle: blue['700'],
    protectedTitle: pink['400'],
  },
});

export default theme;
