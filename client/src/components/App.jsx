import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Reviews from './Reviews.jsx';
import NotFound from './NotFound.jsx';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Reviews}/>
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;