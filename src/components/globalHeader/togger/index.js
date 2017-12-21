import React from 'react';
import { observer, inject } from 'mobx-react';
import Debounce from 'lodash-decorators/debounce';
import { Icon } from 'antd';
import css from './index.less';


@inject('store')
@observer
export default class Toggle extends React.Component {

  constructor(props) {
    super(props);
    this.onToggleSideMenu = this.onToggleSideMenu.bind(this);
  }

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  onToggleSideMenu() {
    this.props.store.app.toggleSide();
    this.triggerResizeEvent();
  }
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const { store: { app: { sideMenuCollapsed }} } = this.props;
    return (
      <Icon
        className={css.trigger}
        type={sideMenuCollapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={this.onToggleSideMenu}
      />
    );
  }
}
