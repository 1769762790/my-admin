import React from 'react';
import { Layout } from 'antd'
import ScreenFull from '../ScreenFull'
import Notices from '../Notice'
import UserCenter from '../User'
import BreadCrumb from '../BreadCrumb'
import TagsView from '../TagsViews'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  } from '@ant-design/icons';
import './index.less'
import { connect } from 'react-redux';
import { setSiderOpen } from '@/store/actions/app'
import LayoutMenu from '../Nav'
const { Header } = Layout;

const MyHeader = (props) => {
    const { isCollapsed, fixedHeader, setSiderOpen, isShowTagView, layout } = props
    return (
        <div className={`header-container ${fixedHeader?'header-container--fix' : ''} ${!isCollapsed ? (fixedHeader ? 'header-container--close' : '') : ( fixedHeader ? 'header-container--min' : '')}`}>
            <Header className="header-container__header">
              <div className="header-left">
                {
                  layout === 'left' ? (
                    <>
                      <span className="trigger" onClick={setSiderOpen}>
                        {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                      </span>
                      <BreadCrumb />
                    </>
                  ) : <LayoutMenu />
                }
              </div>
              <div className="header-right">
                <ScreenFull />
                <Notices />
                <UserCenter />
              </div>
            </Header>
            {
              isShowTagView ? <TagsView /> : null
            }
            
        </div>
    );
}
 
export default connect(state => ({
    fixedHeader: state.app.fixedHeader,
    isCollapsed: state.app.isCollapsed,
    layout: state.app.layout,
    isShowTagView: state.tagViews.isShowTagView
}), {
  setSiderOpen
})(MyHeader);