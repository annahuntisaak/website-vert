import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: 'rgb(68, 33, 9)',
    background: '#fff6f2',
    text: 'rgb(81, 56, 46)',
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
