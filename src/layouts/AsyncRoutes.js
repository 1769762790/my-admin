import React, { memo } from "react";
import { getMenuList } from "./service";
import { connect } from "react-redux";
import { setSideBarRoutes } from "@/store/actions/app";
import { Spin } from "antd";
import TransitionMain from "./components/TransitionMain";

/**
 *
 * 将菜单数据转换成路由
 * @param menus 菜单list
 */
function formatMenuToRoute(menus) {
  const result = [];

  menus.forEach(menu => {
    const route = {
      path: menu.url,
      meta: {
        title: menu.name,
        icon: menu.icon,
        affix: menu.affix
      },
    };
    if (menu.children) {
      route.children = formatMenuToRoute(menu.children);
    }
    result.push(route);
  });

  return result;
}

// 异步菜单
function AsyncRoutes({ init, setSideBarRoutes, children }) {
  if (!init) {
    getMenuList()
      .then(({ data }) => {
        setSideBarRoutes(formatMenuToRoute(data));
      })
      .catch(() => {});

    return <Spin />;
  }

  
  return <TransitionMain>{children}</TransitionMain>;

}

export default connect(
  (state) => ({
    init: state.app.init,
  }),
  {
    setSideBarRoutes,
  }
)(memo(AsyncRoutes));
