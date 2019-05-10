import React from 'react';
// import Loadable from 'react-loadable';
// import { Spin } from 'antd';
// import store from 'store';

// export const loading = (e) => {
//   if (e && e.error) {
//     console.error(e.error);
//     throw new Error('页面加载出错了!');
//   }
//   return <Spin size="large" style={{width: '100%', margin: '40px 0'}} />;
// };
//
// /**
//  *
//  * @param path
//  * @param loadModel: { modelName, modelPath }，如果不需要model, 可传入 loadModel = false
//  * @returns {*}
//  */
// export const lazyComponent = (path, loadModel = { modelName: null, modelPath: '' }) => {
//   let { modelName, modelPath } = loadModel;
//   let loader = {
//     component: () => import(`pages/${path}`),
//   };
//   // 动态加载 model, 如果不需要model, 可传入 loadModel = false
//   if (loadModel) {
//     modelName = modelName || path; // modelName 默认 和 path一样
//     loader[modelName] = () => import(`pages/${modelPath || path}/model`);
//   }
//   return (
//     Loadable.Map({
//       loader,
//       loading,
//       render(loaded, props) {
//         if (loaded[modelName] && !store[modelName]) {
//           const M = loaded[modelName].default;
//           store[modelName] = new M();
//         }
//         let C = loaded.component.default;
//         return <C {...props} />;
//       }
//     })
//   );
// };

// react 提供的 lazy 方法
export const lazy = (path) => React.lazy(() => import(`pages/${path}`));

