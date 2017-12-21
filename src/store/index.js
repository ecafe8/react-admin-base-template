import * as mobx from 'mobx';
import Base from 'store/model/base';
import App from 'store/model/app';
import User from 'store/model/user';
import Items from 'store/model/items';
const { observable } = mobx;

class Store extends Base {
  @observable app = new App();
  @observable user = new User();
  @observable items = new Items();
}

export default new Store();
