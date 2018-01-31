import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';

const loading = () => {
  return <Spin size="large" style={{width: '100%', margin: '40px 0'}} />;
};

/**
 * 授权后的路由
 */
export default class AuthorizedRoute extends React.Component {
  componentWillMount() {
    // getLoggedUser();
  }


  render() {
    return (
      <Route>
        AuthorizedRoute

      </Route>
    );
  }
}
