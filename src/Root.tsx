import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from 'components/App';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

const Root = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <StrictMode>
            <App />
          </StrictMode>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default Root;
