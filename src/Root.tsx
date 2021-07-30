import React, { StrictMode } from 'react';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from 'components/App';
import { historySingleton } from 'singleton/history';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

const Root = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Router history={historySingleton}>
          <StrictMode>
            <App />
          </StrictMode>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default Root;
