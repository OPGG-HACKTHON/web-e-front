import React from 'react';
import GreetingPage from 'pages/GreetingPage';
import { Route, Switch } from 'react-router-dom';
import GlobalStyle from 'styles/GlobalStyle';
import ProfilePage from 'pages/ProfilePage';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={GreetingPage} />
        <Route exact path="/profile" component={ProfilePage} />
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;
