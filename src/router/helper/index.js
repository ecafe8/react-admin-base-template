import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import baseData from '../baseData';
import { lazy } from 'components/lazyComponent';

/**
 * 使用 基础数据 createRoutesData 构建路由数据
 *
 * 主要用于把基础数组 扩展成 react-route 可用的路由数组结构，减少基础数组的数据字段定义.
 *
 * route = {
 *    key,
 *    isAntdIcon: true,
 *    children: [], 结构同父级一致
 *    ...other 展开 baseData 其他可直接使用的数据，如:
 *    exact, // 是否绝对匹配
 *    name: '中文路径名称',
 *    icon: '',
 *    path: '/h5/list'
 *    pathParams: 'actId(\\d+)' //  路由参数, 可选
 *    hideInMenu: false, 可选
 *    target: '', // "_blank", 可选
 *    href: '', // "#", 可选
 * }
 */
export const createRoutesData = (_baseData, parentPath = '') => {
  let _array = [];
  _baseData.forEach(item => {
    const { isAntdIcon = true, children, ...other } = item;
    const hasChildren = children && children.length;

    const path = mergePath({
      ...item,
      parentPath,
    });

    let route = {
      isAntdIcon,
      key: path,
      path: `/${path}`,
      component: item.component ? item.component : hasChildren && !item.needRender ? undefined : lazy(path), // 加载路径中不能有 '/' 开头
      breadcrumbName: item.name,
      ...other,
    };
    if (hasChildren) {
      route.children = createRoutesData(children, path);
    }

    _array.push(route);
  });

  return _array;
};


/**
 * 合并路径
 * @param key
 * @param path
 * @param parentPath
 * @param pathParams
 * @returns {string | void | *}
 */
export const mergePath = ({ key, path, parentPath = '', pathParams }) => {
  path = path || key;
  if (parentPath) {
    path = `${parentPath}/${path}`;
  }
  if (pathParams) {
    path = `${path}/:${pathParams}`;
  }
  return path.replace(/\/+/g, '/');
};

/**
 * 生成路由组件
 * @param routesData
 * @returns {Array}
 */
export const createRoutesComponent = (routesData) => {
  let routesList = [];
  routesData.forEach(item => {
    const { key, exact, children, path, breadcrumbName, component } = item;
    // console.log('path', path);
    let props = {
      exact, // 是否绝对匹配
      key,
      breadcrumbName,
      component,
      path,
    };

    if (children && children.length) {
      props = {
        ...props,
        exact: true, // 多级路由时，须打开绝对匹配。
      };

      if (!item.needRender) {
        // 把自身的路由，重定向到第一个子页面（主要用于解决 antd.pro 的面包屑路由错误问题）
        props = {
          ...props,
          component: () => <Redirect to={`${children[0].path}`} />,
          exact: true, // 重定向时，必须打开绝对匹配，否则会循环重定向。
        };
      }

      routesList.push(
        <Route {...props} />
      );

      // 添加子页面路由
      routesList.push(...createRoutesComponent(children));
    } else {
      routesList.push(
        <Route {...props} />
      );
    }
  });


  return routesList;
};


/**
 * 生成面包屑映射
 * @returns {{}}
 */
const createRoutesBreadcrumbNameMap = (_routesDataArray) => {
  let _breadcrumbNameMap = {};

  const _for = (array) => {
    array.forEach(item => {
      _breadcrumbNameMap[item.path] = item;
      if (item.children && item.children.length) {
        _for(item.children);
      }
    });
  };

  _for(_routesDataArray);

  return _breadcrumbNameMap;
};

const createRoutesBreadcrumbData = (_routesDataArray) => {
  let _breadcrumb = [];

  _routesDataArray.forEach(item => {
    if (!item.hideInMenu) {
      if (item.children && item.children.length) {
        item.children = createRoutesBreadcrumbData(item.children);
      }
      _breadcrumb.push(item);
    }
  });

  return _breadcrumb;

};

export const routesDataArray = createRoutesData(baseData);

export const breadcrumbNameMap = createRoutesBreadcrumbNameMap(routesDataArray);

const routesWithComponent = createRoutesComponent(routesDataArray);

// TODO 面包屑数据结构不对
export const breadcrumbData = createRoutesBreadcrumbData(routesDataArray);

export default routesWithComponent;
