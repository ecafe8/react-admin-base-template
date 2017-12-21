import * as mobx from 'mobx';
import ajax from 'common/utils/ajax';
import Base from 'store/model/base';
const { observable, action, runInAction, computed } = mobx;

/**
 * 商品列表
 */
export default class Item extends Base {
  @observable state = 'done'; // done, pending
  @observable itemId = 0;
  @observable title = '';
  @observable img = '';
  @observable price = '';

  @computed get loading() {
    return this.state === 'pending';
  }

  @action async getItemDetail() {
    this.state = 'pending';
    try {
      const data = await ajax.req('item.getItemDetail', {
        itemId: this.itemId,
      });
      runInAction(() => {
        this.state = 'done';
        this.title = data.title;
        this.img = data.img;
        this.price = data.price;
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }



}

