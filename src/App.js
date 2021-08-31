import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
import Home from './home';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exac path='/' component={Home} />
    </Switch>
  </BrowserRouter>
)

export default App;
