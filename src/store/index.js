import { observable, configure } from 'mobx';
import Base from 'store/model/base';
import App from 'store/model/app';

/**
 * mobx 配置
 * https://github.com/mobxjs/mobx/blob/gh-pages/docs/refguide/api.md#configure
 */
configure({
  enforceActions: true, // 不允许在动作之外进行状态修改
});

class Store extends Base {
  @observable app = new App();
}

export default new Store();
