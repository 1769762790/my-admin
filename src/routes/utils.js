/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: HAI
 * @Date: 2020-06-01 15:18:52
 * @LastEditors: HAI
 * @LastEditTime: 2020-06-24 19:21:21
 */ 
import routeList from "./config";
import AdminConfig from "@/config";
export function findRoutesByPath(pathList, routeList, basename) {
  return routeList.filter(
    (child) => pathList.indexOf((basename || "") + child.path) !== -1
  );
}
/**
 *
 * 将路由转换为一维数组
 * @param routeList 路由
 * @param deep 是否深层转化
 * @param auth 路由是否需要检查授权, 路由配置的auth优先级比这里高
 */
export function flattenRoute(routeList, deep, auth) {
  const result = [];

  for (let i = 0; i < routeList.length; i += 1) {
    const route = routeList[i];

    result.push({
      ...route,
      auth: typeof route.auth !== 'undefined' ? route.auth : auth
    });

    if (route.children && deep) {
      result.push(...flattenRoute(route.children, deep, auth));
    }
  }

  return result;
}

function getLayoutRouteList() {
  return flattenRoute(routeList, false, false);
}

function getBusinessRouteList() {
  const routesList = routeList.filter((route) => route.path === "/");

  if (routesList.length > 0) {
    return flattenRoute(routesList, true, true);
  }
  return [];
}

function getSysRouteList() {
  const sysRoutes = routeList.filter((route) => route.path === "/system");

  if (sysRoutes.length > 0) {
    return flattenRoute(sysRoutes, true, false);
  }
  return [];
}

export function getPagePathList(pathname) {
  return (pathname || window.location.pathname)
    .split("/")
    .filter(Boolean)
    .map((value, index, array) =>
      "/".concat(array.slice(0, index + 1).join("/"))
    );
}

export function getPageTitle(routeList, pathname) {
  const route = routeList.find(child => child.path === pathname)

  return route ? route.meta.title : ''
}

/**
 * 这里会将 config 中所有路由解析成三个数组
 * 第一个: 最外层的路由，例如  Layout UserLayout ...
 * 第二个: 系统路由, 例如 Login Register RegisterResult
 * 第三个: 业务路由，为 / 路由下的业务路由
 */
export const businessRouteList = getBusinessRouteList();
export const systemRouteList = getSysRouteList();
export const layoutRouteList = getLayoutRouteList();

// 只有业务路由会有面包屑
export function getBreadcrumbs() {
  return findRoutesByPath(
    getPagePathList(),
    businessRouteList,
    AdminConfig.BASENAME
  );
}
