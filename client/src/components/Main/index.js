import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

const Test = () => <div>test</div>;

const Main = () => {
  return (
    <main>
      <Switch>
        <div>
          <Route exact path="/doc" component={Test} />
        </div>
      </Switch>
    </main>
  );
};

export default withRouter(Main);
