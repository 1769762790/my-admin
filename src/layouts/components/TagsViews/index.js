import React, { useRef, useState, useEffect, useMemo } from 'react';
import './index.less'
import { connect } from 'react-redux';
import { Tag } from 'antd'
import { withRouter } from 'react-router-dom';
import Utils from '@/lib'
import { addTag } from '@/store/actions/tagViews'
import { delTag, closeOther, closeAll } from '@/store/actions/tagViews'
import { businessRouteList } from '../../../routes/utils';

const TagsViews = ({ tagList, addTag, delTag, closeOther, closeAll, fixedHeader, isOpen,  history, routes }) => {
    const tagListContainer = useRef()
    const contextMenuContainer = useRef()
    const [menuVisible, setMenuVisible] = useState(false)
    const [currentTag, setCurrentTag] = useState(null)
    const [menuPosition, setMenuPosition] = useState({
        left: 0,
        top: 0
    })
    const handleClose =(tag) => {
        const path = tag.path
        const currentPath = history.location.pathname
        const length = tagList.length
        if (path === '/dashboard') {
            return
        }
        // 如果关闭的是当前页，跳转到最后一个tag
        if (path === currentPath) {
            history.push(tagList[length - 1].path)
        }
        // 如果关闭的是最后的tag,且当前显示的也是最后的tag的对应页面，才作路由跳转
        if (
            path === tagList[length - 1].path && 
            currentPath === tagList[length - 1].path
        ) {
            if (length - 2 > 0) {
                history.push(tagList[length - 2].path)
            } else if (length === 2) {
                history.push(tagList[0].path)
            }
        }
        delTag(tag)
    }
    // 跳转tag
    const goToTag = (tag) => {
        history.push(tag.path)
    }
    // 打开鼠标右键
    const openContextMenu = (tag, e) => {
        e.preventDefault()
        const menuMinWidth = 105
        const offsetLeft = e.target.offsetLeft
        const clickX = e.clientX
        const clickY = e.clientY
        // const clientWidth = tagListContainer.current.clientWidth
        const maxLeft = clickX - menuMinWidth

        // 当鼠标点击
        if(offsetLeft > maxLeft) {
            setMenuPosition({
                ...menuPosition,
                left: offsetLeft,
                top: clickY,
            })
            setMenuVisible(true)
            setCurrentTag(tag)
        } else {
            setMenuPosition({
                ...menuPosition,
                top: clickY,
                left: offsetLeft + 15
            })
            setMenuVisible(true)
            setCurrentTag(tag)
        }
    }
    // 点击菜单以外区域关闭菜单
    const handleClickOutside = (e) => {
        const isOutside = !(
            contextMenuContainer.current &&
            contextMenuContainer.current.contains(e.target)
        );
        if (isOutside && menuVisible) {
            closContextMenu();
        }
    }
    // 关闭菜单
    const closContextMenu = () => {
        setMenuVisible(false)
    }
    // 关闭其他标签
    const handleCloseOtherTags = () => {
        const { path } = currentTag
        closeOther(currentTag)
        history.push(path)
        closContextMenu()
    }
    // 关闭所有标签
    const handleCloseAllTags = () => {
        closeAll()
        history.push(tagList[0].path)
        closContextMenu()
    }
    // 关闭当前tag
    const handleCloseCurrentTag = () => {
        handleClose(currentTag)
        closContextMenu()
    }
    // 刷新当前路由
    const refreshCurrentTag = () => {
        history.push({
            pathname: '/redirect',
            state: {
                path: currentTag.path
            }
        })
        closContextMenu()
    }
    useEffect(() => {
        // console.log(history.location.pathname)
        // console.log(window.location.pathname)
        // console.log(routes)
        // let menuItem = Utils.getMenuItemInMenuListByProperty(routes, 'path', history.location.pathname)
        // console.log(menuItem)
        // if (menuItem) {
        //     addTag(menuItem)
        // }
        initTagViews(routes)
    }, [routes])
    // 初始设置affixTags
    function initTagViews(routes) {
        let currentAffixTags = filterAffixTag(routes)
        let menuItem = Utils.getMenuItemInMenuListByProperty(routes, 'path', history.location.pathname)

        addTag([...currentAffixTags])
        
        if (menuItem) {
            addTag([menuItem])
        }
        console.log(currentAffixTags)
    }
    // 过滤出affix的菜单
    function filterAffixTag (routes) {
        let affixTags = []
        routes.forEach(item => {
            if (item.meta && item.meta.affix) {
                affixTags.push(item)
            }
            if (routes.children && routes.children.length > 0) {
                let childAffix = filterAffixTag(routes.children)
                if (childAffix.length > 1) {
                    affixTags = [...affixTags, ...childAffix]
                }
            }
        })
        return affixTags
    }
    // 监听点击menu点击
    useEffect(() => {
        window.addEventListener('click', handleClickOutside)
        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [menuVisible])
    const pathname = useMemo(() => (
        history.location.pathname
      ), [history.location.pathname])
    return (
        <>
            <div className='tagsViews' ref={tagListContainer}>
                {
                    tagList.map(tag => {
                        return (
                            <Tag
                            closable={tag.path !== '/dashboard'} 
                            className={`tagsViews-item ${pathname === tag.path ? 'active' : ''}`}
                            color={pathname === tag.path ? "#42b983" : "#666"}
                            onClick={() => goToTag(tag)}
                            onClose={() => handleClose(tag)}
                            onContextMenu={(e) => openContextMenu(tag, e)}
                            key={tag.path}>
                            {tag.meta.title}
                            </Tag>
                        )
                    })
                }
            </div>
            {
                menuVisible ? (
                    <ul className='contextMenu'
                     ref={contextMenuContainer}
                     style={{left: `${menuPosition.left}px`, top: `${menuPosition.top}px`}}>
                        <li onClick={refreshCurrentTag}>刷新</li>
                        <li onClick={handleCloseCurrentTag}>关闭</li>
                        <li onClick={handleCloseOtherTags}>关闭其他</li>
                        <li onClick={handleCloseAllTags}>关闭所有</li>
                    </ul>
                ) : null
            }
        </>
    );
}
 
export default connect( state => ({
    tagList: state.tagViews.tagList,
    fixedHeader: state.app.fixedHeader,
    isOpen: state.app.isOpen,
    routes: state.app.routes
}), {
    addTag,
    delTag,
    closeOther,
    closeAll
})(withRouter(TagsViews));