import * as mobx from 'mobx';
import Base from 'store/model/base';
import App from 'store/model/app';
import User from 'store/model/user';
const { observable } = mobx;

class Store extends Base {
  @observable app = new App();
  @observable user = new User();
}

export default new Store();
