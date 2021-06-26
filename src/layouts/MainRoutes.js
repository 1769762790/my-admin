import React, { useMemo, memo } from "react";
import { businessRouteList } from "../routes/utils";
import { Route } from "react-router-dom";
import Auth from "./Auth";
import AsyncRoutes from "./AsyncRoutes";


function renderRoute(route) {

  return (
    <Route
      key={route.path}
      exact={route.path !== '*'}
      path={route.path}
      render={props => (
        <Auth {...props} route={route}>
          {/* {
            route.component ? <route.component {...props} /> : null
          } */}
        </Auth>
      )}
    ></Route>
  );
}

function renderRouteList() {
  const result = [];
  businessRouteList.forEach((child) => {
    result.push(renderRoute(child));
  });

  return result;
}

function MainRoutes() {
  const routeList = useMemo(() => renderRouteList(), []);

  return (
    <AsyncRoutes>
      {
        routeList
      }
    </AsyncRoutes>
  );
}

export default memo(MainRoutes);
