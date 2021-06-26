import React from "react";
import { Layout } from "antd";
import "./index.less";
import Nav from "./components/Nav";
import RenderRoutes from "../routes";
import { useLocation } from "react-router-dom";
import MyHeader from "./components/Header";
import { connect } from "react-redux";
import { setSiderOpen } from "@/store/actions/app";
import MainRoutes from "./MainRoutes";

const { Content } = Layout;

const Main = (props) => {
  const { routes, fixedHeader, isCollapsed, setSiderOpen, isShowTagView } = props;
  // const setIsOpen = (value) => {
  //   // 侧边栏已收缩且出发断点则不展开
  //   if (!value) {
  //     setSiderOpen(true)
  //   } else {
  //     setSiderOpen(false)
  //   }
  // }
  return (
    <Layout className="layout">
      <Nav collapsed={isCollapsed} setCollapsed={setSiderOpen} />
      <Layout
        className={`site-layout layout-right ${
          fixedHeader ? "layout-right--fixed" : ""
        } ${fixedHeader && !isShowTagView ? 'layout-right--paddingMin' : ''}`}
        style={{ marginLeft: isCollapsed ? "80px" : "256px" }}
      >
        <MyHeader />
        <Content className="layout-right__content">
          {/* <RenderRoutes routes={routes} /> */}
          <MainRoutes />
        </Content>
      </Layout>
    </Layout>
  );
};

export default connect(
  state => ({
    fixedHeader: state.app.fixedHeader,
    isCollapsed: state.app.isCollapsed,
    isShowTagView: state.tagViews.isShowTagView
  }),
  {
    setSiderOpen,
  }
)(Main);
