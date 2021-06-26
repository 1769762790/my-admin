import React, { useState } from 'react';
import { Layout } from 'antd'
import Nav from './menu'
import { getSidebarTheme, setSidebarTheme } from '@/lib/cookie'
import AdminConfig from '../../../config'
import logo from '../../../assets/logo192.png'
import './sider.less'

const { Sider } = Layout;

const SiderNav = (props) => {
    const {
        collapsed,
        setCollapsed,
        isFixedLogo
    } = props
    const [siderMode, setSiderMode] = useState(getSidebarTheme() || 'dark')
    // 切换侧边栏主题色
    const handleChangeMode = (value) => {
        setSiderMode(value ? 'dark' : 'light')
        setSidebarTheme(value ? 'dark' : 'light')
    }
    return (
        <Sider
            className={`layout-nav ${siderMode==='light' ? 'layout-nav__light' : 'layout-nav__dark'}`}
            trigger={null} 
            collapsible 
            breakpoint="lg"
            collapsedWidth="80px"
            onBreakpoint={setCollapsed}
            width='256'
            collapsed={collapsed}>
            <div className={`logo ${isFixedLogo ? 'logo-fixed' : ''}`} >
                <img src={logo} alt='' />
                <h1 className={ `logo-title ${collapsed ? 'hidden-title' : 'show-title'}`}>{AdminConfig.title}</h1>
            </div>
            <Nav collapsed={collapsed}
                siderMode={siderMode}
                handleChangeMode={handleChangeMode}/>
        </Sider>
    );
}
 
export default SiderNav;