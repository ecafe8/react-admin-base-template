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

  @action async getItemDetail(itemId) {
    this.state = 'pending';
    try {
      this.itemId = itemId;
      const data = await ajax.req('item.getItemDetail', {
        itemId,
      });
      runInAction(() => {
        this.state = 'done';
        console.log('getItemDetail data = ', data);
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

