import React, { Fragment } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import NotFound from 'pages/exception/404';
import RouteData from 'common/const/routeData';
import MainLayout from 'components/layouts/mainLayout';

const buildRoutes = (data, parentPath = '') => {
  let routesList = [];
  data.forEach(item => {
    const path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    const props = {
      exact: true,
      key: item.key || path,
      path,
      component: item.component,
    };
    if (item.children && !item.component) {
      routesList.push(...buildRoutes(item.children, path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      routesList.push(
        <Route {...props} />
      );
    }
  });
  return routesList;
};

export default class Router extends React.Component {
  componentWillMount() {
    // getLoggedUser();
  }


  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <HashRouter>
          <MainLayout>
            <Switch>
              {buildRoutes(RouteData)}
              <Route path="/404" component={NotFound} />
              <Redirect to="/welcome" />
            </Switch>
          </MainLayout>
        </HashRouter>
      </LocaleProvider>
    );
  }
}
