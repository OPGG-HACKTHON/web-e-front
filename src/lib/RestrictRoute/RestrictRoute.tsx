/* eslint-disable react/require-default-props */
import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Token from 'lib/token';

type Props = {
  path: string;
  exact?: boolean;
  component: FC;
};

const RestrictRoute = ({ path, exact, component }: Props) => {
  if (Token.getToken('access_token') === undefined) {
    Token.clearToken('access_token');

    return <Redirect to="/" />;
  }

  return <Route exact={exact} path={path} component={component} />;
};

export default RestrictRoute;
