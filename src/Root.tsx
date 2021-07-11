import React from "react";
import { StrictMode } from "react";
import { Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "components/App";
import { historySingleton } from "singleton/history";

const Root = () => {
  return (
    <RecoilRoot>
      <Router history={historySingleton}>
        <StrictMode>
          <App />
        </StrictMode>
      </Router>
    </RecoilRoot>
  );
};

export default Root;
