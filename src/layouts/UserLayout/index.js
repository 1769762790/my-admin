import React, { useEffect } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { systemRouteList } from "@/routes/utils";
import Login from "../../pages/user";
import { getPageTitle } from "../../routes/utils";
const UserLayout = () => {
  console.log('systemRouteList', systemRouteList);

  const location = useLocation();
  useEffect(() => {
    const title = getPageTitle(systemRouteList, location.pathname);
    document.title = title + "react-admin" || "react-admin";
  }, [location.pathname]);
  return (
    <>
      <Switch>
        {systemRouteList.map((menu) => (
          <Route
            exact
            key={menu.path}
            path={menu.path}
            render={props => {
              if (menu.redirect) {
                return <Redirect exact to={menu.redirect}/>
              }
              return <menu.component/>
            }}
          ></Route>
        ))}
      </Switch>
    </>
  );
};

export default UserLayout;
