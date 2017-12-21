import 'babel-polyfill';
import 'moment/locale/zh-cn';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react';
import Router from './router';
import store from './store';
import 'ant-design-pro/dist/ant-design-pro.css';
import './index.less';


ReactDom.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);


