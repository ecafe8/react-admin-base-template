import React from 'react';
import { observer, inject } from 'mobx-react';
import { Layout } from 'antd';
import css from './index.less';
import Toggle from './togger';
import CurrentUser from './currentUser';

const { Header } = Layout;

@inject('store')
@observer
export default class GlobalHeader extends React.Component {


  render() {
    const { store: { app: { sideMenuCollapsed }} } = this.props;
    return (
      <Header className={css.header}>
        <Toggle />
        <div className={css.right}>
          <CurrentUser />
        </div>
      </Header>
    );
  }
}
