import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import RenderRoutes from './routes'
import routeList from './routes/config'
import { ConfigProvider } from 'antd';
import zhCN from "antd/es/locale/zh_CN";
import store from './store'
import AdminConfig from '@/config'
import { layoutRouteList } from './routes/utils';
import Dash from './pages/dashboard'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
          <Router basename={AdminConfig.BASENAME}>
            {/* <RenderRoutes routes={routeList}/> */}
            <Switch>
              {
                layoutRouteList.map(route => (
                  <Route
                    key={route.path}
                    path={route.path}
                    component={route.component}
                  />
                ))
              }
            </Switch>
          </Router>
      </Provider>
    </ConfigProvider>
  );
}
export default App;
