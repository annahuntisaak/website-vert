import React from 'react';
import Theme from './providers/Theme';
import MainPage from './components/organism/screens/MainPage';
import CustomCursor from './components/molecule/CustomCursor';
import { GlobalStyle } from './styles/globalStyle';

const App = () => {
  return (
    <Theme>
      <GlobalStyle />
      <CustomCursor />
      <MainPage />
    </Theme>
  );
};

export default App;
