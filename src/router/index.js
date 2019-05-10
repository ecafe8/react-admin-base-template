import React, { Fragment, Suspense } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import NotFound from 'components/exception/404';
import SiteLayout from 'layout/siteLayout';
import { observer, inject } from 'mobx-react';
import Loading from 'components/loading';
import routesWithComponent from './helper';
import ErrorBoundary from 'components/error';


@inject('store')
@observer
export default class Router extends React.Component {

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <HashRouter>
          <ErrorBoundary>
            <SiteLayout>
              <Suspense fallback={<Loading />}>
                <Switch>
                  {routesWithComponent}
                  <Route path="/404" component={NotFound} key="404" />
                  <Redirect to="/welcome" />
                </Switch>
              </Suspense>
            </SiteLayout>
          </ErrorBoundary>
        </HashRouter>
      </LocaleProvider>
    );
  }
}
