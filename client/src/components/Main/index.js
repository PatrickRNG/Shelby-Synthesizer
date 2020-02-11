import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import { Synthesizer } from '../../views';

const Main = () => {
  return (
    <main style={{height: '100%'}}>
      <Switch>
        <Route exact path="/synthesizer" component={Synthesizer} />
      </Switch>
    </main>
  );
};

export default withRouter(Main);
