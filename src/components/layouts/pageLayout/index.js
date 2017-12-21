import React from 'react';
import PropTypes from 'prop-types';
import css from './index.less';
import BreadCrumbs from './breadCrumbs';
import { withRouter } from 'react-router-dom';
import { routerDataMap } from 'common/const/routeData';
import classNames from 'classnames';

@withRouter
export default class PageLayout extends React.Component {

  static propsTypes = {
    children: PropTypes.object.isRequired,
    hasMargin: PropTypes.bool,
  };

  static defaultProps = {
    hasMargin: true,
  };

  render() {
    const { hasMargin } = this.props;
    const title = routerDataMap[this.props.match.path].name || '未知标题';

    const bodyProps = {
      className: classNames({
        [css.margin]: hasMargin,
      })
    };
    return (
      <div className={css.pageLayout}>
        <div className={css.header}>
          <div className={css.breadcrumb}>
            <BreadCrumbs />
          </div>
          <div className={css.title}>{title}</div>
        </div>

        <div {...bodyProps}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
