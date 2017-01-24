import React from "react";
import {Route, IndexRoute} from "react-router";
import LoadMaterials from "./LoadMaterials.js";
import MaterialList from "./pages/MaterialListPage.jsx";
import TopMenu from "./TopMenu.jsx";
import MaterialCreationPage from "./pages/MaterialCreationPage.jsx";
import MaterialReportPage from "./pages/MaterialReportPage.jsx";
import Login from "./pages/LoginPage.jsx";

const routes = (


    <Route component={LoadMaterials}>
        <Route path="/" component={TopMenu}>
            <IndexRoute component={Login}/>
            <Route path="logga-in" component={Login}/>
            <Route path="rapportera" component={MaterialReportPage}/>
            <Route path="skapa-material" component={MaterialCreationPage}/>
            <Route path="material-list" component={MaterialList}/>
            {/*<Route path="/prefab-material-list" component={MaterialList} allowComposite={true}/>
            <Route path="/anvant-material" component={MaterialList} materialUsageList={true}/>*/}
      </Route>
    </Route>
);
export default routes;