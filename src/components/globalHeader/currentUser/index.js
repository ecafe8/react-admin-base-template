import React from 'react';
import { observer, inject } from 'mobx-react';
import { Menu, Icon, Dropdown, Avatar } from 'antd';
import css from './index.less';

const { Item, Divider } = Menu;

@inject('store')
@observer
export default class CurrentUser extends React.Component {

  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }


  onLogoutClick() {

  }

  render() {
    const menu = (
      <Menu className={css.menu} selectedKeys={[]}>
        <Item key="user-profile"><Icon type="user" />个人中心</Item>
        <Item key="setting"><Icon type="setting" />设置</Item>
        <Divider />
        <Item key="logout" onClick={this.onLogoutClick}><Icon type="logout" />退出登录</Item>
      </Menu>
    );
    const { nick, subNick, isSubAccount, avatar } = this.props.store.user;
    return (
      <Dropdown overlay={menu}>
        <span className={`${css.action} ${css.account}`}>
          <Avatar size="small" className={css.avatar} src={avatar} />
          {isSubAccount ? `${nick}:${subNick}` : nick}
        </span>
      </Dropdown>
    );
  }
}
