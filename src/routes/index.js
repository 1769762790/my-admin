import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { _local } from '@/lib/storage'


const RenderRoutes = (props) => {
    const location = useLocation()
    console.log('RenderRoutes', location)
    const { routes } = props
    //筛除带有重定向的
    let routerDatepath = routes.filter((item) => {
        return !item.redirect
    })
    //筛选重定向
    let defualtRouter = routes.filter((item) => {
        return item.redirect
    })
    //重定向
    let defualtRedirect = defualtRouter.map((item, i) => {
        return <Redirect key={i} path={item.path} to={item.redirect}></Redirect>
    })
    return (
        <Switch location={location}>
            {
                routerDatepath.map((item, key) => {
                    return <Route
                            path={item.path}
                            render={props => {
                                document.title = item.title || "DEMO管理系统"
                                if (!_local.get('token')) {
                                    if (props.location.pathname === '/login') {
                                        return <item.component {...props} routes={item.children}/>
                                    }
                                    return <Redirect from={item.path} to='/login'/>
                                }
                                if (item.redirect) {
                                    return <Redirect to={item.path}/>
                                }
                                return <item.component {...props} routes={item.children}/>
                            }}
                            key={key} />
                }).concat(defualtRedirect)
            }
        </Switch>
    )
}


export default RenderRoutes;