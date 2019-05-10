import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { routesDataArray } from 'router/helper';
import { createSubMenu } from 'common/utils/menu';
import css from './index.less';


/**
 * 顶部导航
 */
@withRouter
@observer
export default class TopNavMenu extends React.Component {

  static propTypes = {
    mode: PropTypes.oneOf(['vertical', 'horizontal', 'inline']),
    theme: PropTypes.oneOf(['dark', 'light']),
  };

  static defaultProps = {
    mode: 'horizontal',
    theme: 'dark',
  };

  constructor(props) {
    super(props);
  }

  getCurrentMenuSelectedKeys(props) {
    const { location: { pathname } } = props || this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [routesDataArray[0].path];
    }
    return [pathname];
  }

  render() {
    const { mode, theme } = this.props;
    const menuProps = {
      key: 'Menu',
      theme,
      mode,
      selectedKeys: this.getCurrentMenuSelectedKeys(),
      className: css.menu,
    };

    return (
      <div className={css.baseMenu}>
        <Menu {...menuProps}>
          {createSubMenu(routesDataArray)}
        </Menu>
      </div>
    );
  }
}
