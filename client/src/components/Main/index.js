import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import { Synthesizer } from '../../views';

const Main = () => {
  return (
    <Switch>
      <Route exact path="/synthesizer" component={Synthesizer} />
    </Switch>
  );
};

export default withRouter(Main);
