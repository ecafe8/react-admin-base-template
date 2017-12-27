import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';
import { observer, inject } from 'mobx-react';
import store from 'store';

const loading = () => {
  return <Spin size="large" style={{width: '100%', margin: '40px 0'}} />;
};

// todo needModel 改为 callback
/**
 *
 * @param path
 * @param loadModel: { modelName, modelPath }
 * @returns {*}
 */
const lazyComponent = (path, loadModel = { modelName: null, modelPath: '' }) => {
  const { modelName, modelPath } = loadModel;
  let loader = {
    component: () => import(`pages/${path}`),
  };
  // 动态加载 model
  if (modelName) {
    loader[modelName] = () => import(`pages/${modelPath || path}/model`);
  }
  return (
    Loadable.Map({
      loader,
      loading,
      render(loaded, props) {
        if (loaded[modelName]) {
          const M = loaded[modelName].default;
          if (!store[modelName]) {
            store[modelName] = new M();
          }
        }
        let C = loaded.component.default;
        return <C {...props} />;
      }
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
        component: lazyComponent('items/edit', { modelName: 'item'}),
      },
      {
        name: '录入商品',
        path: 'edit',
        component: lazyComponent('items/edit', { modelName: 'item'}),
      },
      {
        name: '商品列表',
        path: 'list',
        component: lazyComponent('items/list', { modelName: 'items'}),
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
