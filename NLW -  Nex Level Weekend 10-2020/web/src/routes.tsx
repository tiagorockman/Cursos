import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

import Landing from './pages/Landing';
import Orphanato from './pages/Orfanato-Map';

function Routes(){
  return(
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Landing}/>
      <Route path="/app" component={Orphanato}/>
    </Switch>
    </BrowserRouter>
  );
}

export default Routes;