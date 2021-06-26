import React, { memo } from "react";
import { businessRouteList } from "../routes/utils";
import { _local } from "@/lib/storage";
import { Redirect, Route } from "react-router-dom";
import store from "../store";

const checkAuth = (location) => {
  // redux 中的routes 同时负责渲染siderBar
  const { flattenRoutes } = store.getState().app;
  // 判断当前访问路由是否在系统路由中， 不存在直接走默认的404路由
  const route = businessRouteList.find(
    (child) => child.path === location.pathname
  );

  if (!route) {
    return true;
  }

  if (route.redirect) {
    return route.redirect;
  }

  if (route.auth === false) {
    return true;
  }

  // 路由存在于系统中，查看该用户是否有此路由的权限
  if (!flattenRoutes.find((child) => child.path === location.pathname)) {
    return false;
  }
  return true;
};

// 路由拦截
const Auth = ({location, route, ...reset}) => {
  // 未登录
  if (!_local.get("token")) {
    return <Redirect to="/system/login" />;
  }

  // 检查授权
  if ((typeof checkAuth(location) === 'string')) {
    return <Redirect to={checkAuth(location)}/>
  }
  if (!checkAuth(location)) {
    return <Redirect to="/error/403" push />;
  }
  if (!route.component) {
    return <Redirect to='/error/404'/>
  }
  // return <>{props.children}</>;
  return <route.component {...reset} />
};
export default memo(Auth);
