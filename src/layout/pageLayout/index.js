import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import { PageHeader } from 'antd';
import css from './index.less';
import { breadcrumbNameMap, breadcrumbData } from 'router/helper';

/**
 * 页面布局
 * 上顶下内容的布局
 */
@withRouter
export default class PageLayout extends PureComponent {

  static propTypes = {
    // 配置项参考
    // https://ant.design/components/page-header-cn/
    headerOptions: PropTypes.any,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  renderHeader() {
    const { headerOptions, match: { path } } = this.props;

    if (headerOptions === false) {
      return null;
    }

    // console.log('breadcrumbData', breadcrumbData);

    const props = {
      // location,
      // breadcrumb: {routes: breadcrumbData}, // TODO 面包屑数据结构不对
      title: breadcrumbNameMap[path].name || '',
      ...headerOptions,
    };
    return (
      <PageHeader {...props} />
    );
  }


  render() {
    const { children } = this.props;
    return (
      <div>
        <div className={css.wrapHeader}>
          <div className={css.wrapCenter}>
            {this.renderHeader()}
          </div>
        </div>
        <div className={css.wrapContent}>
          <div className={css.wrapCenter}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
