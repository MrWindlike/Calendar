import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Canvas from './routes/Canvas';

function RouterConfig({ history, text }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/canvas" exact component={Canvas} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
