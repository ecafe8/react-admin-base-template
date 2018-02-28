import React from 'react';
import 'babel-polyfill';
import ReactDom from 'react-dom';
import LoginPage from 'pages/login';
import './index.less';


ReactDom.render(
  <LoginPage />,
  document.getElementById('root')
);


