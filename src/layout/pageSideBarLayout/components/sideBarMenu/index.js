import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import { routesDataArray } from 'router/helper';
import { createIcon, createMenuItem } from 'common/utils/menu';
import { Menu } from 'antd';
import MenuLink from 'components/menuLink';

const { SubMenu } = Menu;

@withRouter
@observer
export default class SideBarMenu extends React.Component {

  static propTypes = {
    mode: PropTypes.oneOf(['vertical', 'horizontal', 'inline']),
    theme: PropTypes.oneOf(['dark', 'light']),
  };

  static defaultProps = {
    mode: 'inline',
    theme: 'light',
  };

  getCurrentMenuSelectedKeys(props) {
    const { location: { pathname } } = props || this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [routesDataArray[0].path];
    }
    return [pathname];
  }

  render() {
    const { match: { path, url }, mode, theme } = this.props;
    const menuKeys = path.split('/').filter(item => item !== '');

    if (menuKeys.length) {
      const mainKey = menuKeys[0];
      const subKey = menuKeys[1];
      const currentMenuData = routesDataArray.find(item => item.key === mainKey);

      let menuProps = {
        mode,
        theme,
        selectedKeys: this.getCurrentMenuSelectedKeys(),
        defaultOpenKeys: [mainKey],
        style: {
          height: '100%',
        }
      };

      if (subKey) {
        menuProps.defaultSelectedKeys = [subKey];
      }

      const _subMenuProps = {
        key: currentMenuData.key,
        title: <MenuLink linkItem={currentMenuData} noLink={true} />,
        children: createMenuItem(currentMenuData.children),
      };

      return (
        <Menu {...menuProps}>
          <SubMenu {..._subMenuProps} />
        </Menu>
      );
    }

    return null;
  }
}
