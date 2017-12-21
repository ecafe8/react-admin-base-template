import * as mobx from 'mobx';
import Base from 'store/model/base';
const { observable, action } = mobx;

export default class App extends Base {
  @observable sideMenuCollapsed = false; // 侧边折叠


  @action toggleSide() {
    this.sideMenuCollapsed = !this.sideMenuCollapsed;
  }

}
