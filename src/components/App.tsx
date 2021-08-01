import React from 'react';
import GreetingPage from 'pages/GreetingPage';
import VideoModal from 'components/VideoModal';
import { Route, Switch } from 'react-router-dom';
import GlobalStyle from 'styles/GlobalStyle';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={VideoModal} />
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;
