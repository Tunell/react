import React from 'react';
import { Route } from 'react-router';

import MaterialBox from './MaterialBox.jsx';
import LoadMaterials from './LoadMaterials.js';

const routes = (

    <Route component={LoadMaterials} url="/api/comments" pollInterval={2000}>
      <Route path="/" component={MaterialBox}/>
    </Route>
)
export default routes;