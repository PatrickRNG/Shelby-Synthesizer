import React from 'react';
import { Route } from 'react-router-dom';

const ContextRoute = ({
  contextProvider: Provider,
  component: Component,
  contextValue,
  ...rest
}) => {
  return (
    <Route {...rest}>
      <Provider value={contextValue}>
        <Component />
      </Provider>
    </Route>
  );
};

export default ContextRoute;
