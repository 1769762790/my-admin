import React, { useState, useEffect } from 'react';
import { Menu, Switch } from 'antd';
import {
    MenuUnfoldOutlined,
    UserOutlined,
    BarChartOutlined,
    DashboardOutlined,
    ShakeOutlined
  } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './index.less'
import { connect } from 'react-redux';
import { addTag } from '@/store/actions/tagViews'
import Utils from '@/lib'

const { SubMenu } = Menu;
// const menuList = [
//     {
//         title: '仪表盘',
//         key: '/home/dashboard',
//         icon: <DashboardOutlined />,
//     },
//     {
//         title: '列表管理',
//         key: '/home/list',
//         icon: <UserOutlined />,
//         children: [
//             {
//                 title: '用户列表',
//                 key: '/home/list/userList',
//                 icon: <MenuUnfoldOutlined />,
//             }
//         ]
//     },
//     {
//         title: 'Echarts',
//         key: '/home/echarts',
//         icon: <BarChartOutlined />
//     },
//     {
//         title: 'Animate',
//         key: '/home/animate',
//         icon: <ShakeOutlined />
//     }
// ]
const iconMap = {
    DashboardOutlined: <DashboardOutlined/>,
    UserOutlined: <UserOutlined/>,
    MenuUnfoldOutlined: <MenuUnfoldOutlined/>,
    BarChartOutlined: <BarChartOutlined/>,
    ShakeOutlined: <ShakeOutlined/>
}
function renderIcon (icon = 'MenuUnfoldOutlined') {
    return iconMap[icon]
} 
// 递归渲染菜单
const renderMenu = (menuList) => {
    return menuList.map(item => {
        if (item.children && item.children.length) {
            return (
                <SubMenu key={item.path} title={item.meta.title} icon={renderIcon(item.meta.icon)}>
                    {
                        renderMenu(item.children)
                    }
                </SubMenu>
            )
        }
        return (
            <Menu.Item key={item.path} icon={renderIcon(item.meta.icon)}>
                <Link to={item.path}>{item.meta.title}</Link>
            </Menu.Item>
        )
    })
}
// 侧边菜单
const Nav = (props) => {
    const { collapsed, siderMode, handleChangeMode, addTag, routes } = props
    const { pathname } = useLocation()
    const [isChecked, setIsChecked] = useState(siderMode === 'light' ? false : true)
    const [openKey, setOpenKey] = useState([])
    // 初始添加tag
    useEffect(() => {
        handleMenuSelect({key: pathname})
    }, [pathname])
    // 设置菜单主题
    useEffect(() => {
        setIsChecked(siderMode === 'light' ? false : true)
    }, [siderMode])
    // 初始设置openKeys
    // useEffect(() => {
    //     let currentOpenKey = ''
    //     menuList.reduce((pre, item) => {
    //         if(item.children) {
    //             const cItem = item.children.find(v => pathname.indexOf(v.key) === 0)
    //             if (cItem) {
    //                 currentOpenKey = item.key
    //             }
    //         }
    //     })
    //     setOpenKey(prev => [...prev, currentOpenKey])
    // }, [pathname])
     //菜单选择
     const handleMenuSelect = ({ key = '/dashboard' }) => {
        let menuItem = Utils.getMenuItemInMenuListByProperty(routes, 'path', key)
        if (menuItem && menuItem.path !== '/dashboard') {
            addTag([menuItem])
        }
    }
    // SubMenu 展开/关闭的回调
    const handleOpenChange = (data) => {
        console.log(data)
        setOpenKey([...data])
    }
    return (
        <>
            <div className={`menu-container`}>
                <Menu
                    theme={siderMode}
                    onSelect={handleMenuSelect}
                    onOpenChange={handleOpenChange}
                    openKeys={openKey}
                    selectedKeys={[pathname]}
                    mode="inline">
                    {
                        renderMenu(routes)
                    }
                </Menu>
            </div>
            {
                !collapsed ? (
                    <div className={`switch-theme ${siderMode==='light' ? 'menu-switch__light' : 'menu-switch__dark'}`}>
                        <span>切换主题</span>
                        <Switch
                        checkedChildren="暗" 
                        unCheckedChildren="明" 
                        checked={isChecked}
                        onChange={handleChangeMode} /> 
                    </div>
                ) : null
            }
        </>
    );
}
 
export default connect(state => ({
    routes: state.app.routes
}), {
    addTag
})(Nav);