import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import TopNavMenu from './components/topNavMenu';
import css from './index.less';
import Icon from 'components/icon';

const { Header } = Layout;

/**
 * 头部组件
 */
export default class HeaderView extends PureComponent {

  constructor(props) {
    super(props);
  }

  renderLeft() {
    return (
      <div className={css.left}>
        <div className={css.logo} key="logo">
          <a href="/">
            <Icon type="heat-map" isAntd={true} className={css.logoIcon} />
            <h1>盛夏管理后台</h1>
          </a>
        </div>
        <div>
          <TopNavMenu />
        </div>
      </div>
    );
  }

  render() {
    const headerProps = {
      style: {
        padding: 0,
        width: '100%',
      }
    };
    return (
      <Header {...headerProps}>
        <div className={css.head}>
          <div className={css.wrapCenter}>
            {this.renderLeft()}
          </div>
        </div>
      </Header>
    );
  }

}
