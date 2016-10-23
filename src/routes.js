import React from 'react';
import { Route } from 'react-router';

import LoadMaterials from './LoadMaterials.js';
import MaterialBox from './MaterialBox.jsx';
import MaterialList from './MaterialList.jsx';
import TopMenu from './TopMenu.jsx';
import MaterialCreationPage from './MaterialCreationPage.jsx';
import MaterialReportPage from './MaterialReportPage.jsx';

const routes = (

    <Route component={TopMenu}>
      <Route component={LoadMaterials} url="/api/materials" pollInterval={2000}>

        <Route path="/" component={MaterialReportPage}/>
        <Route path="/skapa-material" component={MaterialCreationPage}/>
        <Route path="/combo-vy" component={MaterialBox}/>
        <Route path="/material-list" component={MaterialList}/>
        <Route path="/prefab-material-list" component={MaterialList} allowComposite={true}/>
        <Route path="/anvant-material" component={MaterialList} materialUsageList={true}/>
      </Route>
    </Route>
)
export default routes;