import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const loading = () => {
  return <Spin size="large" style={{width: '100%', margin: '40px 0'}} />;
};

const lazyComponent = (path) => {
  return (
    Loadable({
      loader: () => import(`pages/${path}`),
      loading,
    })
  );
};

const routeData = [
  {
    name: '首页',
    path: 'welcome',
    icon: 'dashboard',
    component: lazyComponent('welcome'),
  },
  {
    name: '商品管理',
    path: 'items',
    icon: 'table',
    children: [
      {
        name: '修改商品',
        path: 'edit/:itemId(\\d+)',
        hideInMenu: true,
        component: lazyComponent('items/edit'),
      },
      {
        name: '录入商品',
        path: 'edit',
        component: lazyComponent('items/edit'),
      },
      {
        name: '商品列表',
        path: 'list',
        component: lazyComponent('items/list'),
      },
    ]
  },
];

let routerMap = {};
function buildRouteMap(data, parentPath = '') {
  data.forEach(route => {
    let key = `${parentPath}/${route.path}`;
    routerMap[key] = route;
    if (route.children) {
      buildRouteMap(route.children, key);
    }
  });
}
buildRouteMap(routeData);

export const routerDataMap = routerMap;

export default routeData;
