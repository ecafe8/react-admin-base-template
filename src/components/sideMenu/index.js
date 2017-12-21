import React from 'react';
import { observer, inject } from 'mobx-react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import css from './index.less';
import logo from 'assets/images/logo.png';
import RouteData from 'common/const/routeData';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

@withRouter
@inject('store')
@observer
export default class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.menus = [].concat(RouteData);
    // 默认展开项
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }
  getDefaultCollapsedSubMenus(props) {
    const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)];
    currentMenuSelectedKeys.splice(-1, 1);
    if (currentMenuSelectedKeys.length === 0) {
      return ['welcome'];
    }
    return currentMenuSelectedKeys;
  }
  getCurrentMenuSelectedKeys(props) {
    const { location: { pathname } } = props || this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [this.menus[0].path];
    }
    return keys;
  }

  // 构建目录树
  buildNavMenuItems(data, parentPath = '') {
    if (!data) {
      return [];
    }

    return data.map((item) => {
      if (!item.name || item.hideInMenu) {
        return null;
      }
      let itemPath;
      if (item.path.indexOf('http') === 0) {
        itemPath = item.path;
      } else {
        itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
      }
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </span>
              ) : item.name
            }
            key={item.key || item.path}
          >
            {this.buildNavMenuItems(item.children, itemPath)}
          </SubMenu>
        );
      }
      const icon = item.icon && <Icon type={item.icon} />;
      return (
        <Item key={item.key || item.path}>
          {
            /^https?:\/\//.test(itemPath) ? (
              <a href={itemPath} target={item.target}>
                {icon}<span>{item.name}</span>
              </a>
            ) : (
              <Link
                to={itemPath}
                target={item.target}
                replace={itemPath === this.props.location.pathname}
              >
                {icon}<span>{item.name}</span>
              </Link>
            )
          }
        </Item>
      );
    });

  }

  onOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const isMainMenu = this.menus.some(
      item => lastOpenKey && item.path === lastOpenKey
    );
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    });
  };
  render() {
    const { store: { app: { sideMenuCollapsed } } } = this.props;
    const menuProps = {
      theme: 'dark',
      mode: 'inline',
      style: { padding: '16px 0', width: '100%' },
      openKeys: this.state.openKeys,
      onOpenChange: this.onOpenChange.bind(this),
      selectedKeys: this.getCurrentMenuSelectedKeys(),
    };
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={sideMenuCollapsed}
        breakpoint="md"
        width={256}
        className={css.side}
      >
        <div className={css.logo}>
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>盛夏新零售后台</h1>
          </Link>
        </div>

        <Menu {...menuProps}>
          {this.buildNavMenuItems(this.menus)}
        </Menu>
      </Sider>
    );
  }
}
