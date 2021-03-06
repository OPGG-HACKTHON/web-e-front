import React from 'react';
import GreetingPage from 'pages/GreetingPage';
import { Route, Switch } from 'react-router-dom';
import GlobalStyle from 'styles/GlobalStyle';
import ProfilePage from 'pages/ProfilePage';
import EditProfilePage from 'pages/EditProfilePage';
import SearchPage from 'pages/SearchPage';
import RestrictRoute from 'lib/RestrictRoute/RestrictRoute';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={GreetingPage} />
        <RestrictRoute exact path="/profile" component={ProfilePage} />
        <RestrictRoute exact path="/profile/:id" component={ProfilePage} />
        <RestrictRoute exact path="/profileEdit" component={EditProfilePage} />
        <Route exact path="/search" component={SearchPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;
