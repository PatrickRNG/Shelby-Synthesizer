import React, { useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

import { withRouter } from 'react-router';
import { Synthesizer, Dashboard } from '../../views';

const Main = () => {
  
  return (
    <Switch>
      <Route exact path="/synthesizer" component={Synthesizer} />
      <Route exact path="/" component={Dashboard} />
    </Switch>
  );
};

export default withRouter(Main);
