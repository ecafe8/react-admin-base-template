import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import RouteData from 'common/const/routeData';

const { Item } = Breadcrumb;

const findRouteByPath = (path = '', data) => {
  let rs = null;
  data = data || [].concat(RouteData);
  data.forEach(item => {
    if (item.path === path) {
      rs = item;
    }
  });
  return rs;
};

@withRouter
export default class BreadCrumbs extends React.Component {

  buildCrumbItems() {
    const { match } = this.props;
    const regex = /(\/)(.*)(\/)(.*?\/:.*)/g;
    const pathRegexMatch = match.path.replace(regex, '$2,$4').split(',');
    const pathSnippets = [].concat(pathRegexMatch[0].split('/'), pathRegexMatch[1]);

    let breadcrumbItems = [];

    let lastRouteData = RouteData;
    pathSnippets.forEach(path => {
      let route = findRouteByPath(path, lastRouteData);
      if (route) {
        lastRouteData = route.children;
        if (route.component) {
          breadcrumbItems.push(
            <Item key={route.path}>
              <Link to={route.path} replace >
                {route.name}
              </Link>
            </Item>
          );
        }
      }
    });

    return breadcrumbItems;
  }

  render() {
    return (
      <Breadcrumb>

        <Item key="home">
          <Link to="/">
            首页
          </Link>
        </Item>

        {this.buildCrumbItems()}
      </Breadcrumb>
    );
  }
}
