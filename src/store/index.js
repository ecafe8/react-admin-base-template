import * as mobx from 'mobx';
import Base from 'store/model/base';
import App from 'store/model/app';
const { observable } = mobx;

class Store extends Base {
  @observable app = new App();
}

export default new Store();
