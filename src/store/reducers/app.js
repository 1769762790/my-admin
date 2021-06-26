/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: HAI
 * @Date: 2020-06-01 17:16:31
 * @LastEditors: HAI
 * @LastEditTime: 2020-06-07 22:47:56
 */ 
import * as types from "../action-types";
import { flattenRoute } from "../../routes/utils";

const initAPP = {
  fixedHeader: true,
  isCollapsed: true,
  init: false,
  routes: [],
  flattenRoutes: [],
  layout: 'left'
};

export default (state = initAPP, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.HEADER_SET_FIXED:
      return {
        ...state,
        fixedHeader: !state.fixedHeader,
      };
    case types.SIDER_SET_ISOPEN:
      return {
        ...state,
        isCollapsed: !state.isCollapsed,
      };
    case types.SET_SIDE_BAR_ROUTES:
      return {
        ...state,
        routes: payload,
        flattenRoutes: flattenRoute(payload, true, false),
        init: true
      };
    default:
      return state;
  }
};
